import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<Array<User>>;

  constructor(
    private afDB: AngularFirestore
  ) {
    this.loadUsers();
  }

  loadUsers() {
    this.usersCollection = this.afDB.collection<User>('users')
    this.users = this.usersCollection.valueChanges();
    return this.usersCollection;
  }

  getUsers() {
    return this.users;
  }

  // private users: User[] = [
  //   {
  //     name: 'Ana',
  //     age: 28,
  //     active: true,
  //     status: Status.Busy
  //   },
  //   {
  //     name: 'Tomás',
  //     age: 38,
  //     active: true,
  //     status: Status.AppearOffline
  //   },
  //   {
  //     name: 'Tito Camotito',
  //     age: 23,
  //     active: true,
  //     status: Status.Away
  //   },
  //   {
  //     name: 'Raulito **',
  //     age: 27,
  //     active: true,
  //     status: Status.Offline
  //   }
  // ];

  // get() {
  //   return this.users;
  // }

  // add(user: User) {
  //   this.users.push(user);
  // }

}
