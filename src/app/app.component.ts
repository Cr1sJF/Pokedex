import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/services/poke-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
	pokemonList:any[] = [];


	constructor(private pokeApi: PokeApiService){}

	ngOnInit(): void {
		this.pokeApi.initialize();
		this.pokemonList = this.pokeApi.pokemonList;
	}

	
}
