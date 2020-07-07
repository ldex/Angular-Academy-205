import { Component, OnInit } from '@angular/core';
import { Product } from "../product.interface";
import { ProductService } from "../../services/product.service";
import { FavouriteService } from "../../services/favourite.service";
import { Observable, EMPTY } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]>;
  productsNb$: Observable<number>;
  selectedProduct: Product;
  errorMessage: string;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.selectedProduct = null;
    this.currentPage--;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.selectedProduct = null;
    this.currentPage++;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl("/products/" + product.id);
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router
  ) {}

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  ngOnInit(): void {
    this.products$ = this
                        .productService
                        .products$
                        .pipe(
                          catchError(
                            error => {
                              this.errorMessage = error;
                              return EMPTY;
                            }
                          )
                        );

    this.productsNb$ = this.products$
                              .pipe(
                                map(products => products.length),
                                startWith(0)
                              );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

}
