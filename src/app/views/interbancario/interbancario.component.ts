import { MoedaService } from './../../services/moeda.service';
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { InterbancarioService } from './Service/Interbancario.service';
import { DadosInterbancario } from 'src/app/util/interfaces/DadosInterbancario';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-interbancario',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    IconDirective,
    FormsModule,
    AccordionComponent,
    AccordionButtonDirective,
    AccordionItemComponent,
    TemplateIdDirective,
    NgFor,
    CommonModule
  ],
  templateUrl: './interbancario.component.html',
  styleUrl: './interbancario.component.scss',
})
export class InterbancarioComponent {

  pageNumber = 1;
  pageSize = 20;


  bancoDebito: DadosInterbancario[] = [];
  selectedBanco: number = 0;
  dataInicial: string = '';
  dataFinal: string = '';
  dadosInter: DadosInterbancario[] = [];
  resultInter: boolean = false
  valorTotal: string = '';

  constructor(
    private interbancarioService: InterbancarioService,
    private MoedaService : MoedaService
  ) {  }

  ngOnInit(): void {
    console.log('Iniciando component Interbancario');
    this.interbancarioService.GetInterbancario().subscribe({
      next: (response) => {
        this.bancoDebito = response;
        console.log(this.bancoDebito);
      },
      error: (error) => {
        console.error('Erro ao buscar Transações', error);
      },
    });
  }

  exportarDados(selectedBanco: number, dataInicial: string, dataFinal: string): void {
    console.log(selectedBanco)
    if (selectedBanco != 0) {
      this.interbancarioService.GetInterAllDados(selectedBanco, dataInicial, dataFinal, this.pageNumber,this.pageSize).subscribe({
        next: (response) => {
          this.dadosInter = response;
          this.resultInter = true
          this.valorTotal = this.calcularValorTotal(response);
          console.log(this.dadosInter);
        },
        error: (error) => {
          console.error('Erro ao buscar Transações', error);
        },
      });
    }
    else {
      this.interbancarioService.GetInterDate(dataInicial, dataFinal).subscribe({
        next: (response) => {
          this.dadosInter = response;
          this.resultInter = true
          this.valorTotal = this.calcularValorTotal(response);
          console.log(this.dadosInter);
        },
        error: (error) => {
          console.error('Erro ao buscar Transações', error);
        },
      });
    }
  }

  calcularValorTotal(dados: any[]): string {
    const total = dados.reduce((sum, item) => sum + item.valor, 0); // Supondo que 'valor' é o campo que você quer somar
    return this.MoedaService.maskCurrency(total); // Formatar o valor total para o padrão brasileiro
  }

  exportToExcel(): void {
    this.interbancarioService.getData().subscribe(data => {
      // Remover a terceira coluna (índice 2)
      const filteredData = data.map(row => {
        return {
          // Manter apenas as colunas desejadas e mapear outras conforme necessário
          dataHora: row.dataHora, // Mapear a primeira coluna
          coluna2: row.bancoDebito, // Mapear a segunda coluna
          // Adicionar outras colunas conforme necessário
        };
      });

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'data.xlsx');
    });
  }

}
