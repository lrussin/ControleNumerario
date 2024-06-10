import { LoginService } from './../../login/Service/login.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalPointService {

  private getOpCaixaUrl = environment.baseApiUrl +'/api/OpCaixa/GetOpCaixa';
  private getOpCaixaSaldoUrl = environment.baseApiUrl + '/api/OpCaixa/GetOpCaixaSaldo';

constructor(
  private httpClient: HttpClient,
  private LoginService: LoginService
) { }

getExcelImport(numTerminal : number, pa : number, dataInicial: string, dataFinal: string): Observable<any> {

    let params = new HttpParams()
      .set('numTerminal', numTerminal)
      .set('pontoAtendimento', pa)
      .set('dataInicial', dataInicial)
      .set('dataFinal', dataFinal)

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
      return this.httpClient.get<any>(this.getOpCaixaUrl, { params, headers: headers });
  }

  opCaixaSaldo(numTerminal : number, pa : number, dataInicial: string, dataFinal: string): Observable<any> {

    let params = new HttpParams()
      .set('numTerminal', numTerminal)
      .set('pontoAtendimento', pa)
      .set('dataInicial', dataInicial)
      .set('dataFinal', dataFinal)

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
      return this.httpClient.get<any>(this.getOpCaixaSaldoUrl, { params, headers: headers });
  }
}
