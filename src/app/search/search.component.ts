import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeApiService } from 'src/services/poke-api.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent {

	@Output() response = new EventEmitter<any>();

	constructor(private pokeApi: PokeApiService) { }

	// this.pokeApi.findPokemon
	//   search(){
	// 	//   let apiResponse = await something



	// 	this.response.emit();
	//   }


	search(id: HTMLInputElement) {
		this.pokeApi.findPokemon([id.value]);
	}


}
