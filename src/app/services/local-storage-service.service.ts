import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor(
    private router: Router
  ) { }

  setToken(token: any): void {
    window.localStorage.setItem('o2o-token', token);
  }

  getToken(): any {
    return window.localStorage.getItem('o2o-token');
  }

  //set data
  setData(data: any): void {
    window.localStorage.setItem('user-data', JSON.stringify(data));
  }

  getData(): any {
    return JSON.parse(window.localStorage.getItem('user-data'));
  }

  //authenticate login -- true / false
  authenticateLogin(): boolean {
    if (this.getData() != null && this.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }

  //logout
  clearLogin(): void {
    window.localStorage.clear();
  }

  //get server api url
  // getApiServerUrl(): string {
  //   return API_SERVER_URL;
  // }
}
