import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RandomListComponent } from './random-list/random-list.component';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { PokeSearchComponent } from './poke-search/poke-search.component';

const routes: Routes = [
	{
		path:"",
		component: RandomListComponent
	},
	{
		path:"pokemon/:specie",
		component: PokeDetailComponent
	},
	{
		path:"search",
		component: PokeSearchComponent
	}
]

@NgModule({
  imports: [
	RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
