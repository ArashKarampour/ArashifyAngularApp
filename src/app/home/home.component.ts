import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Prodcut, Products } from '../../types';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductComponent } from "../components/product/product.component";
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    PaginatorModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products : Prodcut[] = [];
  rows : number = 5;
  totalRecords : number = 0;
  constructor(private prodcutsService: ProductsService){}

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number){
    this.prodcutsService.
    getProducts("http://localhost:3000/clothes", {page, perPage}).
    pipe(catchError(error => { // handling the erros here
      console.error(error);
      return throwError(()=> new Error("Something went wrong please try again later."))
    }))
    .subscribe({ //using the observable
      next: (products: Products) => { // using the returned value from observable
        this.products = products.items;
        this.totalRecords = products.total;
        // console.log(products);      
      },
      error: (err) => { // catching the returned error from error handler above
        console.error("Couldn't fetch the clothes data from the server!",err.message);
      },
    })
  }

  ngOnInit(): void{
    this.fetchProducts(0, this.rows);
  }
}
