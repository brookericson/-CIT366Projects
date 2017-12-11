import {EventEmitter, Injectable} from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Subject} from 'rxjs/Subject';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';

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

  constructor(private http: Http) {
    this.initDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if ((originalDocument || newDocument) === null) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.documentId = originalDocument.documentId;
    this.documents[pos] = newDocument;
    this.documents = this.documents.slice();
    this.storeDocuments();
  }

  initDocuments() {
    this.http.get('https://brookecms-3bb6d.firebaseio.com/documents.json')
      .map((response: Response) => {
          const documents: Document[] = response.json();
          return documents;
        }
      )
      .subscribe((documentsReturned: Document[]) => {
        this.documents = documentsReturned;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  storeDocuments() {
    const headers = new Headers({'Content-Type': 'application/json'})
    return this.http.put('https://brookecms-3bb6d.firebaseio.com/documents.json',
      this.getDocuments(),
      {headers: headers})
      .subscribe(
        (reponse) => this.documentListChangedEvent.next(this.documents.slice())
      );
  }
}
