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
      if (this.userData.value !== "" || this.userData.name !== "") {
        this.ModalParameterService.registerParam(this.userData).subscribe({
          next: (response) => {
            this.onCloseModal();
            this.NotificationService.setNotificationMessage('Parâmetro Criado com Sucesso')
            window.setTimeout(function() {
              window.location.reload();
            }, 6000);
          },
          error: (error) => {
            this.onCloseModal();
            this.NotificationService.setNotificationMessage('Erro ao Criar Parâmetro')
          }
        });
      }
      else {
        this.NotificationService.setNotificationMessage('Campos Obrigatório')
      }
    }
  }

  editParam() {
    if (this.userData.id) {
      this.ModalParameterService.updateParam(this.userData).subscribe({
        next: (response) => {
          this.onCloseModal();
          this.NotificationService.setNotificationMessage('Parâmetro Atualizado com Sucesso')
          window.setTimeout(function() {
            window.location.reload();
          }, 6000);
        },
        error: (error) => {
          this.onCloseModal();
          this.NotificationService.setNotificationMessage('Erro ao Atualizar Parâmetro')
        }
      });
    }
  }

  validateForm() {
    if (this.isEditMode) {
      if (this.userData.value === "" || this.userData.value === null ) {
        this.NotificationService.setNotificationMessage('Campos Obrigatório')
      } else {
        this.editParam();
      }
    } else {
      this.regisParam();
    }
  }

}
