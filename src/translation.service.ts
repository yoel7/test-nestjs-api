import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { firstValueFrom, Observable } from 'rxjs';

const API_KEY = 'AIzaSyD2wts5vuppwNwk69hpIprVka4tpn9_kj4'
const url = 'https://translation.googleapis.com/language/translate/v2'

@Injectable()
export class TranslationService {
    constructor(private httpService: HttpService) {}

  async get(q: string, target: string): Promise<any> {
    // return this.httpService.post<AxiosResponse<any>>(`${url}?q=${encodeURIComponent(q)}&target=${target}&key=${API_KEY}`);
    let urii = `${url}?q=${q}&target=${target}&key=${API_KEY}`
    console.log(urii);
      // return await firstValueFrom(this.httpService.post<AxiosResponse<any>>(urii))
    let res = await firstValueFrom(this.httpService.post<AxiosResponse<any>>(urii))
    console.dir(res);
    
     if (res.status != 200) {
        return { msg: 'Request failed with status code ' + res.status }
          }
    return (res && res.data && res.data.data&&res.data.data.translations[0].translatedText)|| res;



      // firstValueFrom(this.httpService.post<AxiosResponse<any>>(urii)).then()
      // this.httpService.post<AxiosResponse<any>>(urii))
        // .subscribe({
        //   next: (resg) => {
        //     return resg.data.data.translations[0].translatedText;
        //   },
        //    error: (resg) => 'Request failed with status code ' + resg.status
        // });
    // return new Promise((resolve, reject) => {
    //   this.httpService.post<AxiosResponse<any>>(urii)
    //     .subscribe((resg) => {
    //       if (resg.status != 200) {
    //         reject({ msg: 'Request failed with status code ' + resg.status })
    //       }
    //       resolve(resg.data.data.translations[0].translatedText);
    //     });
    // })
  }

}
