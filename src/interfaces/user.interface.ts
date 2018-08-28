
export interface User {
  name: string;
  age: number;
  active: boolean;
  status: Status;
}

export enum Status {
  Online = 'Online',
  Offline = 'Offline',
  Busy = 'Busy',
  AppearOffline = 'AppearOffline',
  Away = 'Away'
}
