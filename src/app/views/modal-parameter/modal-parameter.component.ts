import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardBodyComponent, CardComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CmAngularDualListboxModule } from 'cm-angular-dual-listbox';

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

  onCloseModal() {
    this.closeModal.emit();
  }

}
