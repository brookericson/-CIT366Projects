import {EventEmitter, Injectable} from '@angular/core';
import { Contact} from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {

  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
    }
  }
  return null;
  }

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
}
