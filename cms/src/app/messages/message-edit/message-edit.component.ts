import {Component, OnInit, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';
import { Message} from '../messages.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Brooke';
  constructor() { }

  ngOnInit() {
  }

  onSendMessage(){
    const ingSubject = this.subjectRef.nativeElement.value;
    const ingMsgText = this.subjectRef.nativeElement.value;
    const newMessage = new Message('1000', ingSubject, ingMsgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
  this.subjectRef.nativeElement.value = '';
  this.msgTextRef.nativeElement.value = '';
  }
}
