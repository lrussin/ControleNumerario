import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item, PontoAtendimento } from 'src/app/util/interfaces/PontoAtendimento';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private baseUrl = 'https://localhost:7162/PA/GetAllPA';

  private paData: Item[] = [];

  constructor(
    private HttpClient : HttpClient,
  ) { }

  GetAllPA(pageNumber: number, pageSize: number): Observable<PontoAtendimento> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())

    return this.HttpClient.get<any>(this.baseUrl, { params });
  }

  setData(data: Item[]): void {
    this.paData = data;
  }

  getData(): Item[] {
    return this.paData;
  }

}
