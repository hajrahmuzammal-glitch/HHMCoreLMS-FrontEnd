import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'pi-facebook', url: '#', label: 'Facebook' },
    { icon: 'pi-twitter', url: '#', label: 'Twitter' },
    { icon: 'pi-linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'pi-instagram', url: '#', label: 'Instagram' },
    { icon: 'pi-youtube', url: '#', label: 'YouTube' }
  ];

  quickLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'All Courses', route: '/courses' },
    { label: 'Instructors', route: '/instructors' },
    { label: 'Events', route: '/events' },
    { label: 'Blog', route: '/blog' }
  ];

  supportLinks = [
    { label: 'Help Center', route: '/help' },
    { label: 'FAQs', route: '/faq' },
    { label: 'Terms of Service', route: '/terms' },
    { label: 'Privacy Policy', route: '/privacy' },
    { label: 'Contact Us', route: '/contact' }
  ];

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}