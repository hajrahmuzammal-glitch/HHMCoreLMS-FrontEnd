import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBarComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Navbar becomes solid after scrolling 100px
    this.isScrolled = window.scrollY > 100;
  }

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
  
  // Prevent body scroll when menu is open
  if (this.mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-menu-active'); // NEW
  } else {
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-active'); // NEW
  }
}

closeMobileMenu() {
  this.mobileMenuOpen = false;
  document.body.style.overflow = '';
  document.body.classList.remove('mobile-menu-active'); // NEW
}

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const nav = document.querySelector('.navbar');
    const toggle = document.querySelector('.menu-toggle');
    
    if (this.mobileMenuOpen && 
        nav && !nav.contains(target) && 
        toggle && !toggle.contains(target)) {
      this.closeMobileMenu();
    }
  }
}