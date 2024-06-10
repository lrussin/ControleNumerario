import { LoginService } from 'src/app/views/login/Service/login.service';
import {ParameterList} from './../../../util/interfaces/ParameterList';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeScale } from 'chart.js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private baseUrl = environment.baseApiUrl + '/api/Parameters';

constructor(
  private httpClient:HttpClient,
  private LoginService: LoginService
) { }

GetAllParams(pageNumber:number,pageSize: number):Observable<ParameterList>{
  let params = new HttpParams()
  .set('pageNumber',pageNumber.toString())
  .set('pageSize',pageSize.toString())
  .set('descriptogradado',true);

  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
  return this.httpClient.get<ParameterList>(this.baseUrl, { params, headers : headers })
}

}
