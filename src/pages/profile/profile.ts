import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User, Status } from '../../interfaces/user.interface';
import { UserProvider } from '../../providers/user/user';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userAuth: any;
  user: User;
  userDocSubs: Subscription;
  userCurrentDocSubs: Subscription;
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];

  constructor(
    public navCtrl: NavController,
    private _authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private _userProvider: UserProvider
  ) {
    this.getCurrentUserAuth();
  }

  getCurrentUserAuth() {
    this.userCurrentDocSubs = this._authProvider.getStatus().subscribe(
      ( user: any ) => this.getCurrentUser(user.uid)
    );
  }

  getCurrentUser(uid: string) {
    this._userProvider.getCurrentUser( uid );

    this.userDocSubs = this._userProvider.user.valueChanges().subscribe(
      user=> {
        this.user = user;
        this._authProvider.user = user;
        this._authProvider.saveStorage();
      }
    );
  }

  ionViewWillLeave(){
    this.userDocSubs.unsubscribe();
    this.userCurrentDocSubs.unsubscribe();
  }

  updateUser() {
    this._userProvider.updateUser(this.user)
    .then( () => this.toastCtrl.create({ message: 'Se guardaron los cambios', duration: 2000 }).present() )
    .catch( err => console.log(err) );
  }

}
