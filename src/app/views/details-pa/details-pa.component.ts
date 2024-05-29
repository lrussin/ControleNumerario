import { TipoTerminal } from './../../util/interfaces/UnidadeInstituicao';
import { MoedaService } from './../../services/moeda.service';
import { PointService } from './../point-service/Service/point.service';
import { DetailsPaService } from './Service/details-pa.service';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ModalPointComponent } from '../modal-point/modal-point.component';
import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ActivatedRoute } from '@angular/router';
import { PontoAtendimento } from 'src/app/util/interfaces/PontoAtendimento';
import { FormsModule } from '@angular/forms';
import { Terminal, UnidadeInstituicao } from 'src/app/util/interfaces/UnidadeInstituicao';

@Component({
  selector: 'app-details-pa',
  standalone: true,
  imports: [IconDirective, NgStyle, NgIf, ModalPointComponent, FormsModule, CommonModule],
  templateUrl: './details-pa.component.html',
  styleUrl: './details-pa.component.scss'
})
export class DetailsPaComponent implements OnInit{

  balanceValue: string = '20.250,99'; // Defina o valor manualmente aqui

  isModalOpen: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 7;
  pagesArray: number[] = [];
  paDetails: PontoAtendimento | undefined;

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

        // Você está acessando os terminais dentro de unidadeInstituicao e atribuindo-os à propriedade terminal
        this.terminal = unidadeInstituicao.terminals;
        console.log(unidadeInstituicao)
        console.log(this.terminal)

        this.tipoTerminal = [];

        // Assim, você pode mapear os terminais para seus tipos de terminal e adicioná-los ao array tipoTerminal
        this.tipoTerminal = this.terminal.map(terminal => terminal.tipoTerminal);
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.descriptionExibidas();
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  descriptionExibidas(): void {
    this.description = new Set(this.tipoTerminal.map(item => item.descricao));
  }

  openModal() {
    this.isModalOpen = true;
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
}
