import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User, Status } from '../../interfaces/user.interface';

import { AlertController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {

  user: User;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,
    private platform: Platform,
    private storage: Storage,
    private fb: Facebook,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {

  }

  emailSignUp(user: User) {

    const loading = this.showLoading('Registrando cuenta...');
    loading.present();

    return new Promise( ( resolve, reject ) => {

      this.afAuth.auth
      .createUserWithEmailAndPassword( user.email, user.password )
      .then( credential => {

        this.createUserData( credential.user, user, 'email' );
        loading.dismiss();
        resolve( true );
      })
      .catch(error =>  {
        this.handleError(error);
        loading.dismiss();
        resolve( false );
      });

    });
  }

  emailLogin(user: User) {

    const loading = this.showLoading('Iniciando sesión...');
    loading.present();

    return new Promise( ( resolve, reject ) => {

      this.afAuth.auth
      .signInWithEmailAndPassword( user.email, user.password )
      .then( credential => {

        this.updateUserData( credential.user, user ).then(
          () => {
            loading.dismiss();
            resolve( true );
          }
        );
      })
      .catch(error =>  {
        this.handleError(error);
        loading.dismiss();
        resolve( false );
      });

    });
  }

  signInWithFacebook() {

    return new Promise( ( resolve, reject ) => {

      const user: User = {
        status: Status.Online
      }

      if (this.platform.is('cordova')) {

        this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

          firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then( ( res: any ) => {

            this.createUserData( res.user, user, 'Facebook' );
            resolve( true );

          })
          .catch(error =>  {
            this.handleError(error);
            resolve( false );
          });

        });

      }
      else {

        this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {

          this.createUserData( res.user, user, 'Facebook' );
          resolve( true );

        })
        .catch(error =>  {
          this.handleError(error);
          resolve( false );
        });

      }

    });
  }

  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => console.log('send email') )
      .catch(error => this.handleError(error));
  }

  logout() {
    return new Promise( ( resolve, reject ) => {
      this.user = null;

      this.afAuth.auth.signOut();
      this.saveStorage();
      resolve();
    });
  }

  private createUserData(credential: User, user: User, provider: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${credential.uid}`
    );

    const data: User = {
      status: user.status,
      uid: credential.uid,
      email: credential.email,
      displayName: credential.displayName || user.displayName,
      photoURL: credential.photoURL || null,
      provider
    };

    this.user = data;
    this.saveStorage();

    return userRef.set(data);
  }

  private updateUserData(credential: User, user: User) {
    return new Promise( ( resolve, reject ) => {

      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${credential.uid}`
      );

      userRef.valueChanges().subscribe(
        res =>  {
          res.status = user.status;
          const data: User = res;

          this.user = data;
          this.saveStorage();

          userRef.set(data);

          resolve();
        }
      );

    });
  }

  loadStorage() {

    return new Promise(  ( resolve, reject ) => {

      if ( this.platform.is('cordova') ) {
        this.storage.get('user').then( user => {

          if ( user ) {
            this.user = user;
            resolve( true );
          } else {
            resolve( false );
          }

        });
      } else {
        const user = localStorage.getItem('user');

        if ( user ) {
          this.user = JSON.parse(user);
          resolve( true );
        } else {
          resolve( false );
        }
      }

    });

  }

  saveStorage() {
    if ( this.platform.is( 'cordova' ) ) {
      this.storage.set( 'user', this.user );

      if ( !this.user ) {
        this.storage.remove('user');
      }
    } else {
      localStorage.setItem( 'user', JSON.stringify( this.user ) );

      if ( !this.user ) {
        localStorage.removeItem('user');
      }
    }
  }


  showAlert(title: string = 'Información', message: string) {
    return this.alertCtrl.create({
      title,
      message
    });
  }

  showLoading(content: string = 'Cargando...') {
    return this.loadingCtrl.create({
      content
    })
  }

  private handleError(error: any) {
    console.log( JSON.stringify(error) )

    let alert;

    switch(error.code) {
      case 'auth/email-already-in-use':
        alert = this.showAlert('Correo electrónico registrado', 'El correo electrónico ya se ha registrado anteriormente por otra cuenta.');
      break;
      case 'auth/weak-password':
        alert = this.showAlert('Contraseña no válida', 'La contraseña debería tener al menos 6 caracteres.');
      break;
      case 'auth/invalid-email':
        alert = this.showAlert('Correo electrónico no válido', 'El correo electrónico no tiene el formato correcto.');
      break;
      case 'auth/account-exists-with-different-credential':
        alert = this.showAlert('Correo electrónico registrado', 'El correo electrónico ya se ha registrado anteriormente por otra cuenta.');
      break;
      case 'auth/user-not-found':
        alert = this.showAlert('No se pudo iniciar sesión', 'El correo electrónico y/o la contraseña son incorrectas.');
      break;
      case 'auth/wrong-password':
        alert = this.showAlert('No se pudo iniciar sesión', 'El correo electrónico y/o la contraseña son incorrectas.');
      break;
      case 'auth/user-cancelled':
        alert = this.showAlert('No se pudo iniciar sesión', 'Debes de aceptar los permisos en Facebook para iniciar sesión.');
      break;
    }

    alert.present();
  }

}
