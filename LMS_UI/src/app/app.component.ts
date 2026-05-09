import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ScrollAnimationService } from './services/scroll-animation.services';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, 
    ButtonModule, FormsModule,
   InputTextModule, 
    PasswordModule, FloatLabelModule,
  ],
  template: `
    <router-outlet />
  `,
  styleUrls: ['../styles.scss']
})
export class App implements OnInit {
  protected readonly title = signal('lms');
  private scrollAnimation = inject(ScrollAnimationService);
 private router = inject(Router);
  ngOnInit() {
    this.scrollAnimation.init();
    // Optional: Force a refresh if needed
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      setTimeout(() => {
        this.scrollAnimation.refresh();
      }, 100);
  });
 }
}