import { Injectable } from '@angular/core';
import { User, Status } from '../../interfaces/user.interface';

@Injectable()
export class UserProvider {

  constructor() {
    console.log(Status);
  }

  private users: User[] = [
    {
      name: 'Eduardo',
      age: 28,
      active: true,
      status: Status.AppearOffline
    },
    {
      name: 'Freddy',
      age: 19,
      active: true,
      status: Status.Online
    }
  ];

  get() {
    return this.users;
  }

  add(user: User) {
    this.users.push(user);
  }

}
