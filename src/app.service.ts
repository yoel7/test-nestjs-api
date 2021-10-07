import { HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { firstValueFrom, Observable } from 'rxjs';
import { API_KEY } from "./env";

// const API_KEY = 
const url = 'https://translation.googleapis.com/language/translate/v2'

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
  // async get(q: string, target: string): Promise<any> {
  //   let uri = `${url}?q=${q}&target=${target}&key=${API_KEY}`
  //   let resApi = await firstValueFrom(this.httpService.get<AxiosResponse<any>>(uri)).catch(() => {
  //     throw new HttpException('Request failed with status code',999)
  //   })
  //   return Promise.resolve(resApi.data.data.translations[0].translatedText)
  // }

  async get(q: string, target: string): Promise<any> {
    let uri = `${url}?q=${q}&target=${target}&key=${API_KEY}`
    let res: any = await firstValueFrom(this.httpService.get<AxiosResponse<any>>(uri)).catch((e) => {
      if (e.response.data.error.message ==='Invalid Value') throw new HttpException(e.message, 400);
      console.error('Internal server error');
      throw new ServiceUnavailableException()
    })
      return res.data.data.translations[0].translatedText
    // return Promise.resolve(resApi.data.data.translations[0].translatedText)
  }
}
