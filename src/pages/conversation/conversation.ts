import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = this.navParams.get('user');
  }

}
