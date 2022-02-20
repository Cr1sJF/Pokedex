import { textEntry } from "src/common/interfaces";
import { MicroPokemon } from "./micro-pokemon.model";

const CONST ={
	FLAVOR_TEXT_VERSION_ORDER:[
		"omega-ruby",
		"alpha-sapphire",
		"lets-go-pikachu",
		"sword",
		"x",
		"y"
	]
}

export class Specie {
	name: string = "";
	id: number = 0;
	shortDescription: string = "";
	fullDescription: string = "";
	varieties: MicroPokemon[] = []

	constructor(name: string, id: number, textEntries: textEntry[]) {
		this.name = name;
		this.id = id;

		let descriptions = this.getDescriptions(textEntries);

		this.shortDescription = descriptions.short;
		this.fullDescription = descriptions.full;
	}

	private getDescriptions(textEntries: textEntry[]): {
		short: string,
		full: string
	} {

		if (textEntries.length === 0) return {
			short: "",
			full: ""
		};
		
		let description = "";
		let versionIndex = 0;
		while (!description && CONST.FLAVOR_TEXT_VERSION_ORDER[versionIndex]){
			let textEntry: textEntry | undefined =  textEntries.find((text: textEntry) => text.language.name == "es" && text.version.name == CONST.FLAVOR_TEXT_VERSION_ORDER[versionIndex]);
			if(textEntry){
				description = textEntry.flavor_text;
			}
			versionIndex++;
		}

		description = description ? description.replace(/\n/g," ") : "";

		return {
			short: description.length > 197 ? description.substring(0, 197) + "..." :  "",
			full: description
		}
	}

	getShortDescription(textEntries: textEntry[]): string {
		if (textEntries.length === 0) return "";
		let result = textEntries.find((text: textEntry) => text.language.name == "es" && text.version.name == "omega-ruby");
		return result ? result.flavor_text : "";
	}

	addVariety(variety: MicroPokemon) {
		this.varieties.push(variety);
	}
}