import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + window.localStorage.getItem('o2o-token')
    })
  };


  createMessage(data) {
    return this.http.post<any>(`http://localhost:8000/api/messages`, data, this.httpOptions);
  }

  getMessagesByConversation(conversation_id) {
    return this.http.get<any>(`http://localhost:8000/api/conversations/${conversation_id}/messages`, this.httpOptions);
  }

  deleteMessages(message_id) {
    return this.http.delete<any>(`http://localhost:8000/api/messages/${message_id}`, this.httpOptions);
  }
}