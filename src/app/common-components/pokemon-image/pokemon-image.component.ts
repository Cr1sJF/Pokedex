import { Component, Input, OnInit } from '@angular/core';
import { pokeImage } from 'src/common/interfaces';

@Component({
	selector: 'app-pokemon-image',
	templateUrl: './pokemon-image.component.html',
	styleUrls: ['./pokemon-image.component.css']
})
export class PokemonImageComponent implements OnInit {
	@Input() showShadow: boolean = false;
	@Input() styles: any;
	@Input() image: pokeImage = {
		src: "",
		alt: "",
		background: ""
	}

	constructor() { }

	ngOnInit(): void {
	}

}
