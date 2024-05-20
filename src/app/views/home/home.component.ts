import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { IconDirective } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    console.log('Iniciando conponenmt')
    this.homeService.GetAllPA().subscribe({
      next: (response) =>{
          this.data = response;
          console.log(this.data);
        
      },
      error: (error) =>{
        console.error('Erro ao buscar dados', error);
      }
    });
  }
}
