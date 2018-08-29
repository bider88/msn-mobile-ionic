import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConversationPage } from '../pages/conversation/conversation';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';

// Pipes
import { ImageProfilePipe } from '../pipes/image-profile/image-profile';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { config } from '../config/config';

// Providers
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';

// Plugins
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    ImageProfilePipe,
    MyApp,
    HomePage,
    ConversationPage,
    LoginPage,
    AboutPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConversationPage,
    LoginPage,
    AboutPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    UserProvider,
    AuthProvider
  ]
})
export class AppModule {}
