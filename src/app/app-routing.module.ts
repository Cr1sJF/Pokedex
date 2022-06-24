import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RandomListComponent } from './home_layout/random-list/random-list.component';
import { PokeDetailComponent } from './details_layout/poke-detail/poke-detail.component';
import { PokeSearchComponent } from './search_layout/poke-search/poke-search.component';

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
