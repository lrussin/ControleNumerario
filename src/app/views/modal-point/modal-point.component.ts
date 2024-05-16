import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-point',
  standalone: true,
  imports: [NgIf, NgStyle, IconDirective, DashboardComponent, FormsModule],
  templateUrl: './modal-point.component.html',
  styleUrl: './modal-point.component.scss'
})
export class ModalPointComponent {
  balanceValue: string = '20.245,00'; // Defina o valor manualmente aqui

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  get circleColor(): string {
    if (this.balanceValue <= '20.244,99') {
      return 'var(--danger)';
    } else if (this.balanceValue >= '20.245,00' && this.balanceValue <= '27.477,50') {
      return 'var(--warning-alert-1)';
    } else if (this.balanceValue >= '27.477,50') {
      return 'var(--success)';
    }
    else {
      return 'transparent'
    }
  }

  get circleTooltip(): string {
    if (this.balanceValue <= '20.244,99') {
      return 'Limite Inferior';
    } else if (this.balanceValue >= '20.245,00' && this.balanceValue <= '27.477,50') {
      return 'Mediano';
    } else if (this.balanceValue >= '27.477,50') {
      return 'Limite Superior';
    } else {
      return 'Tooltip padrão';
    }
  }

}
