import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconDirective } from '@coreui/icons-angular';
import { UsersListService } from './Service/users-list.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalRegisterComponent,NgFor,FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any;
  pageNumber = 1;
  pageSize = 10;
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  filteredUsers:string = '';
  searchTerm:string = '';

  constructor(private userslistService: UsersListService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userslistService.GetAllUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = response; // Initialize filteredUsers
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }
  searchUsers(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter((user: any) =>
        user.descNomeUsuario.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
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

  setPage(page: number): void {
    this.pageNumber = page;
    this.loadData();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  get pagesArray(): number[] {
    return Array(Math.ceil(this.users.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }
}
