import { Component, OnInit } from '@angular/core';
import {CategorieServiceService} from '../../service/categorie-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private msg = '';

  private err = false;
  private categories: any;
  constructor(private categorieService: CategorieServiceService,
              private router: Router) { }

  ngOnInit() {
    this.getcategories();
  }

  private delete(id: any) {
    this.categorieService.suppCategorie(id).subscribe(
      (data: any) => {
        this.msg = data;

        this.getcategories();
      }, error => {
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

  modify(id: any) {
    this.router.navigateByUrl('/modifcategory/' + id);
  }
}
