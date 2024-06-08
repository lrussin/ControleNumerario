import { OpCaixa, TipoOperacao } from './../../util/interfaces/opCaixa';
import { ModalPointService } from './Services/modal-point.service';
import { MoedaService } from './../../services/moeda.service';
import { NgIf, NgStyle, formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { Terminal } from 'src/app/util/interfaces/UnidadeInstituicao';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables);
Chart.register(annotationPlugin);


@Component({
  selector: 'app-modal-point',
  standalone: true,
  imports: [NgIf, NgStyle, IconDirective, DashboardComponent, FormsModule],
  templateUrl: './modal-point.component.html',
  styleUrls: ['./modal-point.component.scss']
})
export class ModalPointComponent implements OnInit,  AfterViewInit {
  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() idUnidade: number = 0;
  @Input() terminalByPA: Terminal = {
    codigo: 0,
    saldo: 0,
    usuario: '',
    tipoTerminal: {
      pa: 0,
      codigo: 0,
      descricao: '',
      limSuperior: 0,
      limInferior: 0,
      mediana: 0
    }
  };

  opCaixa: OpCaixa = {
    data: '',
    valor: 0,
    numTerminal: 0,
    pontoAtendimento: 0,
    terminal: []
  }

  dataInicial: string = '';
  dataFinal: string = '';

  pageNumber: number = 1;
  pageSize: number = 10;

  datasOp: string[] = [];
  valoresOp: number[] = [];
  graficoVisual: boolean = false;

  chart: any = null;


  constructor(
    private MoedaService: MoedaService,
    private modalPointService: ModalPointService,
  ) {
   }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.terminalsBy();
    // if (this.graficoVisual) {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
    // }
  }


  terminalsBy() {
    this.terminalByPA;
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  renderChart() {

    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart instance
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.datasOp,
        datasets: [{
          label: 'Saldo Ocaosidade',
          data: this.valoresOp,
          backgroundColor: 'rgb(34, 193, 10)',
          borderColor: '#0000FF',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'rgb(34, 193, 10)',
              font: {
                size: 18 // Tamanho da fonte para os rótulos do eixo x
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'rgb(34, 193, 10)',
              font: {
                size: 18 // Tamanho da fonte para os rótulos do eixo y
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgb(34, 193, 10)',
              font: {
                size: 18 // Tamanho da fonte para os rótulos da legenda
              }
            }
          }
        }
      }
    });
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

  formatCurrency(value: number): string {
    return this.MoedaService.formatCurrency(value);
  }

  grafic() {
    this.graficoVisual = true;

    const numTerminal = this.terminalByPA.codigo;
    const pa = this.idUnidade;
    const dataIni= formatDate(this.dataInicial, 'dd/MM/yyyy', 'en-US');
    const dataFi = formatDate(this.dataFinal, 'dd/MM/yyyy', 'en-US');

    this.modalPointService.opCaixa(numTerminal, pa, dataIni, dataFi).subscribe({
      next: (response) => {
        this.datasOp = [];
        this.valoresOp = [];

        response.terminal.forEach((terminal: any) => {

          // Verifica se o array opCaixa existe e possui pelo menos um elemento
          if (terminal.opCaixa && terminal.opCaixa.length > 0) {

            terminal.opCaixa.forEach((op: any) => {

              console.log(terminal.opCaixa)

              this.datasOp.push(formatDate(op.data, 'dd/MM/yyyy', 'en-US'));
              this.valoresOp.push(Number(op.valor));


            });
          }
        })
        this.renderChart();
      },
      error: (error) => {
        console.error('Erro ao buscar operação de caixa', error);
      },
    })
  }


  callFunction(): boolean {
    if (this.graficoVisual) {
      this.ngAfterViewInit();
    }
    return true;
  }
}
