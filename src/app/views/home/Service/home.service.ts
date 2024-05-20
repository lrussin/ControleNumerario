
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private getAllPaUrl = 'https://localhost:7162/PA/GetAllPA?pageNumber=1&pageSize=10';

  constructor(private http: HttpClient) { }

  GetAllPA(): Observable<any> {
    return this.http.get<any>(this.getAllPaUrl);
  }
}
