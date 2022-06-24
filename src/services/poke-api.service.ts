import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/models/pokemon.model';
import pokeList from '../data/pokemon.json';
import { UtilsService } from './utils.service';
import CONST from '../CONST.json';
import {
  apiResponse,
  pokemonApiResponse,
  pokemonServiceResponse,
  specieApiResponse,
  variety,
} from 'src/common/interfaces';
import { Specie } from 'src/models/specie.model';
import { MinPokemon } from 'src/models/min-pokemon.model';
import { MicroPokemon } from 'src/models/micro-pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService implements OnInit {
  allPokemon: Object[] = [];
  allSpecies: specieApiResponse[] = [];

  pokemonCacheModified: boolean = false;
  specieCacheModified: boolean = false;

  fetchedPokemon: any;
  pokemonList = pokeList;
  pokemonCache: any = {};
  speciesCache: any = {};

  constructor(private utils: UtilsService) {}

  async ngOnInit() {}

  async initialize() {
    const allSpecies = await this.utils.getCache(CONST.CACHE.ALL_SPECIES);
    if (!allSpecies || (Array.isArray(allSpecies) && allSpecies.length == 0)) {
      await this.utils.axiosGet({
        url: 'https://pokeapi.co/api/v2/pokemon-species/',
      });

      // 	let response: any = {
      // 		next: "https://pokeapi.co/api/v2/pokemon-species/"
      // 	};

      // 	while (response.next) {
      // 		response = await this.utils.get({
      // 			url: response.next
      // 		});

      // 		if (response.success) {
      // 			response = response.res;
      // 			if (response.results && response.results.length > 0) {
      // 				this.allSpecies = this.allSpecies.concat(response.results.map((item: any) => {
      // 					return {
      // 						id: item.url.split("/")[item.url.split("/").length - 2],
      // 						name: item.name,
      // 						url: item.url
      // 					}
      // 				}));
      // 			}
      // 		}
      // 	}

      // 	this.utils.saveCache(CONST.CACHE.ALL_SPECIES, this.allSpecies);
      // } else {
      // 	this.allSpecies = allSpecies;
      // }

      // this.pokemonCache = await this.utils.getCache(CONST.CACHE.POKEMON) || {};
      // this.speciesCache = await this.utils.getCache(CONST.CACHE.SPECIES) || {};
    }
  }

  getPokemonIds(param: string) {
    return this.allSpecies
      .filter((specie: specieApiResponse) => {
        return specie.name.toUpperCase().indexOf(param.toUpperCase()) !== -1;
      })
      .map((specie: specieApiResponse) => specie.name);
  }

  async findPokemon(param: string[]): Promise<pokemonServiceResponse[]> {
    return new Promise(async (resolve) => {
      let results: pokemonServiceResponse[] = [];
      let index = 0;

      while (param[index]) {
        let pokemon: pokemonApiResponse, specie: Specie;
        pokemon = await this.fetchPokemon(param[index]);

        specie = await this.findSpecie(param[index]);

        results.push({
          pokemon: pokemon as pokemonApiResponse,
          specie: specie,
        });

        index++;
      }

      if (this.pokemonCacheModified) {
        this.utils.saveCache(CONST.CACHE.POKEMON, this.pokemonCache);
        this.pokemonCacheModified = false;
      }
      if (this.specieCacheModified) {
        this.utils.saveCache(CONST.CACHE.SPECIES, this.speciesCache);
        this.specieCacheModified = false;
      }

      resolve(results);
    });
  }

  async findSpecie(param: string): Promise<Specie> {
    return new Promise(async (resolve) => {
      if (this.speciesCache[param]) {
        resolve(this.speciesCache[param]);
      } else {
        let specieResponse: apiResponse = (await this.utils.get({
          url: `https://pokeapi.co/api/v2/pokemon-species/${param}`,
        })) as apiResponse;

        if (specieResponse.success) {
          this.specieCacheModified = true;

          let specieApi: specieApiResponse =
            specieResponse.res as specieApiResponse;
          let specie = new Specie(
            specieApi.name,
            specieApi.id,
            specieApi.flavor_text_entries
          );

          let index: number = 0;

          while (specieApi.varieties[index]) {
            let variety = specieApi.varieties[index];
            let pokeApi = await this.fetchPokemon(variety.pokemon.name);
            specie.addVariety(
              new MicroPokemon(
                pokeApi.name,
                pokeApi.id,
                pokeApi.sprites,
                pokeApi.types
              )
            );
            index++;
          }

          this.speciesCache[specie.name] = specie;
          resolve(specie);
        }
      }
    });
  }

  async fetchPokemon(param: string): Promise<pokemonApiResponse> {
    return new Promise(async (resolve) => {
      if (this.pokemonCache[param]) {
        resolve(this.pokemonCache[param] as pokemonApiResponse);
      } else {
        let response: apiResponse = (await this.utils.get({
          url: `https://pokeapi.co/api/v2/pokemon/${param}`,
        })) as apiResponse;

        if (response.success) {
          this.pokemonCacheModified = true;
          this.pokemonCache[response.res.name] = response.res;
          resolve(response.res as pokemonApiResponse);
        }
      }
    });
  }
}
