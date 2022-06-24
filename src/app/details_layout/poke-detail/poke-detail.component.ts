import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pokeImage, pokemonApiResponse, pokemonServiceResponse } from 'src/common/interfaces';
import { Pokemon } from 'src/models/pokemon.model';
import { Specie } from 'src/models/specie.model';
import { PokeApiService } from 'src/services/poke-api.service';

@Component({
	selector: 'app-poke-detail',
	templateUrl: './poke-detail.component.html',
	styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {
	id: string = "";
	specie: Specie;
	pokemon: Pokemon;
	constructor(
		private pokeApiService: PokeApiService,
		private route: ActivatedRoute
	) { }

	currentImage:pokeImage;

	ngOnInit(): void {
		this.id = this.route.snapshot.params["specie"];
		this.initialize(this.id);
	}

	async initialize(id: string) {
		this.specie = await this.pokeApiService.findSpecie(id);
		let pokemonData: pokemonServiceResponse[] = await this.pokeApiService.findPokemon([id]);

		this.pokemon = new Pokemon(pokemonData[0].pokemon, pokemonData[0].specie);
		this.specie = pokemonData[0].specie;

		console.log("POKE", this.pokemon);
		console.log("SPECIE", this.specie);
	}

}
