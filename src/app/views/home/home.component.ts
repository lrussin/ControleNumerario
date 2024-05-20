import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.GetAllPA().subscribe(
      response => {
        this.data = response;
        console.log(this.data);
      },
      error => {
        console.error('Erro ao buscar dados', error);
      }
    );
  }
}
