import { NotificationService } from 'src/app/services/notification.service';
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
    public NotificationService: NotificationService
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
          this.token = AuthTokenJson.Data.Token;
          if (temporaryPassword){
            this.isChangePassword = true;
            this.authLogin.password = '';
            this.NotificationService.setNotificationMessage('Criar uma Nova Senha')
          }
          else {
            this.NotificationService.setNotificationMessage('Login Feito com Sucesso')
            this.Router.navigateByUrl('/pointService');
          }
        },
        error: (error) => {
          this.NotificationService.setNotificationMessage('Erro ao logar usuário')
        }
      });
    }
    else {
      this.NotificationService.setNotificationMessage('Campos Obrigatório')
    }
  }

  firstAcess() {
    if (this.token != '' && this.authLogin.password != '' && this.newPassword != '') {
      this.LoginService.changePassword(this.token, this.authLogin.password, this.newPassword).subscribe({
        next: (response) => {
          this.NotificationService.setNotificationMessage('Nova senha inserido com sucesso')
          this.NotificationService.setNotificationMessage('Faça o login novamente, com a nova senha')
          window.setTimeout(function() {
            window.location.reload();
          }, 5000);
        },
        error: (error) => {
          this.NotificationService.setNotificationMessage('Erro ao inserir uma nova senha')
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

  resetarSenha(){
    if (this.authLogin.email) {
      this.LoginService.resetSenha(this.authLogin.email).subscribe({
        next: (response) => {
          this.NotificationService.setNotificationMessage('Senha enviada no email solicitado')
          this.NotificationService.setNotificationMessage('Faça o login novamente, com a nova senha')
          window.setTimeout(function() {
            window.location.reload();
          }, 5000);
      },
      error: (error) => {
        this.NotificationService.setNotificationMessage('Erro ao inserir uma nova senha')
      }
      })
    }

  }

  verifyInput(event : KeyboardEvent) {
    if(event.key == 'Enter') this.loginCreate();
  }

}
