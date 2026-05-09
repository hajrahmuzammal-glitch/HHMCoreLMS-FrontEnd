import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero';
import { TrustIndicators } from './components/trust-indicators/trust-indicators';
import { AboutSection } from './components/about-section/about-section';
import { StatsSectionComponent } from './components/stats-section/stats-section';
import { CoursesSection } from './components/courses-section/courses-section';
import { FeaturesSectionComponent } from './components/features-section/features-section';
import { Testimonials } from './components/testimonials/testimonials';
import { CtaSection } from './components/cta-section/cta-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    TrustIndicators,
    AboutSection,
    StatsSectionComponent,
    CoursesSection,
    FeaturesSectionComponent,
    Testimonials,
    CtaSection
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}