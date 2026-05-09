import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  duration: string;
  level: string;
  image: string;
  description: string;
  lessons: number;
  language: string;
  certificate: boolean;
}

interface FilterOptions {
  search: string;
  category: string;
  level: string;
  priceRange: number[];
  sortBy: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    SliderModule
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  // All courses
  allCourses: Course[] = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      category: 'Development',
      instructor: 'John Doe',
      rating: 4.8,
      students: 12543,
      price: 49.99,
      duration: '40 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&q=80',
      description: 'Master web development from scratch with HTML, CSS, JavaScript, and modern frameworks.',
      lessons: 156,
      language: 'English',
      certificate: true
    },
    {
      id: 2,
      title: 'Advanced JavaScript & React',
      category: 'Development',
      instructor: 'Sarah Smith',
      rating: 4.9,
      students: 8932,
      price: 59.99,
      duration: '35 hours',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&q=80',
      description: 'Deep dive into advanced JavaScript concepts and React development.',
      lessons: 142,
      language: 'English',
      certificate: true
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      category: 'Marketing',
      instructor: 'Mike Johnson',
      rating: 4.7,
      students: 10234,
      price: 44.99,
      duration: '28 hours',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&q=80',
      description: 'Learn SEO, social media marketing, content strategy, and analytics.',
      lessons: 98,
      language: 'English',
      certificate: true
    },
    {
      id: 4,
      title: 'Data Science & Machine Learning',
      category: 'Data Science',
      instructor: 'Dr. Emily Chen',
      rating: 4.9,
      students: 15678,
      price: 69.99,
      duration: '50 hours',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=80',
      description: 'Master Python, data analysis, machine learning, and AI fundamentals.',
      lessons: 201,
      language: 'English',
      certificate: true
    },
    {
      id: 5,
      title: 'UI/UX Design Fundamentals',
      category: 'Design',
      instructor: 'Alex Turner',
      rating: 4.8,
      students: 9456,
      price: 54.99,
      duration: '32 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&q=80',
      description: 'Learn user-centered design, prototyping, and design thinking principles.',
      lessons: 124,
      language: 'English',
      certificate: true
    },
    {
      id: 6,
      title: 'Business Strategy & Management',
      category: 'Business',
      instructor: 'Robert Williams',
      rating: 4.6,
      students: 7821,
      price: 39.99,
      duration: '25 hours',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&q=80',
      description: 'Strategic planning, leadership, and business operations management.',
      lessons: 89,
      language: 'English',
      certificate: true
    },
    {
      id: 7,
      title: 'Python Programming Complete Course',
      category: 'Development',
      instructor: 'David Lee',
      rating: 4.7,
      students: 11234,
      price: 49.99,
      duration: '38 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop&q=80',
      description: 'Learn Python from basics to advanced concepts including OOP and frameworks.',
      lessons: 167,
      language: 'English',
      certificate: true
    },
    {
      id: 8,
      title: 'Graphic Design Masterclass',
      category: 'Design',
      instructor: 'Jessica Brown',
      rating: 4.8,
      students: 8765,
      price: 52.99,
      duration: '30 hours',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop&q=80',
      description: 'Master Adobe Creative Suite, typography, color theory, and visual design.',
      lessons: 112,
      language: 'English',
      certificate: true
    },
    {
      id: 9,
      title: 'Financial Analysis & Modeling',
      category: 'Business',
      instructor: 'Thomas Anderson',
      rating: 4.7,
      students: 6543,
      price: 64.99,
      duration: '42 hours',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&q=80',
      description: 'Excel modeling, financial statements, valuation, and investment analysis.',
      lessons: 156,
      language: 'English',
      certificate: true
    },
    {
      id: 10,
      title: 'Content Marketing Strategy',
      category: 'Marketing',
      instructor: 'Laura Martinez',
      rating: 4.6,
      students: 5432,
      price: 42.99,
      duration: '22 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&q=80',
      description: 'Create compelling content, build audience, and drive engagement.',
      lessons: 78,
      language: 'English',
      certificate: true
    },
    {
      id: 11,
      title: 'Cloud Computing with AWS',
      category: 'Development',
      instructor: 'Kevin Zhang',
      rating: 4.9,
      students: 9876,
      price: 74.99,
      duration: '45 hours',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&q=80',
      description: 'Master AWS services, cloud architecture, and deployment strategies.',
      lessons: 189,
      language: 'English',
      certificate: true
    },
    {
      id: 12,
      title: 'Mobile App Development with Flutter',
      category: 'Development',
      instructor: 'Maria Garcia',
      rating: 4.8,
      students: 7654,
      price: 59.99,
      duration: '36 hours',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&q=80',
      description: 'Build beautiful cross-platform mobile apps with Flutter and Dart.',
      lessons: 134,
      language: 'English',
      certificate: true
    }
  ];

  // Filtered courses
  filteredCourses: Course[] = [];
  
  // Filter options
  filters: FilterOptions = {
    search: '',
    category: '',
    level: '',
    priceRange: [0, 100],
    sortBy: 'popular'
  };

  // Dropdown options
  categories: any[] = [
    { label: 'All Categories', value: '' },
    { label: 'Development', value: 'Development' },
    { label: 'Design', value: 'Design' },
    { label: 'Business', value: 'Business' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Data Science', value: 'Data Science' }
  ];

  levels: any[] = [
    { label: 'All Levels', value: '' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' }
  ];

  sortOptions: any[] = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' }
  ];

  ngOnInit() {
    this.filteredCourses = [...this.allCourses];
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.allCourses];

    // Search filter
    if (this.filters.search) {
      const searchLower = this.filters.search.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (this.filters.category) {
      result = result.filter(course => course.category === this.filters.category);
    }

    // Level filter
    if (this.filters.level) {
      result = result.filter(course => course.level === this.filters.level);
    }

    // Price range filter
    result = result.filter(course =>
      course.price >= this.filters.priceRange[0] &&
      course.price <= this.filters.priceRange[1]
    );

    // Sorting
    switch (this.filters.sortBy) {
      case 'popular':
        result.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
    }

    this.filteredCourses = result;
  }

  clearFilters() {
    this.filters = {
      search: '',
      category: '',
      level: '',
      priceRange: [0, 100],
      sortBy: 'popular'
    };
    this.applyFilters();
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
}