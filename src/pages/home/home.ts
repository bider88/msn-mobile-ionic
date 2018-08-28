import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation'
import { LoginPage } from '../login/login';
import { User, Status } from '../../interfaces/user.interface';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: User[] = [];
  query: string;
  yuliana: User = {
    name: 'Yuliana',
    age: 26,
    active: false,
    status: Status.Online
  };
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];

  constructor(
    public navCtrl: NavController,
    private _userProvider: UserProvider
  ) {
    this.users = this._userProvider.get();
    this._userProvider.add(this.yuliana);
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

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    console.log(val);

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }

}
