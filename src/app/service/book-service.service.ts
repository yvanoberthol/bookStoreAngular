import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private url = 'http://localhost:9050/';
  constructor(private http: HttpClient) { }

  public getBooks(): Observable<HttpEvent<{}>> {
    return this.http.get(this.url + 'books');
  }

  public getBook(id: any) {
    return this.http.get(this.url + 'book/' + id);
  }

  public addBook( form: any): Observable<HttpEvent<{}>> {

    const formData: FormData = new FormData();
    formData.append('pdf', form.pdf);
    formData.append('categorie', form.categorie);
    const req = new HttpRequest('POST', this.url + 'books', formData,
      {reportProgress: true, responseType: 'text'});

    return this.http.request(req);
  }

  public suppBook(id: any) {
    return this.http.delete(this.url + 'book/' + id, {
      responseType: 'text'
    });
  }

  public modifBookWithPdf(value: any): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();
    formData.append('id', value.id);
    formData.append('categorie', value.categorie);
    formData.append('pdf', value.pdf);
    const req = new HttpRequest('PUT', this.url + 'books', formData,
      {reportProgress: true, responseType: 'text'});

    return this.http.request(req);
  }

  public modifBookLessPdf(value: any) {

    const formData: FormData = new FormData();
    formData.append('id', value.id);
    formData.append('categorie', value.categorie);

    return this.http.put(this.url + 'modif/books', formData, { responseType: 'text'
    });
  }

  public getPdfEvent( value: any): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const req = new HttpRequest('GET', this.url + 'files/' + value + '.pdf',
      {reportProgress: true,
        headers, responseType: 'blob' as 'json'});

    return this.http.request(req);
  }

  public getPdfBlob(value: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.url + 'files/' + value + '.pdf',
      {headers, responseType: 'blob' as 'json'});
  }

  /*public getBookCategorie(value: any): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get('books/categorie?nameBook=' + value, {reportProgress: true,
        headers, responseType: 'blob' as 'json'});
  }*/
}
