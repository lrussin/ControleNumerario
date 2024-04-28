import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './../../icons/icon-subset';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
