import { LoginService } from 'src/app/views/login/Service/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/util/interfaces/ParameterList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalParameterService {


  private registerParamUrl = environment.baseApiUrl + '/api/Parameters'
  private updateParamUrl = environment.baseApiUrl + '/api/Parameters/{id}'

constructor(
  private httpClient : HttpClient,
  private LoginService: LoginService
) { }



registerParam (formUpdate: Item): Observable<any> {
  let body = {
    "name": formUpdate.name,
    "value": formUpdate.value
  };

  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
  return this.httpClient.post(this.registerParamUrl, body, { headers : headers});
}

  updateParam (formUpdate: Item): Observable<any> {
    let updateParamURL = this.updateParamUrl.replace('{id}', formUpdate.id);
    let body = {
      "name": formUpdate.name,
      "value": formUpdate.value
    };
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.httpClient.put(updateParamURL, body, { headers : headers});
  }
}
