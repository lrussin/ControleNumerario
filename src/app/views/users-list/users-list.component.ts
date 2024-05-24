import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconDirective } from '@coreui/icons-angular';
import { UsersListService } from './Service/users-list.service';
import { FormsModule } from '@angular/forms';
import { UserList } from 'src/app/util/interfaces/UserList';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalRegisterComponent,NgFor,FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: UserList[] = [];
  pageNumber: number = 1;
  pageSize: number = 3;

  page: number[] = [];
  totalPages: number = 2;

  filteredData: UserList[] = [];
  searchTerm:string = '';

  isModalDelet: boolean = false;

  userDelet: number | null = null;

  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentUser: UserList | null = null;

  constructor(private userslistService: UsersListService) {
    this.page = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userslistService.GetAllUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.users = response;
        this.filteredData = response;
        console.log(this.users)
      },
      error:  (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  onSearchInput() {
    this.filterItems();
  }

  performSearch() {
    this.filterItems();
  }

  filterItems(): void {
    if (this.searchTerm) {
      console.log(this.searchTerm);
      this.filteredData = this.users.filter(item =>
        item.descNomeUsuario.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredData)
    } else {
      this.filteredData = [ ... this.users];
    }
  }

  nextPage(): void {
    this.pageNumber++;
    this.loadData();
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

  changePage(page: number) {
    this.loadData();
  }

  openModal() {
    this.isEditMode = false;
    this.currentUser = null;
    this.isModalOpen = true;
  }

  openEditModal(user: UserList) {
    this.isEditMode = true;
    this.currentUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDeletModal(user: number) {
    this.isModalDelet = true;
    this.userDelet = user;
  }

  closeDeletModal() {
    this.isModalDelet = false;
    this.userDelet = null;
  }

  get pagesArray(): number[] {
    return Array(Math.ceil(this.users.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }
}
