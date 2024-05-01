import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-point-service',
  standalone: true,
  imports: [IconDirective, NgStyle],
  templateUrl: './point-service.component.html',
  styleUrl: './point-service.component.scss'
})
export class PointServiceComponent {

  balanceValue: string = '20.245,00'; // Defina o valor manualmente aqui

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
