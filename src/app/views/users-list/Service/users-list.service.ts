import { UserList } from './../../../util/interfaces/UserList';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private baseUrl = 'https://localhost:7162/api/Usuario';
  private deleteUrl =  'https://localhost:7162/api/Usuario';

  constructor(
    private httpClient: HttpClient
  ) {}

  GetAllUsers(pageNumber: number, pageSize: number): Observable<UserList[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get<any>(this.baseUrl, { params });
  }

  deleteUser(userId : number): Observable<any> {
    let deleteUserUrl = this.deleteUrl + '?id=' + userId;
    return this.httpClient.delete(deleteUserUrl,  { responseType: 'text' });
    // return this.httpClient.delete<any>(deleteUserUrl);
  }
}
