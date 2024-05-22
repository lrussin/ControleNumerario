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
  private exportExcel = 'https://localhost:7162/api/TransacoesInterbancario/byDate?dataInicial=01%2F09%2F2022&dataFinal=11%2F09%2F2022';

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

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.exportExcel);
  }

}
