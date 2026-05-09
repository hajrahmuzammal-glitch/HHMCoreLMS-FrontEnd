import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  
  // Hero slides data
  slides = [
    {
      title: 'Study Anytime, Anywhere',
      subtitle: 'Flexible learning that fits your schedule and lifestyle',
      backgroundImage: 'images/library-bg-1.jpg', // You'll need to add this
      searchPlaceholder: 'Search for courses, topics, or instructors...'
    },
    {
      title: 'Expert-Led Courses',
      subtitle: 'Learn from industry professionals and certified instructors',
      backgroundImage: '/images/library-bg-2.jpg',
      searchPlaceholder: 'Find expert instructors and courses...'
    },
    {
      title: 'Interactive Learning',
      subtitle: 'Engage with hands-on projects and real-world applications',
      backgroundImage: '/images/library-bg-3.jpg',
      searchPlaceholder: 'Discover interactive learning paths...'
    }
  ];

  currentSlide = 0;
  searchQuery = '';
  
  private autoSlideInterval: any;
  private readonly SLIDE_DURATION = 6000; // 6 seconds

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  // Auto-slide functionality
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.SLIDE_DURATION);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Navigation methods
  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // Search functionality
  onSearchSubmit() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Implement your search logic here
      // Example: this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  onSearchFocus() {
    this.stopAutoSlide();
  }

  onSearchBlur() {
    this.startAutoSlide();
  }

  // Current slide getter
  get currentSlideData() {
    return this.slides[this.currentSlide];
  }
}
