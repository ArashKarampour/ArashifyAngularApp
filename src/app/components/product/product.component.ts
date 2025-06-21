import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prodcut } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, CurrencyPipe, ButtonModule, ConfirmPopupModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({ required: true }) product!: Prodcut;
  @Output() editProductOutput: EventEmitter<Prodcut> = new EventEmitter<Prodcut>();
  @Output() deleteProductOutput: EventEmitter<Prodcut> = new EventEmitter<Prodcut>();
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  editProduct(){
    this.editProductOutput.emit(this.product);
  }
  deleteProduct(){
    this.deleteProductOutput.emit(this.product);
  }
  confirmDeleteProduct(event : Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this product?',
      icon: 'pi pi-trash',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete'
      },
      accept: () => {
        this.deleteProduct()
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Product has been deleted!', life: 1000 });        
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Canceled', detail: 'You have Canceled!', life: 1000 });
      }
    })
  }
  getPrice(price: string | number): number {
    if (typeof price === 'string') {
      return parseFloat(price.replace(',', '.'));
    }
    return price;
  }
}
