import { IncompatibleEggGroupError as IncompatibleEggGroupError, IncompatibleGenderError } from "./errors";
import { Gender, EggGroup, Nature, PokemonInstance, PokemonData } from "./types";
import fs from "fs";

export class PokeMMOBreeder {
    protected pokemonData: PokemonData[] = [];
    protected pokemonDataIdIndex: { [id: number]: PokemonData } = {};

    constructor() {
        this.pokemonData = JSON.parse(fs.readFileSync("./data/pokemon.json", "utf8"));
        for (const data of this.pokemonData) {
            this.pokemonDataIdIndex[data.id] = data;
        }
    }

    public breed(a: PokemonInstance, b: PokemonInstance, desiredGender: Gender) : PokemonInstance | never {
        if (a.gender === b.gender || (a.gender === Gender.Genderless && b.pokemonData.name !== "Ditto") || (b.gender === Gender.Genderless && a.pokemonData.name !== "Ditto")) {
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

        return {
            pokemonData: outputPokemonData,
            gender: a.gender,
            nature: a.nature,
            ivs: a.ivs,
            moves: [],
            originalTrainer: dominant.originalTrainer
        };
    }

    protected getPokemonDataById(id: number) : PokemonData {
        return JSON.parse(JSON.stringify(this.pokemonDataIdIndex[id]));
    }
}