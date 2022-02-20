import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
	selector: 'app-console',
	templateUrl: './console.component.html',
	styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit, OnChanges {
	screenMessage: string = "";

	@Input() message: string = "";
	@Input() consoleId: string = "";
	@Input() styles: any;
	@Input() title: string = "";
	@Input() timeOut: number = 20

	charIndex: number = 0;
	timeOuts: any[] = [];

	constructor() { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges) {
		let text = changes["message"];

		if (text && text.previousValue != text.currentValue) {
			this.writeMsg(text.currentValue);
		}
	}



	writeMsg(text: string) {		
		this.timeOuts.forEach(timeOut =>{
			clearTimeout(timeOut);
		});
		this.screenMessage ="";
		this.charIndex = 0;

		this.write(text);
	}

	write(text:string){
		if (this.charIndex < text.length) {
			this.screenMessage += text.charAt(this.charIndex);
			this.charIndex++;
			this.timeOuts.push(setTimeout(() => { this.write(text) }, this.timeOut));
		}
	}

}
