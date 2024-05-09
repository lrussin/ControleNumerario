import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-point',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-point.component.html',
  styleUrl: './modal-point.component.scss'
})
export class ModalPointComponent {

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}
