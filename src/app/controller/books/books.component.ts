import { Component, OnInit } from '@angular/core';
import {BookServiceService} from '../../service/book-service.service';
import {Router} from '@angular/router';
import {CategorieServiceService} from '../../service/categorie-service.service';
import {NgForm} from '@angular/forms';
import {HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  private p = 1;
  private pageSize = 5;

  private msg = '';
  private err = false;
  private books: any;
  private id: any;
  private categories: any;
  private searchText: any = '';
  private dowloadComplet = true;

  constructor(private bookService: BookServiceService,
              private categorieService: CategorieServiceService,
              private router: Router) { }

  ngOnInit() {
    this.getbooks();
    this.getcategories();
  }

  private delete(id: any) {
    this.bookService.suppBook(id).subscribe(
      (data: any) => {
        this.msg = data;
        this.id = id;
      }, error => {
        this.err = true;
      }
    );
  }

  private getbooks() {
    this.bookService.getBooks().subscribe(
      (data: HttpEvent) => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.dowloadComplet = false;
            break;
          case HttpEventType.Response:
            this.books = data;
            this.dowloadComplet = true;
        }

      }, error => {
          this.err = true;
        }
    );
  }

  private getPdf(id: any, name: any) {
    this.bookService.getPdfBlob(id).subscribe(
      (data: any) => {
        switch (data.type) {
          case HttpEventType.UploadProgress:
            this.dowloadComplet = false;
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              const file = new Blob([data], {type: 'application/pdf'});
              const url = window.URL.createObjectURL(file);
              const link = document.createElement('a');
              link.href = url;

              const namefile = name.substring(0, name.length - 4);

              link.download = namefile + '.pdf';
              this.dowloadComplet = true;
              link.click();
            }, 1500);
        }
      }
    );
  }

  modify(id: any) {
    this.router.navigateByUrl('/modifbook/' + id);
  }

  private getcategories() {
    this.categorieService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      }
    );
  }

  private search(form: NgForm) {
    if (form.value.categorie === '0') {
      this.getbooks();
    } else {
      this.categorieService.getProduitByCategorie(form.value.categorie, form.value.name).subscribe(
        (data: any) => {
          this.books = data;
        }
      );
    }
  }

}
