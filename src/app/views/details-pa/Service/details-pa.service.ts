import { LoginService } from 'src/app/views/login/Service/login.service';
import { UnidadeInstituicao } from './../../../util/interfaces/UnidadeInstituicao';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsPaService {

constructor(
  private httpClient : HttpClient,
  private LoginService: LoginService
) { }

  private getPaUrl = environment.baseApiUrl + '/api/PA/GetPA';

  GetByPA(pageNumber: number, pageSize: number, id?: number): Observable<{ unidadeInstituicao: UnidadeInstituicao }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      let getByPaUrl = this.getPaUrl + "?id=" + id;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    return this.httpClient.get<{ unidadeInstituicao: UnidadeInstituicao }>(getByPaUrl, { params, headers : headers });
  }

  getExcelImport(idTerminal: number,pageNumber: number,pageSize: number): Observable<any> {

    let exportUrl = this.getPaUrl + '?id=' + idTerminal + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.httpClient.get<any[]>(exportUrl, {headers: headers});
  }

}
