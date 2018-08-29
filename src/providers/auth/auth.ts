import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../../interfaces/user.interface';

import { AlertController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  user: User;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,
    private platform: Platform,
    private storage: Storage,
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

        this.createUserData( credential.user, user );
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

    const loading = this.showLoading('Registrando cuenta...');
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

  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => console.log('send email') )
      .catch(error => this.handleError(error));
  }

  private createUserData(credential: User, user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${credential.uid}`
    );

    const data: User = {
      status: user.status,
      uid: credential.uid,
      email: credential.email,
      displayName: credential.displayName || user.displayName,
      photoURL: credential.photoURL || null
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
    } else {
      localStorage.setItem( 'user', JSON.stringify(this.user ) );
    }
  }

  showAlert(title: string = 'Información', message: string) {
    this.alertCtrl.create({
      title,
      message
    }).present();
  }

  showLoading(content: string = 'Cargando...') {
    return this.loadingCtrl.create({
      content
    })
  }

  private handleError(error: any) {
    console.error(error);

    switch(error.code) {
      case 'auth/email-already-in-use':
        this.showAlert('Correo electrónico registrado', 'El correo electrónico ya se encuentra registrado por otra cuenta');
      break;
      case 'auth/weak-password':
        this.showAlert('Contraseña no válida', 'La contraseña debería tener al menos 6 caracteres');
      break;
      case 'auth/invalid-email':
        this.showAlert('Correo electrónico no válido', 'El correo electrónico no tiene el formato correcto');
      break;
    }
  }

}
