import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { image, pokeImage } from 'src/common/interfaces';

@Component({
	selector: 'app-sprites-list',
	templateUrl: './sprites-list.component.html',
	styleUrls: ['./sprites-list.component.css'],
	animations: [
		trigger('activeSprite', [
			state('active', style({
				backgroundColor: 'green'
			})),
			state('inactive', style({
				backgroundColor: 'lightblue'
			})),
			transition('* => *', [
				animate('0.1s')
			]),
		])
	]
})
export class SpritesListComponent implements OnInit {
	@Output() sprite = new EventEmitter<pokeImage>();
	@Input() sprites: pokeImage[] = [];

	spritesToRender: pokeImage[] = [];
	spriteIndex: number = 0;
	spritesLength: number = 10;
	constructor() { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges) {
		let sprites = changes["sprites"].currentValue;
		if (sprites) {
			this.spriteIndex = 0;
			this.spritesToRender = [];
			sprites.forEach((sprite: pokeImage, index: number) => {
				setTimeout(() => {
					this.spritesToRender[index] = sprite;
				}, 100 * index)
			});

			this.selectSprite();
		}
	}

	nextSprite() {
		this.spriteIndex = this.spriteIndex == this.sprites.length - 1 ? 0 : this.spriteIndex + 1;
		this.selectSprite();
	}

	prevSprite() {
		this.spriteIndex = this.spriteIndex == 0 ? this.sprites.length - 1 : this.spriteIndex - 1;
		this.selectSprite();
	}

	selectSprite() {
		this.sprite.emit(this.sprites[this.spriteIndex]);
	}

	counter() {
		return new Array(this.spritesLength);
	}

}
