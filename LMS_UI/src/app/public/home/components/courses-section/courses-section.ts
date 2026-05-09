import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  id: number;
  title: string;
  description: string;
  categoryLabel: string;
  instructor: string;
  instructorInitials: string;
  avatarClass: string;
  imageUrl: string;
  imageAlt: string;
  badge: string;
  badgeClass: string;
  lessons: number;
  duration: string;
  enrolled: string;
  rating: number;
  ratingLabel: string;
  price: string;
  originalPrice?: string;
  isFree: boolean;
  isFeatured: boolean;
  tags: string[];
}

export interface FilterTab {
  label: string;
  value: string;
}

@Component({
  selector: 'app-courses-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-section.html',
  styleUrls: ['./courses-section.scss'],
})
export class CoursesSection implements OnInit, AfterViewInit, OnDestroy {

  readonly tabs: FilterTab[] = [
    { label: 'All Courses',  value: 'all'         },
    { label: 'Design',       value: 'design'      },
    { label: 'Development',  value: 'development' },
    { label: 'Business',     value: 'business'    },
    { label: 'Data Science', value: 'data'        },
    { label: 'Free',         value: 'free'        },
  ];

  readonly activeFilter = signal<string>('all');

  readonly allCourses: Course[] = [
    {
      id: 1,
      title: 'UI/UX Design Masterclass: From Concept to Prototype',
      description: 'Master Figma, design systems, user research and interaction design with real-world projects.',
      categoryLabel: 'Design',
      instructor: 'Sarah Rodriguez', instructorInitials: 'SR', avatarClass: 'av-1',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      imageAlt: 'UI/UX design wireframes on a screen',
      badge: 'Bestseller', badgeClass: 'badge--accent',
      lessons: 42, duration: '18h 30m', enrolled: '4.2k',
      rating: 5, ratingLabel: '4.9',
      price: '$89', originalPrice: '$149', isFree: false, isFeatured: true,
      tags: ['design'],
    },
    {
      id: 2,
      title: 'Full-Stack Web Development with React & Node.js',
      description: 'Build production-ready web applications from front to back with modern JavaScript.',
      categoryLabel: 'Development',
      instructor: 'James Kim', instructorInitials: 'JK', avatarClass: 'av-2',
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80',
      imageAlt: 'Code editor with JavaScript on screen',
      badge: '🔥 Hot', badgeClass: 'badge--hot',
      lessons: 78, duration: '36h', enrolled: '8.7k',
      rating: 4, ratingLabel: '4.7',
      price: '$129', originalPrice: '$199', isFree: false, isFeatured: false,
      tags: ['development'],
    },
    {
      id: 3,
      title: 'Data Science & Machine Learning with Python',
      description: 'From NumPy to deep learning — build real models and analyze complex datasets.',
      categoryLabel: 'Data Science',
      instructor: 'Aisha Patel', instructorInitials: 'AP', avatarClass: 'av-4',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      imageAlt: 'Data charts and graphs on a laptop',
      badge: 'Certificate', badgeClass: '',
      lessons: 95, duration: '44h', enrolled: '12k',
      rating: 5, ratingLabel: '4.9',
      price: '$109', originalPrice: '$179', isFree: false, isFeatured: false,
      tags: ['data'],
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy: SEO, Ads & Content',
      description: 'Drive growth with proven marketing strategies, analytics, and brand building.',
      categoryLabel: 'Business',
      instructor: 'Marcus Lee', instructorInitials: 'ML', avatarClass: 'av-3',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      imageAlt: 'Marketing analytics dashboard on a laptop',
      badge: 'New', badgeClass: 'badge--success',
      lessons: 54, duration: '22h', enrolled: '6.1k',
      rating: 4, ratingLabel: '4.6',
      price: '$69', originalPrice: '$119', isFree: false, isFeatured: false,
      tags: ['business'],
    },
    {
      id: 5,
      title: 'Git & GitHub for Beginners: Version Control Essentials',
      description: 'Learn branching, merging, pull requests and collaboration workflows from scratch.',
      categoryLabel: 'Development',
      instructor: 'Tyler Chen', instructorInitials: 'TC', avatarClass: 'av-5',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80',
      imageAlt: 'Terminal window with Git commands',
      badge: 'Free', badgeClass: 'badge--success',
      lessons: 18, duration: '5h 45m', enrolled: '21k',
      rating: 5, ratingLabel: '4.8',
      price: 'Free', isFree: true, isFeatured: true,
      tags: ['development', 'free'],
    },
    {
      id: 6,
      title: 'Brand Identity Design: Logo to Full Visual System',
      description: 'Create cohesive brand identities from typography and color to full style guides.',
      categoryLabel: 'Design',
      instructor: 'Elena Walsh', instructorInitials: 'EW', avatarClass: 'av-6',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
      imageAlt: 'Brand identity design mood board',
      badge: 'Advanced', badgeClass: '',
      lessons: 61, duration: '28h', enrolled: '3.8k',
      rating: 4, ratingLabel: '4.7',
      price: '$99', originalPrice: '$159', isFree: false, isFeatured: false,
      tags: ['design'],
    },
  ];

  readonly filteredCourses = computed(() => {
    const f = this.activeFilter();
    if (f === 'all') return this.allCourses;
    return this.allCourses.filter(c => c.tags.includes(f));
  });

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  isActiveFilter(value: string): boolean {
    return this.activeFilter() === value;
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
    setTimeout(() => this.observeCards(), 60);
  }

  trackById(_index: number, course: Course): number {
    return course.id;
  }

  @ViewChildren('courseCard') cardRefs!: QueryList<ElementRef<HTMLElement>>;
  private observer!: IntersectionObserver;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initObserver();
    this.observeCards();
    this.cardRefs.changes.subscribe(() => this.observeCards());
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
  }

  private observeCards(): void {
    this.cardRefs?.forEach(ref => {
      ref.nativeElement.classList.remove('is-visible');
      this.observer.observe(ref.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onEnroll(course: Course): void {
    console.log('Enroll:', course.title);
    // e.g. this.router.navigate(['/courses', course.id])
  }

  onBrowseAll(): void {
    console.log('Browse all');
    // e.g. this.router.navigate(['/courses'])
  }

  onCardKeydown(event: KeyboardEvent, course: Course): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onEnroll(course);
    }
  }
}