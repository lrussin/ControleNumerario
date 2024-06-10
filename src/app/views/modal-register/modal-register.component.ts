import { NotificationService } from './../../services/notification.service';
import { ModalRegisterService } from './Service/modal-register.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardBodyComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent, CardComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AngularDualListboxComponent, CmAngularDualListboxModule } from 'cm-angular-dual-listbox';
import { Item } from 'src/app/util/interfaces/UserList';

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
  @Input() userData: Item = {
    email: '',
    firstName: '',
    lastName:'',
    userId: ''
  };

  teste: string = 'teste notificação'

  constructor (
    private modalRegisterService: ModalRegisterService,
    private NotificationService: NotificationService,
  ) {}

  confirmed: any[] = [];
  employeeImage = "assets/employee.png";

  source: any[] = [];

  ngOnInit(): void {
    this.permission();
    if (this.isEditMode && this.userData.email) {
      this.loadUserPermissions(this.userData.email);
    }
  }

  createUser() {
    if (this.userData.email !== '' && this.userData.firstName !== '' && this.userData.lastName !== '' && this.confirmed.length >= 1) {
      this.modalRegisterService.createUser(this.userData.email, this.userData.firstName, this.userData.lastName).subscribe({
        next:() => {
          this.setPermission();
          window.setTimeout(function() {
            window.location.reload();
          }, 6000);
        },
        error: (error) => {
          this.NotificationService.setNotificationMessage('Erro ao Criar Usuário')
        }
      });
    }
    else {
      this.NotificationService.setNotificationMessage('Campos obrigatorios')
    }
  }

  setPermission() {
    if (this.confirmed.length >= 1) {

      const email = this.userData.email;
      const permissao = this.confirmed[0].normalizedName;

      this.modalRegisterService.setPermission(email, permissao).subscribe({
        next: (response) => {
          this.isModalOpen = false
          this.NotificationService.setNotificationMessage('Usuário criado com sucesso')
          window.setTimeout(function() {
            window.location.reload();
          }, 6000);
        },
        error: (error) => {
          this.NotificationService.setNotificationMessage('Erro ao inserir permissão do usuário')
        }
      })
    }
  }


  permission(): void {
    this.modalRegisterService.getPermission().subscribe({
      next: (response) => {
        this.source = response
        if (this.isEditMode && this.userData.email) {
          this.loadUserPermissions(this.userData.email);
        }

      },
      error:  (error) => {
        this.NotificationService.setNotificationMessage('Erro ao buscar as permissões')
      }
    })
  }

   loadUserPermissions(email: string): void {
    this.modalRegisterService.loadPermission(email).subscribe({
      next: (permissions) => {
        this.confirmed = permissions;
      },
      error: (error) => {
        this.NotificationService.setNotificationMessage('Erro ao buscar permissões do usuário')
      }
    });
  }

  editPermission(){
    this.setPermission();
  }

  reenviarQrCode(email: string): void {
    this.modalRegisterService.reenviarQrCode(email).subscribe({
      next: (qrCode) => {
        this.isModalOpen = false
          this.NotificationService.setNotificationMessage('QrCode enviado com sucesso para usuário')
          window.setTimeout(function() {
            window.location.reload();
          }, 6000);
      },
      error: (error) => {
        this.NotificationService.setNotificationMessage('Erro ao reenviar qrCode ao usuário')
      }
    });
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
