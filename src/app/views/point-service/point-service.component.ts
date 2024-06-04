import { PointService } from './Service/point.service';
import { Item, PontoAtendimento } from './../../util/interfaces/PontoAtendimento';
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

  PA: Item[] = [];
  pageNumber = 1;
  pageSize = 10;
  searchTerm: string = '';
  filteredData: Item[] = [];

  pagesArray: number[] = [];

  totalPages: number = 0;

  constructor(
    private PointService: PointService,
    private MoedaService: MoedaService,
    private Router : Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.PointService.GetAllPA(this.pageNumber, this.pageSize).subscribe({
      next: (response : PontoAtendimento ) => {
        this.PA = response.items;
        this.filterItems();
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
  }

  navigateToDetails(item: Item) {
    this.PointService.setData([item]);
    this.Router.navigate(['/pointService/details']);
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
