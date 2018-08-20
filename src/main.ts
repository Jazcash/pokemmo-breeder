import {Gender, EggGroup, Nature} from "./types";
import Pokemon from "./Pokemon";

let whispur = new Pokemon({
	name: "Whispur",
	gender: Gender.Male,
	eggGroups: [EggGroup.Monster],
	hp: true,
	attack: true
});

let larvitar = new Pokemon({
	name: "Larvitar",
	gender: Gender.Female,
	eggGroups: [EggGroup.Monster],
	nature: Nature.Careful,
	attack: true
});

let outcome = breed(whispur, larvitar);
if (outcome) console.log(outcome.toString());

function isBreedValid(a:Pokemon, b:Pokemon):boolean{
	if ((a.gender !== Gender.Female && b.gender !== Gender.Female) || (a.gender !== Gender.Male && b.gender !== Gender.Male)){
		console.warn(`Cannot breed ${a.name} (${a.gender}) with ${b.name} (${b.gender})`);
		return false;
	}

	if (a.eggGroups.some(x => b.eggGroups.indexOf(x) === -1)){
		console.warn(`Cannot breed ${a.name} (${a.eggGroups}) with ${b.name} (${b.eggGroups})`);
		return false;
	}

	if (a.nature && b.nature){
		console.warn(`Cannot breed ${a.name} (${a.nature}) with ${b.name} (${b.nature})`);
		return false;
	}

	let uniqueStatCount = 0;

	if ((a.hp && !b.hp) || (!a.hp && b.hp)) uniqueStatCount++;
	if ((a.attack && !b.attack) || (!a.attack && b.attack)) uniqueStatCount++;
	if ((a.defense && !b.defense) || (!a.defense && b.defense)) uniqueStatCount++;
	if ((a.specialAttack && !b.specialAttack) || (!a.specialAttack && b.specialAttack)) uniqueStatCount++;
	if ((a.specialDefense && !b.specialDefense) || (!a.specialDefense && b.specialDefense)) uniqueStatCount++;
	if ((a.speed && !b.speed) || (!a.speed && b.speed)) uniqueStatCount++;
	if (a.nature) uniqueStatCount++;
	if (b.nature) uniqueStatCount++;

	if (uniqueStatCount < 2 || uniqueStatCount > 2){
		console.warn(`Cannot breed ${a.name} with ${b.name} - uniqueStatCount: ${uniqueStatCount}`);
		return false;
	}

	return true;
}

function breed(a:Pokemon, b:Pokemon, gender:Gender = Gender.Unknown):Pokemon|undefined{
	if (!isBreedValid(a, b)) return;

	return new Pokemon({
		name: (a.gender === Gender.Female) ? a.name : b.name,
		eggGroups: (a.gender === Gender.Female) ? a.eggGroups : b.eggGroups,
		gender: gender,
		nature: (a.nature !== undefined) ? a.nature : (b.nature !== undefined) ? b.nature : undefined,
		hp: a.hp ? a.hp : b.hp,
		attack: a.attack ? a.attack : b.attack,
		defense: a.defense ? a.hp : b.defense,
		specialAttack: a.specialAttack ? a.specialAttack : b.specialAttack,
		specialDefense: a.specialDefense ? a.specialDefense : b.specialDefense,
		speed: a.speed ? a.speed : b.speed,
	});
}
