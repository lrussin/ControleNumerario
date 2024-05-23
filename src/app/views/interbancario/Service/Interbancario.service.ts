import { DadosInterbancario } from '../../../util/interfaces/DadosInterbancario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterbancarioService {

  private getInterAll ='https://localhost:7162/api/TransacoesInterbancario/byAllInterbancario';
  private getInterbancario = 'https://localhost:7162/api/TransacoesInterbancario/byBanco?';
  private getInterDate = 'https://localhost:7162/api/TransacoesInterbancario/byDate?'

  constructor(
    private httpClient: HttpClient
  ) {}

  GetInterbancario(): Observable<DadosInterbancario[]> {
    return this.httpClient.get<any[]>(this.getInterAll).pipe(
      map(data => data.map(item => item.bancoDebito))
    );
  }

  GetInterAllDados(selectedBanco: number, dataInicial: string, dataFinal: string, pageNumber: number, pageSize: number): Observable<DadosInterbancario[]> {
    let getInterDados = this.getInterbancario + 'banco='  + selectedBanco + '&dataInicial=' + dataInicial + '&dataFinal=' + dataFinal;
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<any>(getInterDados, { params } );
  }

  GetInterDate(dataInicial: string, dataFinal: string): Observable<DadosInterbancario[]> {
    let getInterDados = this.getInterDate + 'dataInicial=' + dataInicial + '&dataFinal=' + dataFinal;
    return this.httpClient.get<any>(getInterDados);
  }

  getExcelImport(selectedBanco: number,dataInicial: string,dataFinal: string,pageNumber: number,pageSize: number): Observable<any[]> {
    let exportUrl: string;

    if (selectedBanco !== 0) {
      exportUrl = this.getInterbancario + `banco=${selectedBanco}&dataInicial=${(dataInicial)}&dataFinal=${(dataFinal)}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    } else {
      exportUrl = this.getInterDate + `dataInicial=${(dataInicial)}&dataFinal=${(dataFinal)}`;
    }

    return this.httpClient.get<any[]>(exportUrl);
  }

}
