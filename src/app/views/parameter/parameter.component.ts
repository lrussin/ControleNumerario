import { ModalParameterComponent } from './../modal-parameter/modal-parameter.component';
import { IconDirective } from '@coreui/icons-angular';
import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParameterService } from './Service/parameter.service';
import { Item, ParameterList } from 'src/app/util/interfaces/ParameterList';


@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalParameterComponent, NgFor, FormsModule, CommonModule],
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})

export class ParameterComponent implements OnInit {

  param: Item[] = [];
  pageNumber = 1;
  pageSize = 10;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentUser: any;

  pagesArray: number[] = [];

  totalPages: number = 0;

  constructor(private parameterService: ParameterService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.parameterService.GetAllParams(this.pageNumber, this.pageSize).subscribe({
      next: (response : ParameterList) => {
        this.param = response.items.map(item => {
          return {
            ...item,
            value: this.lineBreak(item.value, 80)  // Trunca o texto para 30 caracteres
          };
        });

        this.param = response.items;
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        console.log(this.param);
        console.log(this.totalPages);
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  lineBreak(value: string, limit: number): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }

  openModal(): void {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.currentUser = null;
  }

  openEditModal(user: Item): void {
    this.isModalOpen = true;
    this.isEditMode = true;
    console.log(user)
    this.currentUser = user;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadData();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
    this.loadData();
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.loadData();
  }


}
