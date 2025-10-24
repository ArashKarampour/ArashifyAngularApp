import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Prodcut, Products } from '../../types';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductComponent } from "../components/product/product.component";
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProductPopupComponent } from '../components/product-popup/product-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    PaginatorModule,
    ButtonModule,
    ProductPopupComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products : Prodcut[] = [];
  rows : number = 5;
  totalRecords : number = 0;
  addPopupVisibility : boolean = false;
  editPopupVisibility : boolean = false;
  selectedProduct: Prodcut = {
    id: 0,
    image: '',
    name: '',
    price: '',
    rating: 0
  }; // to hold the product to be edited

  @ViewChild('paginator') paginator: Paginator | undefined; // to access the paginator component

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

  changePaginatorUI(page: number = 0){
    this.paginator?.changePage(page);
  }

  reloadPage(){
    setTimeout(() => {
      this.fetchProducts(this.paginator?.getPage() || 0, this.rows);
      this.changePaginatorUI(this.paginator?.getPage() || 0);
      // location.reload();
    }, 1500);
  }

  addProduct(product: Prodcut){
    this.prodcutsService.addProduct(`http://localhost:3000/clothes`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.reloadPage();
        // this.fetchProducts(0, this.rows);
        // this.changePaginatorUI();
      },
      error: (err) => {
        console.error('Somethong went wrong, ', err);
      } 
    });
  }
  editProduct(id: number, product: Prodcut){
    this.prodcutsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.reloadPage();
        // this.fetchProducts(0, this.rows);
        // this.changePaginatorUI();
      },
      error: (err) => {
        console.error('Somethong went wrong, ', err);
      } 
    });
  }
  deleteProduct(id: number){
    this.prodcutsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.reloadPage();
        // this.fetchProducts(0, this.rows);
        // this.changePaginatorUI();
      },
      error: (err) => {
        console.error(err);
      } 
    });
  }

  toggleAddPopup(){
    this.addPopupVisibility = true;
  }

  toggleEditPopup(product: Prodcut){
    this.selectedProduct = product;
    this.editPopupVisibility = true;
  }

  deleteSelectedProduct(product: Prodcut){
    this.deleteProduct(product.id); // directly delete the product
  }

  onSaveAddProduct(product: Prodcut){
    this.addProduct(product);
    this.addPopupVisibility = false; // close the popup after saving
  }

  onSaveEditProduct(product: Prodcut){
    this.editProduct(product.id, product);
    this.editPopupVisibility = false; // close the popup after saving
  }

  ngOnInit(): void{
    this.fetchProducts(0, this.rows);
  }
}
