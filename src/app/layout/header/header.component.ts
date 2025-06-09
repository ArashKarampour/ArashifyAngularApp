import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggleDarkMode() {
    const element : HTMLElement | null = document.querySelector('html');    
    (element as unknown as HTMLElement).classList.toggle('my-app-dark');
  }
}
