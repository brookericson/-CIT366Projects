import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params } from '@angular/router';
import { Document } from '../document.model';
import {DocumentService} from '../documents.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  originalDocument: Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (params['id'] === null) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
        if (!this.originalDocument) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document('1000' , value.name, value.description, value.documentUrl, null);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
    }

    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
}
