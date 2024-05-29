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

  formatCurrency(value: number): string {
    if (value == null) {
      return '';
    }

    // Formatar o número com separadores de milhares e duas casas decimais
    const formattedValue = value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // Adicionar o símbolo de moeda
    return ` ${formattedValue}`;
  }

}
