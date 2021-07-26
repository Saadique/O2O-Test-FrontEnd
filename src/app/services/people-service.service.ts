import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http: HttpClient) { }

  httpOptions;

  initHttpOptions() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + window.localStorage.getItem('o2o-token')
      })
    };
  }


  getAllPeople() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/people`, this.httpOptions);
  }

  login(data: any) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/login`, data)
  }

  register(data) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/people`, data)
  }
}
