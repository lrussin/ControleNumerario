import { LoginService } from 'src/app/views/login/Service/login.service';
import { DadosInterbancario } from '../../../util/interfaces/DadosInterbancario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterbancarioService {

  private getInterAll = environment.baseApiUrl + '/api/TransacoesInterbancario/byAllInterbancario';
  private getInterbancario = environment.baseApiUrl + '/api/TransacoesInterbancario/byBanco?';
  private getInterDate = environment.baseApiUrl + '/api/TransacoesInterbancario/byDate?'

  constructor(
    private httpClient: HttpClient,
    private LoginService: LoginService,
  ) {}

  GetInterbancario(): Observable<DadosInterbancario[]> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.httpClient.get<any[]>(this.getInterAll, { headers: headers }).pipe(
      map(data => data.map(item => item.bancoDebito))
    );
  }

  GetInterAllDados(selectedBanco: number, dataInicial: string, dataFinal: string, pageNumber: number, pageSize: number): Observable<DadosInterbancario> {
    let getInterDados = this.getInterbancario + 'banco='  + selectedBanco + '&dataInicial=' + dataInicial + '&dataFinal=' + dataFinal
                       + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    return this.httpClient.get<any>(getInterDados, { headers: headers} );
  }

  GetInterDate(pageNumber: number, pageSize: number,dataInicial: string, dataFinal: string): Observable<DadosInterbancario> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('dataInicial', dataInicial)
      .set('dataFinal', dataFinal);

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    return this.httpClient.get<any>(this.getInterDate, { params, headers: headers });
  }

  getExcelImport(selectedBanco: number,dataInicial: string,dataFinal: string,pageNumber: number,pageSize: number): Observable<any> {
    let exportUrl: string;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    if (selectedBanco !== 0) {
      exportUrl = this.getInterbancario + `banco=${selectedBanco}&dataInicial=${(dataInicial)}&dataFinal=${(dataFinal)}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    } else {
      exportUrl = this.getInterDate + `pageNumber=${pageNumber}&pageSize=${pageSize}&dataInicial=${(dataInicial)}&dataFinal=${(dataFinal)}`;
    }

    return this.httpClient.get<any[]>(exportUrl, {headers: headers});
  }

}
