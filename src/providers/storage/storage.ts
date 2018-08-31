import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  storageDev: any = {
    user: null,
  }

  constructor(
    private platform: Platform,
    private storage: Storage,
  ) {
  }

  loadCredentials() {
    return new Promise(  ( resolve, reject ) => {

      if ( this.platform.is('cordova') ) {
        this.storage.get('credentials').then( credentials => {

          if ( credentials ) {
            this.storageDev.user= credentials;
            resolve( true );
          } else {
            resolve( false );
          }

        });
      } else {
        const credentials = localStorage.getItem('credentials');

        if ( credentials ) {
          this.storageDev.user= JSON.parse(credentials);
          resolve( true );
        } else {
          resolve( false );
        }
      }

    });
  }

  saveCredentials(user: any) {
    if ( this.platform.is( 'cordova' ) ) {
      this.storage.set( 'credentials', user );

      if ( !user ) {
        this.storage.remove('credentials');
      }
    } else {
      localStorage.setItem( 'credentials', JSON.stringify( user) );

      if ( !user) {
        localStorage.removeItem('credentials');
      }
    }
  }

}
