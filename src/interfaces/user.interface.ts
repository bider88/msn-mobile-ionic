
export interface User {
  name: string;
  age: number;
  active: boolean;
  status: Status;
  nickname?: string;
  password?: string;
  uid?: string;
}

export enum Status {
  Online = 'Online',
  Offline = 'Offline',
  Busy = 'Busy',
  AppearOffline = 'AppearOffline',
  Away = 'Away'
}
