import { IconDirective } from '@coreui/icons-angular';
import { ModalRegisterComponent } from './../modal-register/modal-register.component';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParameterService } from './Service/parameter.service';
import { ParameterList } from 'src/app/util/interfaces/ParameterList';


@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [IconDirective, MatButtonModule, MatIconModule, NgIf, ModalRegisterComponent,NgFor,FormsModule],
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit{

param:ParameterList[] = [];
pageNumber = 1;
pageSize = 10;


constructor(private parameterService:ParameterService){}

ngOnInit(): void {
  this.loadData();
}

loadData():void{
  this.parameterService.GetAllParams(this.pageNumber,this.pageSize).subscribe({

    next: (response) =>{
      this.param = response;
      console.log(this.param);
    },
    error:  (error) => {
      console.error('Erro ao buscar dados', error);
    }
  })
}
}
