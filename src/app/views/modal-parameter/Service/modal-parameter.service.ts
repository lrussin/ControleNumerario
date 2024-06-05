import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/util/interfaces/ParameterList';

@Injectable({
  providedIn: 'root'
})
export class ModalParameterService {


  private registerParamUrl = 'https://localhost:7162/parameters/Parameters'
  private updateParamUrl = 'https://localhost:7162/parameters/Parameters/{id}'

constructor(
  private httpClient : HttpClient
) { }



registerParam (formUpdate: Item): Observable<any> {
  let body = {
    "name": formUpdate.name,
    "value": formUpdate.value
  };

  return this.httpClient.post(this.registerParamUrl, body);
}

  updateParam (formUpdate: Item): Observable<any> {
    let updateParamURL = this.updateParamUrl.replace('{id}', formUpdate.id);
    let body = {
      "name": formUpdate.name,
      "value": formUpdate.value
    };

    return this.httpClient.put(updateParamURL, body);
  }
}
