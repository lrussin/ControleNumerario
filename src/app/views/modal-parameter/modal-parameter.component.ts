import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardBodyComponent, CardComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CmAngularDualListboxModule } from 'cm-angular-dual-listbox';
import { ModalParameterService } from './Service/modal-parameter.service';

@Component({
  selector: 'app-modal-parameter',
  standalone: true,
  imports: [NgIf, CommonModule, CardComponent,CardBodyComponent,ColComponent,RowComponent ,CmAngularDualListboxModule, IconDirective, InputGroupComponent, InputGroupTextDirective, ContainerComponent],
  templateUrl: './modal-parameter.component.html',
  styleUrl: './modal-parameter.component.scss'
})
export class ModalParameterComponent {

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() userData: any | null = null;


  constructor( private ModalParameterService: ModalParameterService )
  { }

  onCloseModal() {
    this.closeModal.emit();
  }

  editParam() {
    console.log(this.userData.value)
    if (this.userData.id) {
      this.ModalParameterService.updateParam(this.userData).subscribe({
        next: (response) => {
          console.log('teste', response)
        },
        error: (error) => {
          console.error('Erro ao buscar dados', error);
        }
      });
    }
  }

  updateUserDataValue(value: string) {
    if (this.userData) {
      this.userData.value = value;
    }
  }

  validateForm() {
    if (this.userData.value === "" || this.userData.value === null ) {
      console.log('teste')
    } else {
      this.editParam();
    }
  }

}
