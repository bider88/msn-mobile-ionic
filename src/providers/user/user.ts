import { Injectable } from '@angular/core';
import { User, Status } from '../../interfaces/user.interface';

@Injectable()
export class UserProvider {

  constructor() {
    console.log(Status);
  }

  private users: User[] = [
    {
      name: 'Ana',
      age: 28,
      active: true,
      status: Status.Busy
    },
    {
      name: 'Tomás',
      age: 38,
      active: true,
      status: Status.AppearOffline
    },
    {
      name: 'Tito Camotito',
      age: 23,
      active: true,
      status: Status.Online
    },
    {
      name: 'Raulito **',
      age: 27,
      active: true,
      status: Status.Offline
    }
  ];

  get() {
    return this.users;
  }

  add(user: User) {
    this.users.push(user);
  }

}
