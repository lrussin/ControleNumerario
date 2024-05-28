import { NgIf, NgStyle } from '@angular/common';
import { ModalPointComponent } from '../modal-point/modal-point.component';
import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-pa',
  standalone: true,
  imports: [IconDirective, NgStyle, NgIf, ModalPointComponent],
  templateUrl: './details-pa.component.html',
  styleUrl: './details-pa.component.scss'
})
export class DetailsPaComponent implements OnInit{

  balanceValue: string = '20.245,00'; // Defina o valor manualmente aqui

  isModalOpen: boolean = false;
  idPa: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idPa');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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
