import { NotificationService } from './../../services/notification.service';
import { ModalRegisterService } from './Service/modal-register.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardBodyComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent, CardComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AngularDualListboxComponent, CmAngularDualListboxModule } from 'cm-angular-dual-listbox';
import { UserList } from 'src/app/util/interfaces/UserList';

@Component({
  selector: 'app-modal-register',
  standalone: true,
  imports: [ CardComponent,CardBodyComponent,ColComponent,RowComponent ,CmAngularDualListboxModule, IconDirective, InputGroupComponent, InputGroupTextDirective, NgIf, ContainerComponent, CommonModule, FormsModule],
  templateUrl: './modal-register.component.html',
  styleUrl: './modal-register.component.scss'
})
export class ModalRegisterComponent implements OnInit {

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() userData: UserList  = {
    email: '',
    firstName: '',
    lastName:'',
    userId: ''
  }

  constructor (
    private modalRegisterService: ModalRegisterService,
    private NotificationService: NotificationService,
  ) {}

  confirmed: any[] = [];
  employeeImage = "assets/employee.png";

  source: any[] = [];

  ngOnInit(): void {
    this.permission();
  }

  createUser() {
    if (this.userData.email !== '' && this.userData.firstName !== '' && this.userData.lastName !== '' && this.confirmed.length === 1) {
      this.modalRegisterService.createUser(this.userData.email, this.userData.firstName, this.userData.lastName).subscribe({
        next:() => {
          this.setPermission();
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
          this.NotificationService.setNotificationMessage('Erro ao Criar Usuário')
          this.setPermission();
        }
      });
    }
    else {
      this.NotificationService.setNotificationMessage('Erro ao Criar Usuário')
      console.log('Campos obrigatorios')
    }
  }

  setPermission() {
    if (this.confirmed.length === 1) {
      console.log('teste')

      const email = this.userData.email;
      const permissao = this.confirmed[0].normalizedName;

      this.modalRegisterService.setPermission(email, permissao).subscribe({
        next: (response) => {
          console.log('Notificação usuario criado com sucesso', response)
          this.onCloseModal();
          window.location.reload();
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
        }
      })
    }
  }


  permission(): void {
    this.modalRegisterService.getPermission().subscribe({
      next: (response) => {
        this.source = response
      },
      error:  (error) => {
        console.error('Erro ao buscar dados', error);
      }
    })
  }

  format = {
    add: 'Adicionar',
    remove: 'Remover',
    all: 'All',
    none: 'None',
    direction: AngularDualListboxComponent.LTR,
    draggable: true
  };

    onCloseModal() {
      this.closeModal.emit();
    }

}
