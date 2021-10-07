import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { firstValueFrom, Observable } from 'rxjs';
import { API_KEY } from "./env";

// const API_KEY = 
const url = 'https://translation.googleapis.com/language/translate/v2'

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
  async get(q: string, target: string): Promise<any> {
    let uri = `${url}?q=${q}&target=${target}&key=${API_KEY}`
    console.log(uri);
    let resApi = await firstValueFrom(this.httpService.get<AxiosResponse<any>>(uri)).catch(() => {
      throw new HttpException('Request failed with status code',999)
    })
    return Promise.resolve(resApi.data.data.translations[0].translatedText)
  }

}
