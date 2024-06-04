import { Item, PontoAtendimento } from './../../util/interfaces/PontoAtendimento';
import { MoedaService } from './../../services/moeda.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { IconDirective } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconDirective, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  PA: Item[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 7;

  page: number[] = [];

  searchTerm: string = '';
  filteredData: Item[] = [];

  constructor(
    private homeService: HomeService,
    private MoedaService: MoedaService
  ) {
    this.page = Array.from({ length: this.totalPages }, (_, i) => i + 1);
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.homeService.GetAllPA(this.pageNumber, this.pageSize).subscribe({
      next: (response : PontoAtendimento) => {
        this.PA = response.items;
        console.log(response);
        this.filterItems();
      },
      error: (error) => {
        console.error('Erro ao buscar dados', error);
      }
    });
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
