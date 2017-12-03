import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContactService {
  maxContactId: number;
  contacts: Contact[] = [];

  contactListChangedEvent = new Subject<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(index: string) {
    return this.contacts[index];
  }

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
    this.contacts.sort(this.compareContactsByName);
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contacts = this.contacts.slice();
    this.contactListChangedEvent.next(this.contacts);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contacts = this.contacts.slice();
    this.contactListChangedEvent.next(this.contacts);
  }

  updateContact(originalContact: Contact,
                 newContact: Contact) {
    if ((originalContact || newContact) === null) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0 ) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contacts = this.contacts.slice();
    this.contactListChangedEvent.next(this.contacts);
  }

   compareContactsByName(contactA: Contact, contactB: Contact){
    if (contactA.name < contactB.name) {
      return -1;
    } else if (contactA.name > contactB.name) {
      return 1;
    }
    return 0;
  }
}
