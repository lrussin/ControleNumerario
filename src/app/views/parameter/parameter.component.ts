<<<<<<< HEAD
import { IconDirective } from '@coreui/icons-angular';
import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParameterService } from './Service/parameter.service';
import { ParameterList } from 'src/app/util/interfaces/ParameterList';

=======
import { CommonModule, NgFor } from '@angular/common';
import { ModalParameterComponent } from './../modal-parameter/modal-parameter.component';
import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
>>>>>>> af920132af4b25e022978e920d954670eae8f51f

@Component({
  selector: 'app-parameter',
  standalone: true,
<<<<<<< HEAD
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalRegisterComponent,NgFor,FormsModule],
=======
  imports: [IconDirective, ModalParameterComponent, NgFor, CommonModule],
>>>>>>> af920132af4b25e022978e920d954670eae8f51f
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit{

<<<<<<< HEAD
param:ParameterList[] = [];
pageNumber = 1;
pageSize = 10;


constructor(private parameterService:ParameterService){}

ngOnInit(): void {
  this.loadData();
}

loadData():void{
  this.parameterService.GetAllParams(this.pageNumber,this.pageSize).subscribe({

    next: (response) =>{
      this.param = response;
      console.log(this.param);
    },
    error:  (error) => {
      console.error('Erro ao buscar dados', error);
    }
  })
}
=======
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
>>>>>>> af920132af4b25e022978e920d954670eae8f51f
}
