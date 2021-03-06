import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation'
import { User, Status } from '../../interfaces/user.interface';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { Subscription } from 'rxjs';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  users: User[];
  userDocSubs: Subscription;
  userCollSubs: Subscription;
  query: string;
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];

  constructor(
    public navCtrl: NavController,
    private _authProvider: AuthProvider,
    private _userProvider: UserProvider
  ) {

    this._userProvider.loadUsers();

    this.getCurrentUser(this._authProvider.user);

    this.getUsers();
  }

  getCurrentUser(user: User) {
    this._userProvider.getCurrentUser( user.uid );

    this.userDocSubs = this._userProvider.user.valueChanges().subscribe(
      user=> {
        this.user = user;
        this._authProvider.user = user;
        this._authProvider.saveStorage();
      }
    );
  }

  getUsers() {

    this.userCollSubs = this._userProvider.getUsers().valueChanges().subscribe(
      users => {
        this.users = users
      }
    );
  }

  goToSearch() {
    if ( this.user ) {
      this.navCtrl.push( SearchPage, { user: this.user } );
    }
  }

  ionViewWillLeave(){
    this.userDocSubs.unsubscribe();
    this.userCollSubs.unsubscribe();
  }

  goToConversation(user: User) {
    this.navCtrl.push(ConversationPage, { user })
  }

  getIconByStatus(status: Status) {
    let icon = ''

    switch (status) {
      case Status.Online:
        icon = 'logo_live_online'
        break
      case Status.Offline:
        icon = 'logo_live_offline'
        break
      case Status.Busy:
        icon = 'logo_live_busy'
        break
      case Status.Away:
        icon = 'logo_live_away'
        break
      case Status.AppearOffline:
        icon = 'logo_live_appear_offline'
        break
    }

    return icon
  }

}
