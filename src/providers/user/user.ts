import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  user: AngularFirestoreDocument<User>;
  users: Observable<Array<User>>;

  constructor(
    private afDB: AngularFirestore
  ) { }

  getCurrentUser(uid: string) {
    this.user = this.afDB.doc<User>(`/users/${uid}`);
  }

  loadUsers() {
    this.users = this.afDB.collection<User>('users').valueChanges();
  }

  getUsers() {
    return this.users;
  }

}
