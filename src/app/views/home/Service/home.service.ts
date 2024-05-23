
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'https://localhost:7162/PA/GetAllPA';

  constructor(
    private httpClient : HttpClient,
  ) { }

  GetAllPA(pageNumber: number, pageSize: number, descriptogradado: boolean): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('descriptogradado', descriptogradado.toString())

    return this.httpClient.get<any>(this.baseUrl, { params });
  }
}