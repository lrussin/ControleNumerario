import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptB64(value : string) : string {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
  }

  decryptB64(value : string) : string {
    return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
  }
}
