import { Router } from '@angular/router';
import { CryptoService } from './../../services/crypto.service';
import { LoginService } from './Service/login.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Login } from 'src/app/util/interfaces/Login';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, CommonModule]
})
export class LoginComponent implements OnInit{

  authLogin: Login = {
    email: '',
    password: '',
    authCode: ''
  };

  newPassword: string = '';

  constructor(
    private LoginService: LoginService,
    private CryptoService: CryptoService,
    private Router: Router,
  ) { }

  isAlertVisible : boolean = false;
  isReset : boolean = false;
  alertMessage : string = "";

  isForgotPassword: boolean = false;
  isChangePassword: boolean = false;

  token: string = '';

  ngOnInit(): void {
    this.LoginService.removeSessionToken();
  }



  loginCreate() {
    if (this.authLogin.email && this.authLogin.password && this.authLogin.authCode) {
      this.LoginService.postLogin(this.authLogin.email, this.authLogin.password, this.authLogin.authCode).subscribe({
        next: (AuthTokenJson: any) => {
          this.LoginService.setSessionToken(AuthTokenJson.Data.Token);
          const temporaryPassword = AuthTokenJson.Data.TemporaryPassword;
          console.log(this.CryptoService.decrypt(AuthTokenJson.Data.Token))
          this.token = AuthTokenJson.Data.Token;
          if (temporaryPassword){
            this.isChangePassword = true;
            this.authLogin.password = '';
            console.log('notificação Criar uma nova senha')
          }
          else {
            console.log('notificação Login Feito com Sucesso')
            this.Router.navigateByUrl('/pointService');
          }
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
        }
      });
    }
    else {
      console.log('notificação Campos Obrigatorios')
    }
  }

  firstAcess() {
    if (this.token != '' && this.authLogin.password != '' && this.newPassword != '') {
      this.LoginService.changePassword(this.token, this.authLogin.password, this.newPassword).subscribe({
        next: (response) => {
            console.log('Notificação', response)
            location.reload();
        },
        error: (error) => {
          console.error('Erro ao inserir uma nova senha', error);
        }
      })

    }
  }

  changeView() {
    this.isForgotPassword = !this.isForgotPassword;
    this.authLogin = {
      email: '',
      password: '',
      authCode: ''
    };
    this.alertMessage = "";
  }

  verifyInput(event : KeyboardEvent) {
    if(event.key == 'Enter') this.loginCreate();
  }

}
