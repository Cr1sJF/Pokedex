import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as localforage from 'localforage';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { ApiResponse } from '../models/apiResponse-model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private httpClient: HttpClient) {}

  get(options: any) {
    return new Promise((resolve) => {
      this.httpClient.get(options.url).subscribe(
        (res) => resolve({ success: true, res: res }),
        (err) => resolve({ success: false, err: err })
      );
    });
  }

  axiosGet(options: any) {
    return new Promise(async (resolve, reject) => {
      let response: ApiResponse;
      try {
        response = new ApiResponse(await axios.get(options.url));
        resolve(response);
      } catch (error) {
        response = new ApiResponse(error);
        reject(response);
      }
    });
  }

  getAllResultsFormApi(apiUrl:string){
	return new Promise(async(resolve, reject)=>{
		let results: ApiResponse[] = [];

		try {
			let res:AxiosResponse = await axios.get(apiUrl);
			
			if(res.data.next){
				const total = res.data.count;
				const nextUrl = new URL(res.data.next);
				const limit = new URLSearchParams(nextUrl.search).get("limit");

				const requests: string[] = [];

				if(limit && total > limit){
					while(total > limit){
						requests.push(`${apiUrl}?`)
					}
				}
			}
			resolve([new ApiResponse(res)]);
		} catch (error) {
			
		}

	});
  }

  post(options: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(options.url, options.body).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  saveCache(key: string, value: any) {
    localforage.setItem(key, value);

    // localStorage.setItem(key, typeof value == "object" ? JSON.stringify(value) : value.toString());
  }

  async getCache(key: string) {
    let item: any = await localforage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  deleteCache(key: string) {
    localforage.removeItem(key);
  }

  clearCache() {
    localforage.clear();
  }

  decodeObjectProp(object: any, propertyPath: string) {
    propertyPath = propertyPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    propertyPath = propertyPath.replace(/^\./, ''); // strip a leading dot
    var a = propertyPath.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k: string = a[i];
      if (k in object) {
        object = object[k];
      } else {
        return;
      }
    }
    return object;
  }

  buildAllURLs(baseUrl: string, totalItems: number, offset: number) {}
}
