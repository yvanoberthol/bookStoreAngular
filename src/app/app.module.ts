import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './controller/navbar/navbar.component';
import { CategoriesComponent } from './controller/categories/categories.component';
import { BooksComponent } from './controller/books/books.component';
import { AddcategorieComponent } from './controller/addcategorie/addcategorie.component';
import {FormsModule} from '@angular/forms';
import { ModifcategorieComponent } from './controller/modifcategorie/modifcategorie.component';
import { AddbookComponent } from './controller/addbook/addbook.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { ModifbookComponent } from './controller/modifbook/modifbook.component';
import { HighLightPipe } from './pipe/high-light.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoriesComponent,
    BooksComponent,
    AddcategorieComponent,
    ModifcategorieComponent,
    AddbookComponent,
    ModifbookComponent,
    HighLightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
