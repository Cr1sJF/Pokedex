import { ability, move, pokemonApiResponse } from "src/common/interfaces";
import { MinPokemon } from "./min-pokemon.model";
import { Specie } from "./specie.model";
export class Pokemon extends MinPokemon{

	abilities: Object[] = [];
	moves: Object[] = [];
	stats: Object[] = [];

	constructor(pokemon: pokemonApiResponse, specie?:Specie) {
		super(pokemon, specie);
		this.name = pokemon.name;
		this.id = pokemon.id;
		this.abilities = pokemon.abilities.filter((ability: ability) => !ability.is_hidden).map((ability: ability) => ability.ability.name);
		this.moves = pokemon.moves.filter((move: move) => {
			let details = move.version_group_details.find((detail: any) => detail.level_learned_at === 0 && detail.version_group.name == "gold-silver");
			return details;
		}).map((move: move) => move.move.name);

		if (this.moves.length > 5) this.moves = this.moves.slice(0, 5);

		// this.sprites = pokemon.sprites;
		this.stats = pokemon.stats.map(stat => { return { label: stat.stat.name, value: stat.base_stat } });
		// this.img = pokemon.sprites.other["official-artwork"].front_default ? pokemon.sprites.other["official-artwork"].front_default : "";
		// this.backgroundClass = pokemon.types ? pokemon.types.find((type: any) => type.slot === 1)!.type.name : "";
	}

}