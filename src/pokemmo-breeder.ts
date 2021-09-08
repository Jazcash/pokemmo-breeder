import { IncompatibleEggGroupError as IncompatibleEggGroupError, IncompatibleGenderError } from "./errors";
import { Gender, EggGroup, Nature, PokemonInstance, PokemonData, Stats, Item } from "./types";
import fs from "fs";

export interface PokeMMOBreederConfig {
    dnaItemCost: number;
    everstoneCost: number;
    abilityPillCost: number;
}

export const defaultPokeMMOBreederConfig: PokeMMOBreederConfig = {
    dnaItemCost: 10000,
    everstoneCost: 5400,
    abilityPillCost: 35000
}

export class PokeMMOBreeder {
    protected config: PokeMMOBreederConfig;
    protected pokemonData: PokemonData[] = [];
    protected pokemonDataIdIndex: { [id: number]: PokemonData } = {};

    constructor(config: Partial<PokeMMOBreederConfig> = defaultPokeMMOBreederConfig) {
        this.config = Object.assign({}, defaultPokeMMOBreederConfig, config);

        this.pokemonData = JSON.parse(fs.readFileSync("./data/pokemon.json", "utf8"));
        for (const data of this.pokemonData) {
            this.pokemonDataIdIndex[data.id] = data;
        }
    }

    public breed(a: PokemonInstance, b: PokemonInstance, chosenGender: Gender = Gender.Unknown) : PokemonInstance | never {
        if (
            a.gender === b.gender ||
            (a.gender === Gender.Genderless && (b.pokemonData.name !== "Ditto" && b.pokemonData.name !== a.pokemonData.name)) ||
            (b.gender === Gender.Genderless && (a.pokemonData.name !== "Ditto" && b.pokemonData.name !== a.pokemonData.name))
        ) {
            throw new IncompatibleGenderError();
        }

        if (!a.pokemonData.eggGroups.some(eggGroup => b.pokemonData.eggGroups.includes(eggGroup))) {
            throw new IncompatibleEggGroupError();
        }

        let dominant = a;
        if (b.gender === Gender.Genderless || b.gender === Gender.Female) {
            dominant = b;
        }

        const outputPokemonData = this.getPokemonDataById(dominant.pokemonData.lowestEvolutionId);

        const ivs: Stats = {
            hp: Math.floor((a.ivs.hp + b.ivs.hp) / 2),
            attack: Math.floor((a.ivs.attack + b.ivs.attack) / 2),
            defense: Math.floor((a.ivs.defense + b.ivs.defense) / 2),
            specialAttack: Math.floor((a.ivs.specialAttack + b.ivs.specialAttack) / 2),
            specialDefense: Math.floor((a.ivs.specialDefense + b.ivs.specialDefense) / 2),
            speed: Math.floor((a.ivs.speed + b.ivs.speed) / 2),
        };

        let nature = Nature.Unknown;

        for (const pokemon of [a, b]) {
            switch (pokemon.item) {
                case Item.PowerWeight: ivs.hp = pokemon.ivs.hp; break;
                case Item.PowerBracer: ivs.attack = pokemon.ivs.attack; break;
                case Item.PowerBelt: ivs.defense = pokemon.ivs.defense; break;
                case Item.PowerLens: ivs.specialAttack = pokemon.ivs.specialAttack; break;
                case Item.PowerBand: ivs.specialDefense = pokemon.ivs.speed; break;
                case Item.PowerAnklet: ivs.speed = pokemon.ivs.speed; break;
                case Item.Everstone: nature = pokemon.nature; break;
            }
        }

        let cost = 0;
        for (const pokemon of [a, b]) {
            if (pokemon.item === undefined) {
                continue;
            }
            if ([Item.PowerWeight, Item.PowerBracer, Item.PowerBelt, Item.PowerLens, Item.PowerBand, Item.PowerAnklet, Item.Everstone].includes(pokemon.item)) {
                cost += this.config.dnaItemCost;
            } else if (pokemon.item === Item.Everstone) {
                cost += this.config.everstoneCost;
            }
        }

        if (chosenGender === Gender.Male || chosenGender === Gender.Female && outputPokemonData.maleToFemaleRatio.length === 2) {
            if (chosenGender === Gender.Male) {
                switch (outputPokemonData.maleToFemaleRatio[0]) {
                    case 12.5: cost += 5000; break;
                    case 25: cost += 5000; break;
                    case 50: cost += 5000; break;
                    case 75: cost += 9000; break;
                    default: console.log("err");
                }
            } else {
                switch (outputPokemonData.maleToFemaleRatio[1]) {
                    case 12.5: cost += 21000; break;
                    case 25: cost += 9000; break;
                    case 50: cost += 5000; break;
                    case 75: cost += 5000; break;
                    default: console.log("err");
                }
            }
        }

        return {
            pokemonData: outputPokemonData,
            gender: chosenGender,
            nature,
            ivs: ivs,
            moves: [],
            originalTrainer: dominant.originalTrainer,
            cost
        };
    }

    protected getPokemonDataById(id: number) : PokemonData {
        return JSON.parse(JSON.stringify(this.pokemonDataIdIndex[id]));
    }
}