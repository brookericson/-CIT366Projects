import { Injectable, EventEmitter } from '@angular/core';
import { Message} from './messages.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { Subject } from 'rxjs/Subject';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
    }
  }
  return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  constructor(private http: Http) {
    this.initMessages();
  }

  initMessages() {
    this.http.get('https://brookecms-3bb6d.firebaseio.com/messages.json')
      .map((response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe((messagesReturned: Message[]) => {
        this.messages = messagesReturned;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      });
  }

  storeMessages() {
    const headers = new Headers({'Content-Type': 'application/json'})
    return this.http.put('https://brookecms-3bb6d.firebaseio.com/messages.json',
      this.getMessages(),
      {headers: headers})
      .subscribe(
        (reponse) => this.messageChangeEvent.next(this.messages.slice())
      );
  }

}
