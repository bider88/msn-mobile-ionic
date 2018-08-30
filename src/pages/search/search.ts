import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User, Status } from '../../interfaces/user.interface';
import { ConversationPage } from '../conversation/conversation';
import { UserProvider } from '../../providers/user/user';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  users: User[];
  user: User;
  anyResults: boolean = false;
  term: string = '';
  searchSubs: Subscription;
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _userProvider: UserProvider
  ) {
    this.user = this.navParams.get('user');
  }

  searchUser(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    if ( val ) {

      this.searchSubs = this._userProvider.searchUser( val ).valueChanges()
      .pipe(
        map( users => users.filter( val => val.uid !== this.user.uid) )
      )
      .subscribe(
        users => {
          this.users = users;

          if (this.users.length === 0) {
            this.anyResults = true;
            this.term = val;
          } else {
            this.term = '';
          }
        }
      )
    }
  }

  noResults() {
    return this.term.length > 0;
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

  ionViewWillLeave(){
    try {
      this.searchSubs.unsubscribe();
    } catch {

    }
  }

  clearModel() {
    this.users = [];
  }

}
