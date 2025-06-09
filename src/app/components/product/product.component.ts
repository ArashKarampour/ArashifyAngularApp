import { Component, Input } from '@angular/core';
import { Prodcut } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({ required: true }) product!: Prodcut;
}
