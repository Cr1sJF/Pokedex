import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/services/poke-api.service';
import { MinPokemon } from 'src/models/min-pokemon.model';
import CONST from "../../../CONST.json";
import { pokeImage, pokemonServiceResponse } from 'src/common/interfaces';
import { Router } from '@angular/router';

import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

const COMPONENT_CONSTANTS = {
	IMG: {
		STATIC: "../../assets/static.gif",
		LOADING: "../../assets/loading.gif"
	},
	NAVIGATION_KEYS: [CONST.KEY_CODES.ENTER, CONST.KEY_CODES.ARROW_DOWN, CONST.KEY_CODES.ARROW_RIGHT, CONST.KEY_CODES.ARROW_LEFT, CONST.KEY_CODES.ARROW_UP]
}

@Component({
	selector: 'app-poke-search',
	templateUrl: './poke-search.component.html',
	styleUrls: ['./poke-search.component.css'],
	animations: [
		trigger('childAnimation', [
			// ...
			state('open', style({
				width: '300px',
				opacity: 1,
				//   backgroundColor: 'yellow'
			})),
			state('closed', style({
				width: '0px',
				opacity: 1,
				//   backgroundColor: 'blue'
			})),
			transition('* => *', [
				animate('0.25s')
			]),
		])
	],
	host: {
		'(document:keyup)': 'handleKeyboardEvent($event)'
	}
})
export class PokeSearchComponent implements OnInit {

	constructor(
		private pokeApi: PokeApiService,
		private router: Router
	) { }

	ngOnInit(): void {

	}


	handleKeyboardEvent(event: KeyboardEvent) {
		if (COMPONENT_CONSTANTS.NAVIGATION_KEYS.includes(event.key)) {
			event.preventDefault();
			switch (event.key) {
				case CONST.KEY_CODES.ENTER:
					this.performSearch();
					break;
				case CONST.KEY_CODES.ARROW_UP:
					this.prevPokemon();
					break;
				case CONST.KEY_CODES.ARROW_DOWN:
					this.nextPokemon();
					break;
				// case CONST.KEY_CODES.ARROW_LEFT:
				// 	this.prevSprite();
				// 	break;
				// case CONST.KEY_CODES.ARROW_RIGHT:
				// 	this.nextSprite();
				// 	break;
			}
		}
	}

	//RESULTS
	searchResults: MinPokemon[] = [];
	currentIndex: number = 0;

	currentPokemon: MinPokemon | null = null;

	//Header
	pokemonInput: string = "";

	//Screen
	screenMessage: string = "";
	imgSrc: string = COMPONENT_CONSTANTS.IMG.STATIC;
	showStatic: boolean = true;

	//Footer

	//Rigth panel
	showDetails: boolean = false;
	displayDetails: boolean = false;

	//selected sprite
	// spriteIndex: number = 0;
	sprite: pokeImage = {
		alt: "",
		background: "",
		src: ""
	};

	displayStatic() {
		this.showStatic = true;

		setTimeout(() => {
			this.showStatic = false;
		}, 150);
	}

	async performSearch() {
		if(this.pokemonInput.length >=4){

			this.searchResults = [];
			this.imgSrc = COMPONENT_CONSTANTS.IMG.LOADING;
			this.writeMsg(CONST.MSG.SEARCHING);
	
			let ids = this.pokeApi.getPokemonIds(this.pokemonInput);
			let res: pokemonServiceResponse[] = await this.pokeApi.findPokemon(ids);
	
			if (res.length > 0) {
				this.showStatic = false;
				res.forEach((pokemon: pokemonServiceResponse) => {
					this.searchResults.push(new MinPokemon(pokemon.pokemon, pokemon.specie));
				});
	
				this.currentIndex = 0;
				this.setCurrentPokemon(this.searchResults[this.currentIndex]);
	
			} else {
				this.searchResults = [];
				this.imgSrc = COMPONENT_CONSTANTS.IMG.STATIC;
				this.writeMsg(CONST.MSG.NO_RESULT);
				this.showStatic = true;
			}
		}
	}

	setCurrentPokemon(pokemon: MinPokemon) {
		this.currentPokemon = pokemon;
		this.writePokemonName();
	}

	writePokemonName() {
		let text = `> ${this.currentPokemon!.name.toUpperCase()} (${this.currentIndex + 1}/${this.searchResults.length})`;

		this.writeMsg(text);
	}

	writeMsg(text: string) {
		this.screenMessage = text;
	}

	toggleDetails() {
		this.showDetails = !this.showDetails;
	}

	toggleDisplayDetails(event: AnimationEvent) {
		if (event.phaseName == "done" && event.toState == "open") {
			this.displayDetails = true;
		} else if (event.phaseName == "start" && event.toState == "closed") {
			this.displayDetails = false;
		}

	}

	nextPokemon() {
		let index = this.calculateNextIndex(this.searchResults, this.currentIndex);
		this.moveIndex(index);
	}

	prevPokemon() {
		let index = this.calculatePrevIndex(this.searchResults, this.currentIndex);
		this.moveIndex(index);
	}

	moveIndex(index: number) {
		this.displayStatic();
		this.currentIndex = index;
		// this.spriteIndex = 0;
		this.setCurrentPokemon(this.searchResults[this.currentIndex]);
	}

	calculateNextIndex(array: any[], currentIndex: number) {
		return currentIndex == array.length - 1 ? 0 : currentIndex + 1;
	}

	calculatePrevIndex(array: any[], currentIndex: number) {
		return currentIndex == 0 ? array.length - 1 : currentIndex - 1;
	}

	selectedSprite(image: pokeImage) {
		this.sprite = image;
	}

}
