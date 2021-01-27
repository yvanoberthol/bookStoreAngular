import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './controller/categories/categories.component';
import {BooksComponent} from './controller/books/books.component';
import {AddcategorieComponent} from './controller/addcategorie/addcategorie.component';
import {ModifcategorieComponent} from './controller/modifcategorie/modifcategorie.component';
import {AddbookComponent} from './controller/addbook/addbook.component';
import {ModifbookComponent} from './controller/modifbook/modifbook.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: CategoriesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'addcategory', component: AddcategorieComponent},
  {path: 'addbook', component: AddbookComponent},
  {path: 'modifcategory/:id', component: ModifcategorieComponent},
  {path: 'modifbook/:id', component: ModifbookComponent},
  {path: 'books', component: BooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
