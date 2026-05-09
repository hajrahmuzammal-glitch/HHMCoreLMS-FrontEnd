import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private initialized = false;

  constructor() {}

  init(): void {
    if (this.initialized) {
      return;
    }
    
    this.initialized = true;
    console.log('🎬 Animation service started');

    // Animate everything immediately on init
    this.animateAllVisibleElements();

   const scrollTarget = document.scrollingElement || document.documentElement;

fromEvent(scrollTarget, 'scroll')
  .pipe(
    throttleTime(100),
    takeUntil(this.destroy$)
  )
  .subscribe(() => {
    this.animateAllVisibleElements();
  });

  }

  private animateAllVisibleElements(): void {
    // Find all elements that need animation
    const elements = document.querySelectorAll('[data-animate]:not(.animated)');
    
    if (elements.length === 0) {
      return;
    }

    console.log(`🔍 Checking ${elements.length} elements...`);

    elements.forEach((element, index) => {
      // Check if element is in viewport
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element is visible if any part is in viewport
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      if (isVisible) {
        // Get delay from attribute
        const delay = parseInt(element.getAttribute('data-delay') || '0', 10);
        
        // Add animated class after delay
        setTimeout(() => {
          element.classList.add('animated');
          console.log(`✨ Animated element ${index + 1}`);
        }, delay);
      }
    });
  }

  refresh(): void {
    console.log('🔄 Refresh animations');
    
    // Remove all animated classes
    document.querySelectorAll('[data-animate].animated').forEach(el => {
      el.classList.remove('animated');
    });
    
    // Re-animate
    setTimeout(() => {
      this.animateAllVisibleElements();
    }, 50);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}