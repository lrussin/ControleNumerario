import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { NgIf } from '@angular/common';
import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconDirective } from '@coreui/icons-angular';
import { RegisterComponent } from '../pages/register/register.component';
import {UsersListService} from './Service/users-list.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalRegisterComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
users:any;
  pageNumber = 1;
  pageSize = 100;
  isModalOpen: boolean = false;

  constructor(private userslistService:UsersListService){}

  ngOnInit(): void{
    this.loadData();
  }
  loadData():void{
    console.log("Ta chegando SAporra?")
    this.userslistService.GetAllUsers(this.pageNumber,this.pageSize).subscribe({

      next: (response) =>{
        this.users = response;
        console.log(this.users);
      },
      error: (error) =>{
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  nextPage():void{
    this.pageNumber ++;
    this.loadData();
  }
  prevPage():void{
    if (this.pageNumber > 1){
      this.pageNumber --;
    }
    this.loadData();
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
