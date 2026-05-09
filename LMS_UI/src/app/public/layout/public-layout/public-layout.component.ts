import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../components/nav-bar/nav-bar';
import { FooterComponent } from '../components/footer/footer';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent {
  // Component logic is now in nav-bar and footer components
}