import { NotificationService } from './../../services/notification.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardBodyComponent, CardComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CmAngularDualListboxModule } from 'cm-angular-dual-listbox';
import { ModalParameterService } from './Service/modal-parameter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-parameter',
  standalone: true,
  imports: [NgIf, CommonModule, CardComponent,CardBodyComponent,ColComponent,RowComponent ,CmAngularDualListboxModule, IconDirective, InputGroupComponent, InputGroupTextDirective, ContainerComponent, FormsModule],
  templateUrl: './modal-parameter.component.html',
  styleUrl: './modal-parameter.component.scss'
})
export class ModalParameterComponent implements OnInit{

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() userData: any = {
    name: '',
    value: ''
  };

  ngOnInit(): void {
    if (!this.userData) {
      this.userData = {
        name: '',
        value: ''
      };
    }
  }


  constructor(
    private ModalParameterService: ModalParameterService,
    private NotificationService: NotificationService,

  )
  { }

  onCloseModal() {
    this.closeModal.emit();
  }

  regisParam() {
    if (!this.isEditMode) {
      this.ModalParameterService.registerParam(this.userData).subscribe({
        next: (response) => {
          console.log('Notificação parâmetro criado com sucesso.')
          this.onCloseModal();
          this.NotificationService.setNotificationMessage('Erro ao Criar Usuário')
          // window.location.reload();
        },
        error: (error) => {
          console.error('Erro ao buscar dados', error);
        }
      });
    }
  }

  editParam() {
    if (this.userData.id) {
      this.ModalParameterService.updateParam(this.userData).subscribe({
        next: (response) => {
          console.log('Notificação parâmetro atualizado com sucesso.')
          this.onCloseModal();
          window.location.reload();
        },
        error: (error) => {
          console.error('Erro ao buscar dados', error);
        }
      });
    }
  }

  validateForm() {
    if (this.isEditMode) {
      if (this.userData.value === "" || this.userData.value === null ) {
        console.log('Notificação Adicionar um novo caminho para o parâmetro')
      } else {
        this.editParam();
      }
    } else {
      this.regisParam();
    }
  }

}
