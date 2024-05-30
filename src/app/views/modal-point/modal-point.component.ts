import { MoedaService } from './../../services/moeda.service';
import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { Terminal } from 'src/app/util/interfaces/UnidadeInstituicao';

@Component({
  selector: 'app-modal-point',
  standalone: true,
  imports: [NgIf, NgStyle, IconDirective, DashboardComponent, FormsModule],
  templateUrl: './modal-point.component.html',
  styleUrl: './modal-point.component.scss'
})
export class ModalPointComponent implements OnInit{
  balanceValue: string = '20.245,00'; // Defina o valor manualmente aqui

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
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

  constructor(
    private MoedaService : MoedaService,
  ) {}

  ngOnInit(): void {
    this.terminalsBy();
  }

  terminalsBy() {
    this.terminalByPA;
  }

  onCloseModal() {
    this.closeModal.emit();
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

}
