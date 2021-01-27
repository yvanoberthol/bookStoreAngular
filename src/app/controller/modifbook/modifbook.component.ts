import { Component, OnInit } from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {CategorieServiceService} from '../../service/categorie-service.service';
import {BookServiceService} from '../../service/book-service.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-modifbook',
  templateUrl: './modifbook.component.html',
  styleUrls: ['./modifbook.component.css']
})
export class ModifbookComponent implements OnInit {

  private msg = '';
  private err = false;
  private categories: any;
  private currentUpload: any;
  private progressbar = 0;
  private src: any;
  private show = false;
  private download = false;
  private msgerror = false;

  private book: any;
  private id: any;
  private disable = false;

  constructor(private categorieService: CategorieServiceService,
              private bookService: BookServiceService,
              private activatedRoute: ActivatedRoute,
              private route: Router) {
    this.route.events.subscribe(
      (val: any) => {
        if (val instanceof NavigationEnd) {
          this.getcategories();

          this.id = activatedRoute.snapshot.params.id;
          this.getBook(this.id);
        }
      }
    );

  }

  ngOnInit() {

  }

  private add(form: NgForm) {

    const formData = {
      id: form.value.id,
      categorie: form.value.categorie,
      pdf: this.currentUpload
    };

    if (formData.pdf === undefined) {
      this.bookService.modifBookLessPdf(formData).subscribe(
        (data: any) => {
          this.msg = 'ok';
          }, error => {
          this.err = true;
        }
      );

    } else {
      this.bookService.modifBookWithPdf(formData).subscribe(
        (event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.disable = true;
              this.progressbar = Math.round(event.loaded / event.total * 100);
              break;
            case HttpEventType.Response:
              setTimeout(() => {
                this.msg = 'ok';
                this.progressbar = 0;
                this.show = false;
              }, 1500);
          }}, error => {
          this.progressbar = 0;
          this.err = true;
        }
      );
    }
  }

  private getcategories() {
    this.categorieService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      }
    );
  }

  private getBook(id) {
    this.bookService.getBook(id).subscribe(
      (data: any) => {
        this.book = data;
      }
    );

  }

  uploadFile() {
    const $img: any = document.querySelector('#pdf');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.src = e.target.result;
      };
      reader.readAsArrayBuffer($img.files[0]);
      this.currentUpload = $img.files[0];

      this.show = true;
      this.msgerror = false;
    }
  }

  completeLoading($event) {
    this.msgerror = false;
    this.download = true;
    this.disable = false;
  }

  onError(error: any) {
    this.msgerror = true;
    this.disable = true;
  }

}
