import {Gender, EggGroup, Nature} from "./types";

interface IPokemon{
	name:string;
	gender:Gender;
	eggGroups:EggGroup[];
	nature?:Nature;
	hp?:boolean;
	attack?:boolean;
	defense?:boolean;
	specialAttack?:boolean;
	specialDefense?:boolean;
	speed?:boolean;
}

export default class Pokemon{
	name:string;
	gender:Gender;
	eggGroups:EggGroup[];
	nature?:Nature;
	hp:boolean = false;
	attack:boolean = false;
	defense:boolean = false;
	specialAttack:boolean = false;
	specialDefense:boolean = false;
	speed:boolean = false;

	constructor(attribs:IPokemon){
		this.name = attribs.name;
		this.gender = attribs.gender;
		this.eggGroups = attribs.eggGroups;
		this.nature = attribs.nature;
		if (attribs.hp) this.hp = attribs.hp;
		if (attribs.attack) this.attack = attribs.attack;
		if (attribs.defense) this.defense = attribs.defense;
		if (attribs.specialAttack) this.specialAttack = attribs.specialAttack;
		if (attribs.specialDefense) this.specialDefense = attribs.specialDefense;
		if (attribs.speed) this.speed = attribs.speed;
	}

	ivString(){
		return `${this.hp ? "31" : "0"}/${this.attack ? "31" : "0"}/${this.defense ? "31" : "0"}/${this.specialAttack ? "31" : "0"}/${this.specialDefense ? "31" : "0"}/${this.speed ? "31" : "0"}`;
	}

	toString(){
		return `${this.name} - ${Gender[this.gender]} - ${this.nature !== undefined ? `${Nature[this.nature]} - ` : ""}${this.ivString()}`;
	}
}
