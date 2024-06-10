import { NotificationService } from './../../services/notification.service';
import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconDirective } from '@coreui/icons-angular';
import { UsersListService } from './Service/users-list.service';
import { FormsModule } from '@angular/forms';
import { Item, UserList } from 'src/app/util/interfaces/UserList';
import { CardBodyComponent, CardComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent } from '@coreui/angular';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalRegisterComponent,NgFor,FormsModule, CardComponent,CardBodyComponent,ColComponent,RowComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Output() closeModalDelet = new EventEmitter<void>();

  data: any;

  users: Item[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;

  pagesArray: number[] = [];
  totalPages: number = 0;

  userPermissions: any[] = [];

  filteredData: Item[] = [];
  searchTerm:string = '';

  isModalDelet: boolean = false;

  // userDelet: Item | null = [];

  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentUser: Item = {
    email: '',
    firstName: '',
    lastName:'',
    userId: ''
  }

  constructor(
    private userslistService: UsersListService,
    private NotificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userslistService.GetAllUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response : UserList) => {

        this.filteredData =  response.items;
        this.users = response.items;
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
      this.filteredData = this.users.filter(item =>
        item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
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
    this.currentUser = this.currentUser;
    this.isModalOpen = true;
  }

  openEditModal(user: Item) {
    this.isEditMode = true;
    this.currentUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDeletModal(user: Item) {
    this.isModalDelet = true;
    this.currentUser = user;
  }

  closeDeletModal() {
    this.isModalDelet = false;
  }

  deleteUser() {
    if (this.currentUser) {
      this.userslistService.deleteUser(this.currentUser).subscribe({
        next: (response) => {
          this.closeDeletModal();
          this.NotificationService.setNotificationMessage('Usuário deletado com sucesso')
          window.setTimeout(function() {
            window.location.reload();
          }, 6000);
          this.loadData();
        },
        error: (error) => {
          this.NotificationService.setNotificationMessage('Erro ao deletar usuário')
        }
      })
    }
  }

  onCloseModal() {
    this.closeModalDelet.emit();
    window.location.reload();
  }
}
