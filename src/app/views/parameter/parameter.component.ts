import { CommonModule, NgFor } from '@angular/common';
import { ModalParameterComponent } from './../modal-parameter/modal-parameter.component';
import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [IconDirective, ModalParameterComponent, NgFor, CommonModule],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.scss'
})
export class ParameterComponent {

  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentUser: any | null = null;

  openModal() {
    this.isEditMode = false;
    this.currentUser = null;
    this.isModalOpen = true;
  }

  openEditModal(user: any) {
    this.isEditMode = true;
    this.currentUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
