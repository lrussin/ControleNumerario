import {ParameterList} from './../../../util/interfaces/ParameterList';
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeScale } from 'chart.js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private baseUrl = environment.baseApiUrl + '/api/Parameters';

constructor(
  private httpClient:HttpClient
) { }

GetAllParams(pageNumber:number,pageSize: number):Observable<ParameterList>{
  let params = new HttpParams()
  .set('pageNumber',pageNumber.toString())
  .set('pageSize',pageSize.toString())
  .set('descriptogradado',true);

  return this.httpClient.get<ParameterList>(this.baseUrl, { params })
}

}
