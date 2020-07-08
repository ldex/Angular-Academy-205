import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from "../../services/favourite.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  product$: Observable<Product>;

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  delete(id: number) {
    if(window.confirm("Are you sure ??")) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log("Product deleted!");
          this.productService.initProducts();
          this.router.navigateByUrl("/products");
        },
        error => console.log("Could not delete product: " + error)
      )
    }
  }

  newFavourite(product: Product) {
    this.favouriteService.addToFavourites(product);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    
    this.product$ = this
                      .productService
                      .products$
                      .pipe(
                        map(products => products.find(p => p.id == id))
                      )
  }

}
