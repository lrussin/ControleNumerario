import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoedaService {
  constructor() {}

  maskCurrency(valor: number | string, locale = 'pt-BR', currency = 'BRL'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(Number(valor));
  }
}
