export interface User {
  status?: Status;
  active?: boolean;
  uid?: string;
  email?: string;
  password?: string;
  photoURL?: string;
  displayName?: string;
  provider?: string;
}


export enum Status {
  Online = 'Online',
  Offline = 'Offline',
  Busy = 'Busy',
  AppearOffline = 'AppearOffline',
  Away = 'Away'
}
