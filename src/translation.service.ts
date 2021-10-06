import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { firstValueFrom, Observable } from 'rxjs';
import { API_KEY } from "./env";

// const API_KEY = 
const url = 'https://translation.googleapis.com/language/translate/v2'

@Injectable()
export class TranslationService {
  constructor(private httpService: HttpService) { }

  // async get2(): Promise<any> {
  //   // return this.httpService.post<AxiosResponse<any>>(`${url}?q=${encodeURIComponent(q)}&target=${target}&key=${API_KEY}`);
  //   let urii = 'https://jsonplaceholder.typicode.com/todos/1';
  //   let R
  //   // return await this.httpService.get<AxiosResponse<any>>(urii).toPromise()
  //   await firstValueFrom(this.httpService.get<AxiosResponse<any>>(urii)).then(r => R = r).catch(r => R = r)
  //   return Promise.resolve(JSON.stringify(R.data))

  // }
  async get(q: string, target: string): Promise<any> {
    let uri = `${url}?q=${q}&target=${target}&key=${API_KEY}`
    console.log(uri);
    let resApi = await firstValueFrom(this.httpService.get<AxiosResponse<any>>(uri))
    // if (resApi.status != 200) {
    //   return Promise.reject('Request failed with status code ' + resApi.status)
    // }
    return Promise.resolve(resApi.data.data.translations[0].translatedText)
  }

}
