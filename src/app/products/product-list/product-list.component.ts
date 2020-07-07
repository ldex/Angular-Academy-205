import { Component, OnInit } from '@angular/core';
import { Product } from "../product.interface";
import { ProductService } from "../../services/product.service";
import { FavouriteService } from "../../services/favourite.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  products: Product[];
  selectedProduct: Product;

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService
  ) {}

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

}
