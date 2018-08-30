import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  emailVerified: boolean = false;
  userAuth: any;

  constructor(
    public navCtrl: NavController,
    private _authProvider: AuthProvider
  ) {
    this.getCurrentUserAuth();
  }

  sendEmail() {
    this._authProvider.sendEmailVerification();
  }

  getCurrentUserAuth() {
    this.userAuth = this._authProvider.getCurrentUserAuth();
  }

}
