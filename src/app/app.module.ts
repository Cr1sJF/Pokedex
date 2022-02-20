import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { PokeApiService } from 'src/services/poke-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RandomListComponent } from './random-list/random-list.component';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { ConsoleComponent } from './common-components/console/console.component';
import { PokemonImageComponent } from './common-components/pokemon-image/pokemon-image.component';
import { SpritesListComponent } from './common-components/sprites-list/sprites-list.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		PokemonListComponent,
		PokemonCardComponent,
		SearchComponent,
		RandomListComponent,
		PokeDetailComponent,
		PokeSearchComponent,
		ConsoleComponent,
		PokemonImageComponent,
		SpritesListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		// NoopAnimationsModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		PokeApiService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
