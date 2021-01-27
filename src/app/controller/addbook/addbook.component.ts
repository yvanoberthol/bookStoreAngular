import { Component, OnInit } from '@angular/core';
import {CategorieServiceService} from '../../service/categorie-service.service';
import {BookServiceService} from '../../service/book-service.service';
import {HttpEventType} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {PDFProgressData} from 'pdfjs-dist';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  private msg = '';
  private err = false;
  private categories: any;
  private currentUpload: any;
  private progressbar = 0;
  private src: any;
  private show = false;
  private download = false;
  private msgerror = false;
  private disable = true;

  constructor(private categorieService: CategorieServiceService,
              private bookService: BookServiceService) {
  }

  ngOnInit() {
    this.getcategories();
  }

  private add(form: NgForm) {
    const formData = {
      categorie: form.value.categorie,
      pdf: this.currentUpload
    };

    this.bookService.addBook(formData).subscribe(
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
                form.resetForm();
              }, 500);
          }}, error => {
              this.progressbar = 0;
              this.err = true;
            }
    );
  }

  private getcategories() {
    this.categorieService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
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
