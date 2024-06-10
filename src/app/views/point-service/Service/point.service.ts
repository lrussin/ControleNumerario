import { LoginService } from './../../login/Service/login.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, PontoAtendimento } from 'src/app/util/interfaces/PontoAtendimento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private baseUrl = environment.baseApiUrl + '/api/PA/GetAllPA';

  private paData: Item[] = [];

  constructor(
    private HttpClient : HttpClient,
    private LoginService: LoginService,
  ) { }

  GetAllPA(pageNumber: number, pageSize: number): Observable<PontoAtendimento> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.HttpClient.get<any>(this.baseUrl, { params, headers : headers });
  }

  setData(data: Item[]): void {
    this.paData = data;
  }

  getData(): Item[] {
    return this.paData;
  }

}
