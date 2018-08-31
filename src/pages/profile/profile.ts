import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User, Status } from '../../interfaces/user.interface';
import { UserProvider } from '../../providers/user/user';
import { Subscription } from 'rxjs';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userAuth: any;
  user: User;
  userDocSubs: Subscription;
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];

  constructor(
    public navCtrl: NavController,
    private _authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private _userProvider: UserProvider,
    private _storageProvider: StorageProvider
  ) {
    this._storageProvider.loadCredentials();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userDocSubs = this._userProvider.user.valueChanges().subscribe(
      user=> {
        this.user = user;
        console.log('getCurrentUser:', this.user);
      }
    );
  }

  ionViewWillLeave() {
    this.userDocSubs.unsubscribe();
  }

  updateUser() {

    this._userProvider.updateUser(this.user)
    .then( () => {

      console.log('update:', this.user);

      this.toastCtrl.create({ message: 'Se guardaron los cambios', duration: 2000 }).present();

      this._authProvider.user = this.user;
      this._authProvider.saveStorage();

      const user = this._storageProvider.storageDev.user;

      if ( user ) {

        const email = user.email;

        if ( email ) {
          const credentials = {
            email: this.user.email,
            status: this.user.status,
            photoURL: this.user.photoURL,
            remember: user.remember
          };

          this._storageProvider.saveCredentials(credentials);
        } else {

          const credentials = {
            email: null,
            status: this.user.status,
            photoURL: this.user.photoURL,
            remember: user.remember
          };

          this._storageProvider.saveCredentials(credentials);
        }

      }

    })
    .catch( err => console.log(err) );
  }

}
