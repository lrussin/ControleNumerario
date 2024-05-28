import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/util/interfaces/ParameterList';

@Injectable({
  providedIn: 'root'
})
export class ModalParameterService {

  private updateParamUrl = 'https://localhost:7162/parameters/Parameters/{id}'

constructor(
  private httpCliente : HttpClient
) { }


  updateParam (formUpdate: Item): Observable<any> {
    let updateParamURL = this.updateParamUrl.replace('{id}', formUpdate.id);
    let body = {
      "name": formUpdate.name,
      "value": formUpdate.value
    };

    return this.httpCliente.put(updateParamURL, body);
  }
}
