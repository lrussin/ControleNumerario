import { PointService } from './Service/point.service';
import { PontoAtendimento } from './../../util/interfaces/PontoAtendimento';
import { MoedaService } from './../../services/moeda.service';
import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-service',
  standalone: true,
  imports: [IconDirective, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './point-service.component.html',
  styleUrl: './point-service.component.scss'
})
export class PointServiceComponent implements OnInit{

  PA: PontoAtendimento[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 7;

  page: number[] = [];

  searchTerm: string = '';
  filteredData: PontoAtendimento[] = [];

  constructor(
    private PointService: PointService,
    private MoedaService: MoedaService,
    private Router : Router
  ) {
    this.page = Array.from({ length: this.totalPages }, (_, i) => i + 1);
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.PointService.GetAllPA(this.pageNumber, this.pageSize).subscribe({
      next: (response ) => {
        this.PA = response;
        console.log(response);
        this.filterItems();
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  navigateToDetails(idPa : number) {
    this.Router.navigate(['/pointService/details', idPa]);
  }

  formatCurrency(value: number): string {
    return this.MoedaService.formatCurrency(value);
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

  changePage(page: number) {
    this.loadData();
  }

  onSearchInput() {
    this.filterItems();
  }

  performSearch() {
    this.filterItems();
  }

  filterItems() {
    if (this.searchTerm) {
      this.filteredData = this.PA.filter(item =>
        item.nomeUnidade.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = [...this.PA];
    }
  }

}
