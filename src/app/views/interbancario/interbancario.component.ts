import { NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-interbancario',
  standalone: true,
  imports: [NgIf, NgStyle, IconDirective, FormsModule, AccordionComponent, AccordionButtonDirective, AccordionItemComponent, TemplateIdDirective],
  templateUrl: './interbancario.component.html',
  styleUrl: './interbancario.component.scss'
})
export class InterbancarioComponent {


}
