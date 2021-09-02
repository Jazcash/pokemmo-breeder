export interface PokemonInstance {
    pokemonData: PokemonData;
    gender: Gender;
    nature: Nature;
    ivs: Stats;
    originalTrainer: string;
    moves: string[];
    item?: Item;
    cost?: number;
}

export interface PokemonData {
    id: number;
    name: string;
    friendlyName: string;
    eggGroups: string[];
    lowestEvolutionId: number;
    maleToFemaleRatio: number;
    potentialMoves: string[];
}

export interface Stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export enum EggGroup {
    Amorphous = "amorphous",
    Bug = "bug",
    Dragon = "dragon",
    Fairy = "fairy",
    Field = "field",
    Flying = "flying",
    Grass = "grass",
    Humanoid = "humanoid",
    Mineral = "mineral",
    Monster = "monster",
    Water1 = "water1",
    Water2 = "water2",
    Water3 = "water3",
    Ditto = "ditto",
    Undiscovered = "undiscovered"
}

export enum Gender {
    Male = "male",
    Female = "female",
    Genderless = "genderless"
}

export enum Nature {
    Adamant = "adamant",
    Bashful = "bashful",
    Bold = "bold",
    Brave = "brave",
    Calm = "calm",
    Careful = "careful",
    Docile = "docile",
    Gentle = "gentle",
    Hardy = "hardy",
    Hasty = "hasty",
    Impish = "impish",
    Jolly = "jolly",
    Lax = "lax",
    Lonely = "lonely",
    Mild = "mild",
    Modest = "modest",
    Naive = "naive",
    Naughty = "naughty",
    Quiet = "quiet",
    Quirky = "quirky",
    Rash = "rash",
    Relaxed = "relaxed",
    Sassy = "sassy",
    Serious = "serious",
    Timid = "timid"
}

export enum Item {
    Everstone = "everstone",
    PowerWeight = "power-weight", // hp
    PowerBracer = "power-bracer", // attack
    PowerBelt = "power-belt", // defense
    PowerLens = "power-lens", // special attack
    PowerBand = "power-band", // special defense
    PowerAnklet = "power-anklet" // speed
}