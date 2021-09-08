import parse from "csv-parse/lib/sync";
import { promises as fs } from "fs";
import { PokemonData } from "../dist";

(async () => {
    // const eggGroups = await parseCsv("egg_groups.csv");
    // const pokemonEggGroups = await parseCsv("pokemon_egg_groups.csv");
    // const pokemonEvolutions = await parseCsv("pokemon_evolutions.csv");
    // const pokemonMoves = await parseCsv("pokemon_moves.csv");
    // const pokemonSpecies = await parseCsv("pokemon_species.csv");
    const pokemon1 = await parseCsv("pokemon.csv");
    const pokemon2 = JSON.parse(await fs.readFile("pokedex.json", { encoding: "utf-8" }));
    const pokemon1IdLookup: { [key: number]: any } = {};
    pokemon1.forEach((p: any) => {
        pokemon1IdLookup[p.id] = p;
    });
    const pokemon2IdLookup: { [key: number]: any } = {};
    pokemon2.forEach((p: any) => {
        pokemon2IdLookup[p.id] = p;
    });
    
    const outputPokemon: PokemonData[] = [];
    pokemon2.filter((pokemon: any) => {
        return pokemon.id <= 644;
    }).map((pokemon: any) => {
        let lowestEvolution = pokemon;
        while (lowestEvolution.evolution?.prev) {
            lowestEvolution = pokemon2IdLookup[parseInt(lowestEvolution.evolution.prev)];
        }

        const pokemonData: PokemonData = {
            id: pokemon.id,
            name: pokemon1IdLookup[pokemon.id].identifier,
            friendlyName: pokemon.name.english,
            eggGroups: pokemon.profile.egg.map((eggGroup: string) => convertEggGroup(eggGroup)),
            maleToFemaleRatio: pokemon.profile.gender === "Genderless" ? [] : pokemon.profile.gender.split(":").map((x: string) => parseFloat(x)),
            lowestEvolutionId: lowestEvolution.id,
            potentialMoves: []
        }

        outputPokemon.push(pokemonData);
    });

    await fs.writeFile("../data/pokemon.json", JSON.stringify(outputPokemon, null, 4));
})();

async function parseCsv(filename: string) {
    const csv = await fs.readFile(`csv/${filename}`, "utf-8");
    const json = parse(csv, {
        columns: true,
        skip_empty_lines: true,
        skip_lines_with_empty_values: true,
    });
    return json;
}

function convertEggGroup(eggGroup: string) {
    return {
        "Amorphous": "amorphous",
        "Bug": "bug",
        "Dragon": "dragon",
        "Fairy": "fairy",
        "Field": "field",
        "Flying": "flying",
        "Grass": "grass",
        "Human-Like": "humanoid",
        "Mineral": "mineral",
        "Monster": "monster",
        "Water 1": "water1",
        "Water 2": "water2",
        "Water 3": "water3",
        "Ditto": "ditto",
        "Undiscovered": "undiscovered",
    }[eggGroup];
}