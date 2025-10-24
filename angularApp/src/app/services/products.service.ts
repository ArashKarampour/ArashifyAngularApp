import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationParams, Prodcut, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProducts(url: string, params?: PaginationParams): Observable<Products>{
    return this.apiService.get<Products>(url,{
      params,
      responseType: 'json'
    });
  }
  addProduct(url: string, body: Prodcut) : Observable<Prodcut>{
    return this.apiService.post<Prodcut>(url, body, {});
  }
  editProduct(url: string, body: Prodcut) : Observable<Prodcut>{
    return this.apiService.put<Prodcut>(url, body, {});
  }
  deleteProduct(url:string): Observable<Prodcut>{
    return this.apiService.delete<Prodcut>(url, {});
  }
}
