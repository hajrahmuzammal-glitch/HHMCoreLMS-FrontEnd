import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  HostListener,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  link?: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './features-section.html',
  styleUrls: ['./features-section.scss']
})
export class FeaturesSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  // @ViewChild('cardsViewport') cardsViewport!: ElementRef;
  @ViewChild('featureSection') featureSection!: ElementRef;
  allCards: FeatureCard[] = [
    {
      icon: 'pi pi-graduation-cap',
      title: 'Academic Excellence',
      description: 'Explore diverse programs with cutting-edge curriculum designed to shape future leaders.',
      ctaText: 'Explore Programs'
    },
    {
      icon: 'pi pi-users',
      title: 'Vibrant Campus Life',
      description: 'Experience dynamic student life with clubs, events, and activities fostering growth.',
      ctaText: 'Discover Life'
    },
    {
      icon: 'pi pi-globe',
      title: 'Virtual Tours',
      description: 'Take immersive virtual tours of our state-of-the-art facilities and campus.',
      ctaText: 'Start Tour'
    },
    {
      icon: 'pi pi-file-edit',
      title: 'Apply Today',
      description: 'Begin your journey with our simple application process and join successful students.',
      ctaText: 'Apply Now'
    },
    {
      icon: 'pi pi-book',
      title: 'Research & Innovation',
      description: 'Engage in groundbreaking research with renowned faculty and world-class facilities.',
      ctaText: 'Learn More'
    },
    {
      icon: 'pi pi-star',
      title: 'Student Success',
      description: 'Comprehensive support services including counseling, tutoring, and career guidance.',
      ctaText: 'Get Support'
    },
    {
      icon: 'pi pi-briefcase',
      title: 'Career Services',
      description: 'Connect with top employers and access exclusive internship opportunities.',
      ctaText: 'Explore Careers'
    },
    {
      icon: 'pi pi-shield',
      title: 'Financial Aid',
      description: 'Discover scholarships, grants, and financial aid options for accessibility.',
      ctaText: 'Find Aid'
    }
  ];

  cardGroups: FeatureCard[][] = [];
  visibleCards: FeatureCard[] = [];
  currentGroup: number = 0;

  private autoPlayInterval: any = null;
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private isAnimating: boolean = false;
  private cardsPerGroup: number = 4;
  private isBrowser: boolean;
  private hasAnimated: boolean = false;
  private isHovered: boolean = false;
  private onContainerMouseEnter = () => {
    this.isHovered = true;
    this.stopAutoPlay();
  }
  private onContainerMouseLeave = () => {
    this.isHovered = false;
    this.startAutoPlay();
  }
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.updateCardsPerGroup();
  }

  ngOnInit(): void {
    this.initializeCardGroups();
    this.visibleCards = [...this.cardGroups[0]];
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      this.setupScrollTrigger();
      this.startAutoPlay();
      const container = this.cardsContainer?.nativeElement;
      if (container) {
        container.addEventListener('mouseenter', this.onContainerMouseEnter);
        container.addEventListener('mouseleave', this.onContainerMouseLeave);
      }
    }, 300);
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;

    const oldCardsPerGroup = this.cardsPerGroup;
    this.updateCardsPerGroup();

    if (oldCardsPerGroup !== this.cardsPerGroup) {
      this.cleanup();
      this.initializeCardGroups();
      this.currentGroup = 0;
      this.visibleCards = [...this.cardGroups[0]];
      this.hasAnimated = false;
      this.isHovered = false;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.setupScrollTrigger();
        this.startAutoPlay();
      }, 100);
    }
  }

  private updateCardsPerGroup(): void {
    if (!this.isBrowser) return;

    const width = window.innerWidth;
    this.cardsPerGroup = width < 768 ? 2 : 4; // actually different!
    // // Very thin phones (portrait) - 4 cards in column
    // if (width < 400) {
    //   this.cardsPerGroup = 4;
    // }
    // // Regular phones - 2x2 grid (4 cards)
    // else if (width < 768) {
    //   this.cardsPerGroup = 4;
    // }
    // // Tablets - 2 cards per row, show 4 (2x2)
    // else if (width < 1024) {
    //   this.cardsPerGroup = 4;
    // }
    // // Desktop - 4 cards in a row
    // else {
    //   this.cardsPerGroup = 4;
    // }
  }

  private initializeCardGroups(): void {
    this.cardGroups = [];
    for (let i = 0; i < this.allCards.length; i += this.cardsPerGroup) {
      this.cardGroups.push(this.allCards.slice(i, i + this.cardsPerGroup));
    }
  }

  private setupScrollTrigger(): void {
    if (!this.isBrowser || !this.featureSection) return;

    try {
      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: this.featureSection.nativeElement,
        start: 'top 70%',
        onEnter: () => {
          if (!this.hasAnimated) {
            this.animateCardsIn();
            this.hasAnimated = true;
          }
        }
      });
    } catch (error) {
      console.error('ScrollTrigger error:', error);
    }
  }

  private animateCardsIn(): void {
    if (!this.isBrowser || !this.cardsContainer) return;

    try {
      const cards = this.cardsContainer.nativeElement.querySelectorAll('.feature-card');

      // Stacked card appearance animation
      cards.forEach((card: HTMLElement, index: number) => {
        gsap.fromTo(
          card,
          {
            x: -80,
            y: index * 10, // Stacked effect
            opacity: 0,
            scale: 0.9,
            rotation: -3
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.15, // Stagger - one by one
            ease: 'power3.out'
          }
        );
      });
    } catch (error) {
      console.error('Animation error:', error);
    }
  }

  async nextGroup(): Promise<void> {
    if (this.isAnimating || this.currentGroup >= this.cardGroups.length - 1 || !this.isBrowser) {
      return;
    }

    try {
      this.isAnimating = true;
      this.stopAutoPlay();

      // Slide current cards out
      await this.slideCardsOut('left');

      // Update group
      this.currentGroup++;
      this.visibleCards = [...this.cardGroups[this.currentGroup]];

      this.cdr.detectChanges();
      await this.wait(100);

      // Slide new cards in with stacked effect
      await this.slideCardsIn();

      this.isAnimating = false;
      this.startAutoPlay();

    } catch (error) {
      console.error('Next group error:', error);
      this.isAnimating = false;
      this.startAutoPlay();
    }
  }

  async previousGroup(): Promise<void> {
    if (this.isAnimating || this.currentGroup <= 0 || !this.isBrowser) {
      return;
    }

    try {
      this.isAnimating = true;
      this.stopAutoPlay();

      await this.slideCardsOut('right');

      this.currentGroup--;
      this.visibleCards = [...this.cardGroups[this.currentGroup]];

      this.cdr.detectChanges();
      await this.wait(100);

      await this.slideCardsIn();

      this.isAnimating = false;
      this.startAutoPlay();

    } catch (error) {
      console.error('Previous group error:', error);
      this.isAnimating = false;
      this.startAutoPlay();
    }
  }

  async goToGroup(index: number): Promise<void> {
    if (
      this.isAnimating ||
      index === this.currentGroup ||
      index < 0 ||
      index >= this.cardGroups.length ||
      !this.isBrowser
    ) {
      return;
    }

    try {
      this.isAnimating = true;
      this.stopAutoPlay();

      const direction = index > this.currentGroup ? 'left' : 'right';
      await this.slideCardsOut(direction);

      this.currentGroup = index;
      this.visibleCards = [...this.cardGroups[this.currentGroup]];

      this.cdr.detectChanges();
      await this.wait(100);

      await this.slideCardsIn();

      this.isAnimating = false;
      this.startAutoPlay();

    } catch (error) {
      console.error('Go to group error:', error);
      this.isAnimating = false;
      this.startAutoPlay();
    }
  }

  private slideCardsOut(direction: 'left' | 'right'): Promise<void> {
    return new Promise((resolve) => {
      if (!this.cardsContainer || !this.isBrowser) {
        resolve();
        return;
      }

      const cards = this.cardsContainer.nativeElement.querySelectorAll('.feature-card');
      const multiplier = direction === 'left' ? -1 : 1;

      try {
        const timeline = gsap.timeline({
          onComplete: () => resolve()
        });

        cards.forEach((card: HTMLElement, index: number) => {
          timeline.to(
            card,
            {
              x: multiplier * 100,
              opacity: 0,
              scale: 0.9,
              rotation: multiplier * 3,
              duration: 0.6,
              ease: 'power2.in'
            },
            index * 0.08
          );
        });
      } catch (error) {
        console.error('Slide out error:', error);
        resolve();
      }
    });
  }

  private slideCardsIn(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.cardsContainer || !this.isBrowser) {
        resolve();
        return;
      }

      const cards = this.cardsContainer.nativeElement.querySelectorAll('.feature-card');

      try {
        const timeline = gsap.timeline({
          onComplete: () => resolve()
        });

        // Stacked appearance from left
        cards.forEach((card: HTMLElement, index: number) => {
          timeline.fromTo(
            card,
            {
              x: -80,
              y: index * 10, // Stacked
              opacity: 0,
              scale: 0.9,
              rotation: -3
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: 'power3.out'
            },
            index * 0.12 // Smooth stagger
          );
        });
      } catch (error) {
        console.error('Slide in error:', error);
        resolve();
      }
    });
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private startAutoPlay(): void {
    if (!this.isBrowser || this.isHovered) return;

    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      if (this.currentGroup < this.cardGroups.length - 1) {
        this.nextGroup();
      } else {
        this.goToGroup(0);
      }
    }, 7000); // 7 seconds - slower for better UX
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private cleanup(): void {
    this.stopAutoPlay();

    const container = this.cardsContainer?.nativeElement;
    if (container) {
      container.removeEventListener('mouseenter', this.onContainerMouseEnter);
      container.removeEventListener('mouseleave', this.onContainerMouseLeave);
    }
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
      this.scrollTriggerInstance = null;
    }

    if (this.cardsContainer?.nativeElement) {
      gsap.killTweensOf(this.cardsContainer.nativeElement.querySelectorAll('.feature-card'));
    }
  }

  onCardAction(card: FeatureCard): void {
    console.log('Card action:', card.title);
    // Implement navigation
  }
}