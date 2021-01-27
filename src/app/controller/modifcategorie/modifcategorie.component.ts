import { Component, OnInit } from '@angular/core';
import {CategorieServiceService} from '../../service/categorie-service.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-modifcategorie',
  templateUrl: './modifcategorie.component.html',
  styleUrls: ['./modifcategorie.component.css']
})
export class ModifcategorieComponent implements OnInit {

  private id: any;
  private msg: any;
  private categorie: any;
  constructor(private categorieService: CategorieServiceService,
              private activatedRoute: ActivatedRoute,
              private route: Router) {

    this.route.events.subscribe(
      (val: any) => {
        if (val instanceof NavigationEnd) {
          this.id = activatedRoute.snapshot.params.id;
          this.getCategorie(this.id);
        }
      }
    );
  }

  ngOnInit() {
  }

  private getCategorie(id) {
    this.categorieService.getCategorie(id).subscribe(
      (data: any) => {
        this.categorie = data;
      }
    );
  }

  modif(value: any) {
    this.categorieService.modifCategorie(value).subscribe(
      (data: any) => {
        this.msg = data;
      }
    );
  }
}
