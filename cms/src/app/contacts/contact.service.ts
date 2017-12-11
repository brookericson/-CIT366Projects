import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

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

  constructor(private http: Http) {
    this.initContacts();
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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
  }

  //  compareContactsByName(contactA: Contact, contactB: Contact){
  //   if (contactA.name < contactB.name) {
  //     return -1;
  //   } else if (contactA.name > contactB.name) {
  //     return 1;
  //   }
  //   return 0;
  // }

  initContacts() {
    this.http.get('https://brookecms-3bb6d.firebaseio.com/contacts.json')
      .map((response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe((contactsReturned: Contact[]) => {
        this.contacts = contactsReturned;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  storeContacts() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://brookecms-3bb6d.firebaseio.com/contacts.json',
      this.getContacts(),
      {headers: headers})
      .subscribe(
        (reponse) => this.contactListChangedEvent.next(this.contacts.slice())
      );
  }
}
