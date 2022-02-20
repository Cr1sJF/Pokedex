import { image, pokeImage, sprites, type } from "src/common/interfaces";

export class MicroPokemon{
	id: number = 0;
	name: string ="";
	img:pokeImage ={
		alt:"",
		src:"",
		background: ""
	}

	constructor(name:string, id:number, sprites: sprites, types: type[]){
		this.name = name;
		this.id = id;
		this.img = this.getMainImg(sprites, this.getMainType(types));
	}

	getMainImg(sprites: sprites, type: string): pokeImage{

		return {
			alt: this.name,
			src: sprites.other['official-artwork'].front_default || "/assets/no-img.png",
			background: type
		};
	}

	getMainType(types: type[]):string{
		return types ? types.find((type: any) => type.slot === 1)!.type.name : "";
	}

}