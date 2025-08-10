import { Component, EventEmitter, Input, Output, inject, OnChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormsModule, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Prodcut } from '../../../types';

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, RatingModule, ReactiveFormsModule],
  templateUrl: './product-popup.component.html',
  styleUrl: './product-popup.component.scss'
})
export class ProductPopupComponent implements OnChanges {
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

  specialCharactherValidator() : ValidatorFn{
    return (control: any) => {
      const value = control.value;
      if (value && /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return { specialCharacter: true }; // this means the value contains special characters which will lead to error
      }
      return null; // this means the value is valid
    };
  }

  private formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    id: [0], // id is not required for the form, but we keep it to send back to the parent component
    name: ['', [Validators.required, this.specialCharactherValidator()]],
    price: [''],
    image: ['', [Validators.required]],
    rating: [0]
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

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
    if(!this.productForm.value.name || !this.productForm.value.price || !this.productForm.value.image){
      alert("Please fill all the fields");
      return;
    }
    const {id,name, price, image, rating} = this.productForm.value;
    this.saveProduct.emit({
      id: id || 0,
      name: name || '',
      price: price || '',
      image: image || '',
      rating: rating || 0
    }); // passing the value from the form to the parent component
    console.log("Product saved:", this.productForm.value);
    
    // this.resetInitProduct();
    this.changeVisibilty();
  }


}
