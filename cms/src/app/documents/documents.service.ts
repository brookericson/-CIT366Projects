import {EventEmitter, Injectable} from '@angular/core';
import { Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DocumentService {
  maxDocumentId: number;
  documents: Document[] = [];

  documentListChangedEvent = new Subject<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(index: string) {
    return this.documents[index];
  }

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documents = this.documents.slice();
    this.documentListChangedEvent.next(this.documents);
  }


  getMaxId(): number {
   let maxId = 0;
    for (const document of this.documents) {
     const currentId = parseInt(document.documentId, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

addDocument(newDocument: Document) {
  if (document === null) {
    return;
  }
  this.maxDocumentId++;
  newDocument.documentId = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  this.documents = this.documents.slice();
  this.documentListChangedEvent.next(this.documents);
}

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if ((originalDocument || newDocument) === null) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0 ) {
      return;
    }

    newDocument.documentId = originalDocument.documentId;
    this.documents[pos] = newDocument;
    this.documents = this.documents.slice();
    this.documentListChangedEvent.next(this.documents);
  }
}
