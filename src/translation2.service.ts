import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Observable } from 'rxjs';


@Injectable()
export class Translation2Service {
     constructor(private httpService: HttpService) {}

  get(): Observable<AxiosResponse<any>> {
    return this.httpService.post('http://localhost:3000/cats');
  }

}
