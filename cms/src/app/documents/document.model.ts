export class Document {
  public documentId: string;
  public name: string;
  public description: string;
  public url: string;

  constructor(documentId: string, name: string, description: string, url: string) {
    this.documentId = documentId;
    this.name = name;
    this.description = description;
    this.url = url;
  }
}
