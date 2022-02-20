//#region GENERAL

import { MicroPokemon } from "src/models/micro-pokemon.model";
import { Specie } from "src/models/specie.model";

export interface nameUrlObj {
	"name": string,
	"url": string
}

export interface image {
	"src": string,
	"alt": string
}

export interface apiResponse{
	success: boolean,
	res: any
}

export interface pokeImage{
	"src":string,
	"alt": string,
	"background": string
}
//#endregion

//#region POKEMON-SERVICE
export interface pokemonServiceResponse {
	pokemon: pokemonApiResponse,
	specie: Specie
}

//#endregion

//#region POKEMON-METADATA
export interface gameIndice {
	"game_index": number,
	"version": nameUrlObj
}

export interface heldItem {
	"item": nameUrlObj,
	"version_details": {
		"rarity": number,
		"version": nameUrlObj
	}[]
}

export interface move {
	"move": nameUrlObj,
	"version_group_details": {
		"level_learned_at": number,
		"version_group": nameUrlObj,
		"move_learn_method": nameUrlObj
	}[]
}

export interface ability {
	"is_hidden": boolean,
	"slot": number,
	"ability": nameUrlObj
}

export interface type {
	"slot": number,
	"type": nameUrlObj
}

export interface sprites {
	"back_default": string | null,
	"back_female": string | null,
	"back_shiny": string | null,
	"back_shiny_female": string | null,
	"front_default": string | null,
	"front_female": string | null,
	"front_shiny": string | null,
	"front_shiny_female": string | null,
	"other": {
		"dream_world": {
			"front_default": string | null,
			"front_female": string | null,
		},
		"home": {
			"front_default": string | null,
			"front_female": string | null,
			"front_shiny": string | null,
			"front_shiny_female": string | null,
		},
		"official-artwork": {
			"front_default": string | null,
		}
	},
	"versions": {
		"generation-i": {
			"red-blue": {
				"back_default": string | null,
				"back_gray": string | null,
				"front_default": string | null,
				"front_gray": string | null,
			},
			"yellow": {
				"back_default": string | null,
				"back_gray": string | null,
				"front_default": string | null,
				"front_gray": string | null,
			}
		},
		"generation-ii": {
			"crystal": {
				"back_default": string | null,
				"back_shiny": string | null,
				"front_default": string | null,
				"front_shiny": string | null,
			},
			"gold": {
				"back_default": string | null,
				"back_shiny": string | null,
				"front_default": string | null,
				"front_shiny": string | null,
			},
			"silver": {
				"back_default": string | null,
				"back_shiny": string | null,
				"front_default": string | null,
				"front_shiny": string | null,
			}
		},
		"generation-iii": {
			"emerald": {
				"front_default": string | null,
				"front_shiny": string | null,
			},
			"firered-leafgreen": {
				"back_default": string | null,
				"back_shiny": string | null,
				"front_default": string | null,
				"front_shiny": string | null,
			},
			"ruby-sapphire": {
				"back_default": string | null,
				"back_shiny": string | null,
				"front_default": string | null,
				"front_shiny": string | null,
			}
		},
		"generation-iv": {
			"diamond-pearl": {
				"back_default": string | null,
				"back_female": string | null,
				"back_shiny": string | null,
				"back_shiny_female": string | null,
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null,
			},
			"heartgold-soulsilver": {
				"back_default": string | null,
				"back_female": string | null,
				"back_shiny": string | null,
				"back_shiny_female": string | null,
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null,
			},
			"platinum": {
				"back_default": string | null,
				"back_female": string | null,
				"back_shiny": string | null,
				"back_shiny_female": string | null,
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null,
			}
		},
		"generation-v": {
			"black-white": {
				"animated": {
					"back_default": string | null,
					"back_female": string | null,
					"back_shiny": string | null,
					"back_shiny_female": string | null,
					"front_default": string | null,
					"front_female": string | null,
					"front_shiny": string | null,
					"front_shiny_female": string | null,
				},
				"back_default": string | null,
				"back_female": string | null,
				"back_shiny": string | null,
				"back_shiny_female": string | null,
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null,
			}
		},
		"generation-vi": {
			"omegaruby-alphasapphire": {
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null,
			},
			"x-y": {
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null
			}
		},
		"generation-vii": {
			"icons": {
				"front_default": string | null,
				"front_female": string | null,
			},
			"ultra-sun-ultra-moon": {
				"front_default": string | null,
				"front_female": string | null,
				"front_shiny": string | null,
				"front_shiny_female": string | null
			}
		},
		"generation-viii": {
			"icons": {
				"front_default": string | null,
				"front_female": string | null
			}
		}
	}
}

export interface pokemonApiResponse {
	"id": number,
	"name": string,
	"base_experience": number,
	"height": number,
	"is_default": boolean,
	"order": number,
	"weight": number,
	"abilities": ability[],
	"forms": nameUrlObj[],
	"game_indices": gameIndice[],
	"held_items": heldItem[],
	"location_area_encounters": string,
	"moves": move[],
	"species": nameUrlObj,
	"sprites": sprites,
	"stats": {
		"base_stat": number,
		"effort": number,
		"stat": nameUrlObj
	}[],
	"types": type[],
	"past_types": {
		"generation": nameUrlObj,
		"types": type[]
	}[]
}

//#endregion

//#region SPECIE

export interface area {
	"area": nameUrlObj,
	"base_score": number,
	"rate": number
}

export interface variety {
	"is_default": boolean,
	"pokemon": nameUrlObj | MicroPokemon,
}

export interface textEntry {
	"flavor_text": string,
	"language": nameUrlObj,
	"version": nameUrlObj
}

export interface specieApiResponse {
	"base_happiness": number,
	"capture_rate": number,
	"color": nameUrlObj,
	"egg_groups": nameUrlObj[],
	"evolution_chain": {
		"url": string
	},
	"evolves_from_species": nameUrlObj | null,
	"flavor_text_entries": textEntry[],
	"form_descriptions": any[],
	"forms_switchable": boolean,
	"gender_rate": number,
	"genera": {
		"genus": string,
		"language": nameUrlObj
	}[],
	"generation": nameUrlObj,
	"growth_rate": nameUrlObj,
	"habitat": nameUrlObj,
	"has_gender_differences": boolean,
	"hatch_counter": number,
	"id": number,
	"is_baby": boolean,
	"is_legendary": boolean,
	"is_mythical": boolean,
	"name": string,
	"names": {
		"language": nameUrlObj,
		"name": string
	}[],
	"order": number,
	"pal_park_encounters": area[],
	"pokedex_numbers": {
		"entry_number": number,
		"pokedex": nameUrlObj
	}[],
	"shape": nameUrlObj,
	"varieties": variety[]
}
//#endregion