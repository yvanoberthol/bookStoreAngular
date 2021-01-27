import { Component, OnInit } from '@angular/core';
import {CategorieServiceService} from '../../service/categorie-service.service';

@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.css']
})
export class AddcategorieComponent implements OnInit {

  private msg = '';
  private err = false;
  constructor(private categorieService: CategorieServiceService) { }

  ngOnInit() {
  }

  private add(value: any) {
    this.categorieService.addCategorie(value).subscribe(
      (data: any) => {
        this.msg = data;
      }, err => {
        this.err = true;
    }
    );

  }

}
