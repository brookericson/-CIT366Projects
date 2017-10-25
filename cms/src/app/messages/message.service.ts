import { Injectable, EventEmitter } from '@angular/core';
import { Message} from './messages.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable()
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

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

  constructor() {
    this.messages = MOCKMESSAGES;
  }
}
