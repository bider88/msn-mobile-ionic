import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { User, Status } from '../../interfaces/user.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: boolean =  true;
  swipeMenu: boolean = true;
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];
  remember: boolean;
  user: User = {
    status: Status.Offline,
    email: null,
    password: null,
    displayName: null
  }

  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private _authProvider :AuthProvider,
    private _storageProvider: StorageProvider
  ) {
    this.initLogin();
  }

  emailLogin() {
    if ( this.user.status && this.user.email && this.user.password ) {
      this._authProvider.emailLogin(this.user, this.remember)
      .then( success => {
        if ( success ) {
          this.navCtrl.setRoot( HomePage );
        }
      });
    }
  }

  emailSignUp() {
    if ( this.user.status && this.user.email && this.user.password && this.user.displayName ) {

      this._authProvider.emailSignUp(this.user, this.remember)
      .then( success => {
        if ( success ) {
          this.navCtrl.setRoot( HomePage );
        }
      });
    }
  }

  signInWithFacebook() {
    this._authProvider.signInWithFacebook(this.user.status, this.remember)
    .then( success => {
      if ( success ) {
        this.navCtrl.setRoot( HomePage );
      }
    });
  }

  resetPassword() {

    this.alertCtrl.create({
      subTitle: 'Ingresa correo electrónico',
      message: "Por favor ingresa el correo electrónico para enviarte el enlace de restablecer contraseña.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo electrónico'
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
        message: 'Ingresa el correo electrónico para enviar el enlace de restablecer contraseña.',
        buttons: ['OK']
      }).present();
    }
  }

  initLogin() {
    this.menuCtrl.swipeEnable(false);
    this.loadStorage();
  }

  loadStorage() {
    this._storageProvider.loadCredentials()
    .then( () => {
      const user = this._storageProvider.storageDev.user;
      if (user) {
        this.user = user;
        this.remember = user.remember;
      }
    });
  }

  isLogin() {
    this.login = !this.login;

    if ( this.login ) {
      this.loadStorage();
    } else {
      this.user = {
        status: Status.Offline,
        email: null,
        password: null,
        displayName: null
      }
    }
  }

}
