import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInsertComponent } from './product-insert/product-insert.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductInsertComponent
  ],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
