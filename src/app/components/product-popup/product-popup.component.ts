import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Prodcut } from '../../../types';

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, RatingModule],
  templateUrl: './product-popup.component.html',
  styleUrl: './product-popup.component.scss'
})
export class ProductPopupComponent {
  @Input() header: string = '';

  // Two-way-binding on visibilty with input and ouput
  @Input() visiblity : boolean = false;
  @Output() visiblityChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() product: Prodcut = {
    id: 0,
    image: '',
    name: '',
    price: '',
    rating: 0
  }; // to hold the product to be edited
  @Output() saveProduct: EventEmitter<Prodcut> = new EventEmitter<Prodcut>();



  resetInitProduct(){
    this.product = {
      id: 0,
      image: '',
      name: '',
      price: '',
      rating: 0
    }
  }

  changeVisibilty(){
    this.visiblity = !this.visiblity;
    this.visiblityChange.emit(this.visiblity);
    // this.resetInitProduct();
  }

  onSave(){
    if(!this.product.name || !this.product.price || !this.product.image){
      alert("Please fill all the fields");
      return;
    }
    this.saveProduct.emit(this.product);
    this.resetInitProduct();
    this.changeVisibilty();
  }


}
