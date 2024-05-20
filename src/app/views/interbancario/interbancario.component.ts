import { NgIf, NgStyle } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import {InterbancarioService} from './Service/Interbancario.service';

@Component({
  selector: 'app-interbancario',
  standalone: true,
  imports: [NgIf, NgStyle, IconDirective, FormsModule, AccordionComponent, AccordionButtonDirective, AccordionItemComponent, TemplateIdDirective],
  templateUrl: './interbancario.component.html',
  styleUrl: './interbancario.component.scss'
})
export class InterbancarioComponent {
data:any;

constructor(
  private interbancarioService:InterbancarioService
){ } 

ngOnInit(): void{
console.log('Iniciando component Interbancario');
this.interbancarioService.GetInterbancario().subscribe({
  next:(response) =>{
    this.data = response;
    console.log(this.data);
  },

  error:(error) =>{
    console.error('Erro ao buscar Transações',error);
  }   
});
}
}
