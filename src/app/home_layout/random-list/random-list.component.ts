import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/services/poke-api.service';

@Component({
  selector: 'app-random-list',
  templateUrl: './random-list.component.html',
  styleUrls: ['./random-list.component.css']
})
export class RandomListComponent implements OnInit {

	pokemonList:any[] = [];

	constructor(private pokeApi: PokeApiService){}

	ngOnInit(): void {
		this.pokemonList = this.pokeApi.pokemonList;
		console.log(this.pokemonList)
	}

}
