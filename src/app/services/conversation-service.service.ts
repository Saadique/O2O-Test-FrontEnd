import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationServiceService {

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


  createConversation(data) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/conversations`, data, this.httpOptions);
  }

  addPerson(conversation_id, person_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/conversations/person/${conversation_id}/${person_id}`, this.httpOptions);
  }

  removePerson(conversation_id, person_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/conversations/person/remove/${conversation_id}/${person_id}`, this.httpOptions);
  }

  getMembersOfConversation(conversation_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/conversations/members/${conversation_id}`, this.httpOptions);
  }

  deleteConversation(conversation_id) {
    this.initHttpOptions();
    return this.http.delete<any>(`http://localhost:8000/api/conversations/${conversation_id}`, this.httpOptions);
  }

  getConversationByPerson(person_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/conversations/person/${person_id}`, this.httpOptions);
  }

  getConversationByOwner(owner_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/conversations/owner/${owner_id}`, this.httpOptions);
  }
}
