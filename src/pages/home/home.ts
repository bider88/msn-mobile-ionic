import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation'
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  conversationPage = ConversationPage;
  loginPage = LoginPage;

  constructor(public navCtrl: NavController) {

  }

}
