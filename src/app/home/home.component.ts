import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Prodcut, Products } from '../../types';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products : Prodcut[] = [];
  constructor(private prodcutsService: ProductsService){}

  ngOnInit(): void{
    this.prodcutsService.
    getProducts("http://localhost:3000/clothes", {page:0,perPage:5}).
    pipe(catchError(error => { // handling the erros here
      console.error(error);
      return throwError(()=> new Error("Something went wrong please try again later."))
    }))
    .subscribe({ //using the observable
      next: (products: Products) => { // using the returned value from observable
        this.products = products.items;
        console.log(products);      
      },
      error: (err) => { // catching the returned error from error handler above
        console.error("Couldn't fetch the clothes data from the server!",err.message);
      },
    })
  }
}
