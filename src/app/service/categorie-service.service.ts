import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {

  private url = 'http://localhost:9050/';
  constructor(private http: HttpClient) { }

  public getCategories() {
   return this.http.get(this.url + 'categories');
  }

  public getCategorie(id: any) {
   return this.http.get(this.url + 'categorie/' + id);
  }

  public addCategorie(form: any) {
   return this.http.post(this.url + 'categories', form, {
     responseType: 'text'
   });
  }

  public suppCategorie(id: any) {
   return this.http.delete(this.url + 'categorie/' + id);
  }

  public modifCategorie(value: any) {
    return this.http.put(this.url + 'categories', value, {
      responseType: 'text'
    });
  }

  public getProduitByCategorie(id: any, name: any) {
    return this.http.get( this.url + 'books/categorie?idcategorie=' + id + '&nameBook=' + name);
  }
}
