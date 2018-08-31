import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: boolean =  true;
  swipeMenu: boolean = true;
  user: User = {
    status: null,
    email: null,
    password: null,
    displayName: null
  }

  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private _authProvider :AuthProvider
  ) {
    this.disabledMenu();
  }

  emailLogin() {
    if ( this.user.status && this.user.email && this.user.password ) {
      this._authProvider.emailLogin(this.user)
      .then( success => {
        if ( success ) {
          this.navCtrl.setRoot( HomePage );
        }
      });
    }
  }

  emailSignUp() {
    if ( this.user.status && this.user.email && this.user.password && this.user.displayName ) {

      this._authProvider.emailSignUp(this.user)
      .then( success => {
        if ( success ) {
          this.navCtrl.setRoot( HomePage );
        }
      });
    }
  }

  signInWithFacebook() {
    this._authProvider.signInWithFacebook(this.user.status)
    .then( success => {
      if ( success ) {
        this.navCtrl.setRoot( HomePage );
      }
    });
  }

  disabledMenu() {
    this.menuCtrl.swipeEnable(false)
  }

  resetPassword() {

    this.alertCtrl.create({
      subTitle: 'Ingresa correo electrónico',
      message: "Por favor ingresa el correo electrónico para enviarte el enlace de restablecer tu contraseña.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo eletrónico'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Enviar',
          handler: data => {
            this.sendResetPassword(data.email);
          }
        }
      ]
    }).present();
  }

  sendResetPassword(email: string) {

    if ( email ) {

      this._authProvider.resetPassword( email );

    } else {
      this.alertCtrl.create({
        subTitle: 'Falta correo electrónico',
        message: 'Ingresa el correo electrónico para enviar el enlace de restablecer la contraseña.',
        buttons: ['OK']
      }).present();
    }
  }

}
