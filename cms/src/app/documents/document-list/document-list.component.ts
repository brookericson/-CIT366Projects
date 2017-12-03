import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Document} from '../document.model';
import { DocumentService} from '../documents.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private subscription: Subscription;
  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
