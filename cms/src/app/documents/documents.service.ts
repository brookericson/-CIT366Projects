import { EventEmitter, Injectable } from '@angular/core';
import { Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {

  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // getDocument(id: string) : Document {
  //   For each contact in the contacts list
  //     IF contact.id equals the id THEN
  //       RETURN this.contact
  //     ENDIF
  //   ENDFOR
  //   RETURN null
  //   }
  // }

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
}
