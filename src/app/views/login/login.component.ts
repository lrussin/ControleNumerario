import { LoginService } from './Service/login.service';
import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, CommonModule]
})
export class LoginComponent {

  constructor(
    private LoginService: LoginService,
  ) { }

  username : string = "";
  password : string = "";
  isAlertVisible : boolean = false;
  isReset : boolean = false;
  alertMessage : string = "";

  isForgotPassword : boolean = false;

  changeView() {
    this.isForgotPassword = !this.isForgotPassword;
    this.username = "";
    this.password = "";
    this.alertMessage = "";
  }

  // verifyInput(event : KeyboardEvent) {
  //   if(event.key == 'Enter') this.login();
  // }

}
