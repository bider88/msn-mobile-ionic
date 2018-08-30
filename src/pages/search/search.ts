import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User, Status } from '../../interfaces/user.interface';
import { ConversationPage } from '../conversation/conversation';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  users: User[];
  offlineStatus: Status[] = [ Status.Offline, Status.AppearOffline ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    if ( val ) {

      console.log(val);
    }
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

  clearModel() {
    console.log('object');
  }

}
