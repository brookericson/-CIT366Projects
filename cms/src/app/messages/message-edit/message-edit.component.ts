import {Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message} from '../messages.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  currentSender = 'Brooke';
  constructor(private messageService: MessageService ) { }

  ngOnInit() {
  }

  onSendMessage() {
    const ingSubject = this.subjectRef.nativeElement.value;
    const ingMsgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('11', ingSubject, ingMsgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
  this.subjectRef.nativeElement.value = '';
  this.msgTextRef.nativeElement.value = '';
  }
}
