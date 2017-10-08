import { Component, OnInit } from '@angular/core';
import { Message} from '../messages.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1001', 'Hello', 'How are you doing?', 'Bro. Barzee'),
    new Message('1002', 'Hi', 'I am well. And you?', 'Bro. Jackson'),
    new Message('1003', 'Reply', 'Fine, thanks.', 'Bro. Barzee'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
