import { Component, OnInit } from '@angular/core';
import { Product } from "../product.interface";
import { ProductService } from "../../services/product.service";
import { FavouriteService } from "../../services/favourite.service";
import { Observable, EMPTY, combineLatest } from 'rxjs';
import { catchError, map, startWith, tap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  //products: Product[];

  // Observables
  products$: Observable<Product[]>;
  productsNb$: Observable<number>;
  filter$: Observable<string>;
  filteredProducts$: Observable<Product[]>;
  filtered$: Observable<boolean>;


  selectedProduct: Product;
  errorMessage: string;

  filter: FormControl = new FormControl("");

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  firstPage() {
    this.start = 0;
    this.end = this.pageSize;
    this.currentPage = 1;
  }

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

    this.filter$ = this.filter
                      .valueChanges
                      .pipe(
                        map(text => text.trim()),
                        filter(text => text == "" || text.length > 2),
                        debounceTime(500),
                        distinctUntilChanged(),
                        tap(() => this.firstPage()),
                        startWith("")
                    );

    this.filtered$ = this.filter$
                          .pipe(
                            map(text => text.length > 0)
                          );

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

  this.filteredProducts$ = combineLatest([this.products$, this.filter$])
    .pipe(
      map(([products, filterString]) =>
        products.filter(product => 
          product.name.toLowerCase().includes(filterString.toLowerCase())
        )
      )
    );

    this.productsNb$ = this.filteredProducts$
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
