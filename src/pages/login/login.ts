import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
  user: User = {
    status: null,
    email: null,
    password: null,
    displayName: null
  }

  constructor(
    public navCtrl: NavController,
    private _authProvider :AuthProvider
  ) {
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

}
