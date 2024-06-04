import { MoedaService } from './../../services/moeda.service';
import { CommonModule, DatePipe, NgFor, NgIf, NgStyle, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { InterbancarioService } from './Service/Interbancario.service';
import { DadosInterbancario, Item } from 'src/app/util/interfaces/DadosInterbancario';
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
    CommonModule,
    DatePipe
  ],
  templateUrl: './interbancario.component.html',
  styleUrl: './interbancario.component.scss',
})
export class InterbancarioComponent {

  pageNumber = 1;
  pageSize = 20;

  buttonExport: boolean = false
  bancoDebito: DadosInterbancario[] = [];
  selectedBanco: number = 0;
  dataInicial: string = '';
  dataFinal: string = '';
  dadosInter: Item[] = [];
  resultInter: boolean = false
  valorTotal: string = '';
  isExportDisabled: boolean = true;

  constructor(
    private interbancarioService: InterbancarioService,
    private MoedaService : MoedaService
  ) {  }

  ngOnInit(): void {
    this.getByBanco();
  }

  getByBanco() {
    this.interbancarioService.GetInterbancario().subscribe({
      next: (response) => {
        this.bancoDebito = response;
      },
      error: (error) => {
        console.error('Erro ao buscar Transações', error);
      },
    });
  }

  exportarDados(selectedBanco: number, dataInicial: string, dataFinal: string): void {

    const dataInicialFormatted= formatDate(dataInicial, 'dd/MM/yyyy', 'en-US');
    const dataFinalFormatted = formatDate(dataFinal, 'dd/MM/yyyy', 'en-US');

    if (selectedBanco != 0) {
      this.interbancarioService.GetInterAllDados(selectedBanco, dataInicialFormatted, dataFinalFormatted, this.pageNumber,this.pageSize).subscribe({
        next: (response : DadosInterbancario) => {
          this.dadosInter = response.items;
          this.resultInter = true
          this.valorTotal = this.calcularValorTotal(response.items);
          this.isExportDisabled = false;
        },
        error: (error) => {
          console.error('Erro ao buscar Transações', error);
        },
      });
    }
    else {
      this.interbancarioService.GetInterDate(this.pageNumber,this.pageSize,dataInicialFormatted, dataFinalFormatted).subscribe({
        next: (response : DadosInterbancario) => {
          this.dadosInter = response.items;
          this.resultInter = true
          this.valorTotal = this.calcularValorTotal(response.items);
          this.isExportDisabled = false;
        },
        error: (error) => {
          console.error('Erro ao buscar Transações', error);
        },
      });
    }
  }

  calcularValorTotal(dados: any[]): string {
    const total = dados.reduce((sum, item) => sum + item.valor, 0);
    return this.MoedaService.maskCurrency(total);
  }

  formatCurrency(value: number): string {
    return this.MoedaService.maskCurrency(value);
  }

  exportToExcel(): void {
    if (!this.isExportDisabled) {
      const dataInicialFormatted= formatDate(this.dataInicial, 'dd/MM/yyyy', 'en-US');
      const dataFinalFormatted = formatDate(this.dataFinal, 'dd/MM/yyyy', 'en-US');
      this.interbancarioService.getExcelImport(this.selectedBanco,dataInicialFormatted,dataFinalFormatted,this.pageNumber,this.pageSize).subscribe((data: DadosInterbancario) => {
        const filteredData = data.items.map((row: Item) => {

          const dateParts = row.dataHora.split('T')[0].split('-');
          const dataMovimentacao = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
          const valorFormatado = Number(row.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          return {
            DataMovimentacao: dataMovimentacao,
            Banco: row.bancoDebito,
            AgenciaDebito: row,
            AgenciaCredito: row.agenciaCredito,
            Situacao: row.situacao,
            Valor: valorFormatado,
          };
        });

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'TransaçõesInterbancaria.xlsx');
      });
    }
  }

}
