import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon.model';
import { PokeApiService } from 'src/services/poke-api.service';

@Component({
	selector: 'app-pokemon-detail',
	templateUrl: './pokemon-card.component.html',
	styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit{

	@Input() pokemonMetadata: any;
	pokemon:any;

	constructor(private pokemonService: PokeApiService) { }

	ngOnInit(): void {
		this.pokemon = new Pokemon(this.pokemonMetadata);
	}

}
