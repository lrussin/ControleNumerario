import { TipoTerminal } from './../../util/interfaces/UnidadeInstituicao';
import { MoedaService } from './../../services/moeda.service';
import { PointService } from './../point-service/Service/point.service';
import { DetailsPaService } from './Service/details-pa.service';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ModalPointComponent } from '../modal-point/modal-point.component';
import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { Item } from 'src/app/util/interfaces/PontoAtendimento';
import { FormsModule } from '@angular/forms';
import { Terminal, UnidadeInstituicao } from 'src/app/util/interfaces/UnidadeInstituicao';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-details-pa',
  standalone: true,
  imports: [IconDirective, NgStyle, NgIf, ModalPointComponent, FormsModule, CommonModule],
  templateUrl: './details-pa.component.html',
  styleUrl: './details-pa.component.scss'
})
export class DetailsPaComponent implements OnInit{

  isModalOpen: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 0;
  pagesArray: number[] = [];
  paDetails: Item | undefined;
  terminalsBy: any;
  idUnidade: any;
  totalItems: number = 0;

  tipoTerminal: TipoTerminal[] = [];
  description = new Set<string>();

  terminal: Terminal[] = [];

  constructor(
    private DetailsPaService : DetailsPaService,
    private PointService : PointService,
    private MoedaService: MoedaService
  ) {}

  ngOnInit(): void {
    this.getHeaderPa();
    this.searchByPa();
  }

  getHeaderPa() {
    const data = this.PointService.getData();
    if (data.length > 0) {
      this.paDetails = data[0];
    }
  }

  formatCurrency(value: number): string {
    return this.MoedaService.formatCurrency(value);
  }

  searchByPa() {
    this.DetailsPaService.GetByPA(this.pageNumber, this.pageSize, this.paDetails?.idUnidadeInst).subscribe({

      //  É uma estrutura que possui a propriedade unidadeInstituicao
      next: (response: { unidadeInstituicao: UnidadeInstituicao }) => {

        // unidadeInstituicao e armazenando-a em uma variável local chamada unidadeInstituicao
        const unidadeInstituicao = response.unidadeInstituicao;
        this.idUnidade = unidadeInstituicao.idUnidadeInst

        // Você está acessando os terminais dentro de unidadeInstituicao e atribuindo-os à propriedade terminal
        this.terminal = unidadeInstituicao.terminals;
        this.totalPages = unidadeInstituicao.totalPages;
        this.totalItems = unidadeInstituicao.totalItems;

        this.tipoTerminal = [];

        // Assim, você pode mapear os terminais para seus tipos de terminal e adicioná-los ao array tipoTerminal
        this.tipoTerminal = this.terminal.map(terminal => terminal.tipoTerminal);
        this.description = new Set(this.tipoTerminal.map(item => item.descricao));
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  openModal(terminals: Terminal, idUnidade : any) {
    this.isModalOpen = true;
    this.terminalsBy = terminals;
    this.idUnidade = idUnidade;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.searchByPa();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
    this.searchByPa();
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.searchByPa();
  }

  circleColor(terminal: Terminal): string {
    const tipoTerminal = terminal.tipoTerminal;
    const saldo = terminal.saldo;

    if (saldo <= tipoTerminal.limInferior) {
      return 'var(--danger)';
    } else if (saldo >= tipoTerminal.mediana && saldo <= tipoTerminal.limSuperior) {
      return 'var(--warning-alert-1)';
    } else if (saldo >= tipoTerminal.limSuperior) {
      return 'var(--success)';
    } else {
      return 'transparent';
    }
  }

  tooltip(terminal: Terminal): string {
    const tipoTerminal = terminal.tipoTerminal;
    const saldo = terminal.saldo;

    if (saldo <= tipoTerminal.limInferior) {
      return 'Limite Inferior';
    } else if (saldo >= tipoTerminal.mediana && saldo <= tipoTerminal.limSuperior) {
      return 'Mediano';
    } else if (saldo >= tipoTerminal.limSuperior) {
      return 'Limite Superior';
    } else {
      return 'Tooltip padrão';
    }
  }

  exportToExcel(): void{
    this.DetailsPaService.getExcelImport(this.idUnidade ,this.pageNumber,this.totalItems).subscribe((response: { unidadeInstituicao: UnidadeInstituicao}) => {
      const unidadeInstituicao = response.unidadeInstituicao;
      const filteredData = unidadeInstituicao.terminals.map(terminal => {
        return {
          UnidadeInstituicao: unidadeInstituicao.idUnidadeInst,
          NomeInstituicao: this.paDetails?.nomeUnidade,
          Codigo: terminal.codigo,
          Saldo: Number(terminal.saldo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          Usuario: terminal.usuario,
          Descricao: terminal.tipoTerminal.descricao,
          LimiteSuperior: Number(terminal.tipoTerminal.limSuperior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          Mediana: Number(terminal.tipoTerminal.mediana).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          LimiteInferior: Number(terminal.tipoTerminal.limInferior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        };
      });

      // Convertendo para Excel
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'Terminais.xlsx');
    });
  }
}
