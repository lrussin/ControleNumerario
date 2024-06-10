
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PontoAtendimento } from 'src/app/util/interfaces/PontoAtendimento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = environment.baseApiUrl + '/api/PA/GetAllPA';

  constructor(
    private httpClient : HttpClient,
  ) { }

  GetAllPA(pageNumber: number, pageSize: number): Observable<PontoAtendimento> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())

    return this.httpClient.get<any>(this.baseUrl, { params });
  }
}
