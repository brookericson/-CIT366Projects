import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute){ }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

  onDelete(id: string) {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contact']);
  }

}
