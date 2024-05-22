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
  data: any;
  pageNumber = 1;
  pageSize = 10;
  descriptografado = true;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData():void{
    this.homeService.GetAllPA(this.pageNumber,this.pageSize,this.descriptografado).subscribe({
      next: (response) =>{
          this.data = response;
          console.log(this.data);
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
    if(this.pageNumber > 1){
      this.pageNumber --;
    }
    this.loadData();
  }
}
