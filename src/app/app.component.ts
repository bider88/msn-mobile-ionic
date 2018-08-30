import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private _authProvider: AuthProvider,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Profile', icon: 'contact', component: ProfilePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();

      this._authProvider.loadStorage()
      .then(
        success => {

          if ( success ) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }

          this.statusBar.backgroundColorByHexString('#5caece');
          this.splashScreen.hide();
        }
      );

    });
  }

  logout() {
    this._authProvider.logout().then(
      () => {
        this.menuCtrl.close();
        this.nav.setRoot(LoginPage);
      }
    )
  }

  goToAbout() {
    this.nav.setRoot(AboutPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
