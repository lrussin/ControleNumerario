import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { CmAngularDualListboxModule, AngularDualListboxComponent } from 'cm-angular-dual-listbox';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, CmAngularDualListboxModule]
})
export class RegisterComponent {

  employeeImage = "assets/employee.png";

  source: any[] = [
    {id:1, name:"Administrador"},
    {id:2, name:"Basico"},
    {id:3, name:"teste"},
    ];

  confirmed: any[] = [];

  format = {
    add: 'Adicionar',
    remove: 'Remover',
    all: 'All',
    none: 'None',
    direction: AngularDualListboxComponent.LTR,
    draggable: true
    };

  constructor() { }

}
