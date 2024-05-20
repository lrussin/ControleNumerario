import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterbancarioService {

  private getInterbancario = 'https://localhost:7162/api/TransacoesInterbancario/byBanco?banco=104&dataInicial=2022-09-01&dataFinal=2022-09-12';
constructor(
  private httpClient:HttpClient,
) { }

GetInterbancario():Observable<any>{
  return this.httpClient.get<any>(this.getInterbancario);
}

}
