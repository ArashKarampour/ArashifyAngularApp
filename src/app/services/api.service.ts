import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options, Prodcut } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T> (url: string, options?: Options): Observable<T>{
    return this.http.get<T>(url,options);
  }
  post<T> (url: string, body: Prodcut | any, options?: Options): Observable<T>{
    return this.http.post<T>(url, body, options);
  }
  put<T> (url: string, body: Prodcut | any, options?: Options): Observable<T>{
    return this.http.put<T>(url, body, options);
  }
  delete<T> (url: string, options?: Options): Observable<T>{
    return this.http.delete<T>(url, options);
  }
}
