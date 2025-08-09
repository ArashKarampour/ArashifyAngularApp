import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/'
    },
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      route: '/about'
    },
  ];
  toggleDarkMode() {
    const element : HTMLElement | null = document.querySelector('html');    
    (element as unknown as HTMLElement).classList.toggle('my-app-dark');
  }
}
