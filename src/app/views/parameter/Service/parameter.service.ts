import {ParameterList} from './../../../util/interfaces/ParameterList';
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeScale } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private baseUrl = 'https://localhost:7162/parameters/Parameters';

constructor(
  private httpClient:HttpClient
) { }

GetAllParams(pageNumber:number,pageSize: number):Observable<ParameterList[]>{
  let params = new HttpParams()
  .set('pageNumber',pageNumber.toString())
  .set('pageSize',pageSize.toString())
  .set('descriptografado',true);

  return this.httpClient.get<any>(this.baseUrl,{params})
}

}
