import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(
    private jwtHelper: JwtHelperService,
  ) { }


  decrypt(value : string) : any {
    return this.jwtHelper.decodeToken(value);
  }
}
