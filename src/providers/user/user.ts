import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class UserProvider {

  user: AngularFirestoreDocument<User>;
  users: AngularFirestoreCollection<User>;

  constructor(
    private afDB: AngularFirestore
  ) { }

  getCurrentUser(uid: string) {

    this.user = this.afDB.doc<User>(`/users/${uid}`);
  }

  loadUsers() {
    this.users = this.afDB.collection<User>('users');
  }

  searchUser(term: string) {
    return this.afDB.collection<User>('users', ref => {
      return ref.where( 'email', '>=', term ).limit(20);
    });
  }

  getUsers() {
    return this.users;
  }

  updateUser(user: Partial<User>): Promise<void>  {
    console.log('update provider:', user);
    return this.user.update( user );
  }

}
