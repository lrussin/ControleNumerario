import { LoginService } from './../../login/Service/login.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalPointService {

  private getOpCaixaUrl = 'https://localhost:7162/api/OpCaixa/GetOpCaixa';

constructor(
  private httpClient: HttpClient,
  private LoginService: LoginService
) { }

  opCaixa(numTerminal : number, pA : number, dataInicial: string, dataFinal: string, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('numTerminal', numTerminal.toString())
      .set('pontoAtendimento', pA.toString())
      .set('dataInicial', dataInicial)
      .set('dataFinal', dataFinal)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
      return this.httpClient.get<any>(this.getOpCaixaUrl, { params, headers: headers });
  }
}
