import { image, pokeImage, pokemonApiResponse, specieApiResponse, sprites, type, variety } from 'src/common/interfaces';

import * as utils from '../services/utils';
import { MicroPokemon } from './micro-pokemon.model';
import { Specie } from './specie.model';

const CONSTS = {
	SPRITES_PROPS: [
		"other.official-artwork.front_default",
		"front_default",
		"front_female",
		"front_shiny",
		"front_shiny_female",
		"other.dream_world.front_default",
		"other.home.front_default",
		"other.home.front_female",
		"other.home.front_shiny",
		"other.home.front_shiny_female",
	]
}

export class MinPokemon extends MicroPokemon {
	type: string = "";
	backgroundClass: string = "";
	sprites: pokeImage[] = [];
	specie: Specie = new Specie("", 0, []);
	weight: number=0;
	height:number=0;

	constructor(pokemon: pokemonApiResponse, specie?: Specie) {
		super(pokemon.name, pokemon.id, pokemon.sprites, pokemon.types);
		const typeName: string = this.getMainType(pokemon.types);

		this.type = typeName;
		this.backgroundClass = typeName;
		this.sprites = this.populateSprites(specie, pokemon, typeName);
		this.weight = pokemon.weight;
		this.height = pokemon.height;
		if (specie) {
			this.specie = specie;
		}
	}

	populateSprites(specie: Specie | undefined, pokemon: pokemonApiResponse, type: string): pokeImage[] {
		if (!specie) return [];

		let result: pokeImage[] = [];
		specie.varieties.forEach((variety: MicroPokemon) => {
			result.push(variety.img);
		});

		if(result.length >10){
			result.splice(10);
		}else if (result.length < 10) {
			let missingImg = 10 - result.length;
			for (var i = 0; i < missingImg; i++) {
				result.push({
					alt: CONSTS.SPRITES_PROPS[i],
					src: utils.decodeObjectProp(pokemon.sprites, CONSTS.SPRITES_PROPS[i])  || "/assets/no-img.png",
					background: type
				});
			}
		}
		return result;
	}

}