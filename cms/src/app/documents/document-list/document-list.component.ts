import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document} from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  @Input() documents: Document[] = [
    new Document(
      '1001',
      'CIT 366 Review of Basic JavaScript',
      'Directions for Assignment 1',
      'https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson%201%20Assignment.pdf',
      null
    ),
    new Document(
      '1002',
      'CIT 366 Creating an Angular Project and Components',
      'Directions for Assignment 2',
      'https://content.byui.edu/' +
      'file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/' +
      'Lesson%202%20-%20Create%20CMS%20project%20and%20Contact%20components.pdf',
      null
    ),
    new Document(
      '1003',
      'CIT 366 Components and Data Binding',
      'Directions for Assignment 3',
      'https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson%203%20Components%20and%20Databinding.pdf',
      null
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
