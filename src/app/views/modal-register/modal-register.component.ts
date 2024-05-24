import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardBodyComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent, CardComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AngularDualListboxComponent, CmAngularDualListboxModule } from 'cm-angular-dual-listbox';
import { UserList } from 'src/app/util/interfaces/UserList';

@Component({
  selector: 'app-modal-register',
  standalone: true,
  imports: [ CardComponent,CardBodyComponent,ColComponent,RowComponent ,CmAngularDualListboxModule, IconDirective, InputGroupComponent, InputGroupTextDirective, NgIf, ContainerComponent],
  templateUrl: './modal-register.component.html',
  styleUrl: './modal-register.component.scss'
})
export class ModalRegisterComponent implements OnInit {

  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() userData: UserList | null = null;

  confirmed: any[] = [];
  employeeImage = "assets/employee.png";

  ngOnInit(): void {
  }

  source: any[] = [
    {id:1, name:"Administrador"},
    {id:2, name:"Basico"},
    {id:3, name:"teste"},
    ];

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
