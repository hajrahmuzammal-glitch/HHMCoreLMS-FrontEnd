import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.html',
  styleUrls: ['./stats-section.scss'],
})
export class StatsSectionComponent implements AfterViewInit, OnDestroy {

  @ViewChild('statsSection') private sectionRef!: ElementRef<HTMLElement>;
  @ViewChildren('statCells') private cellRefs!: QueryList<ElementRef<HTMLElement>>;

  private sectionObserver!: IntersectionObserver;
  private hasAnimated = false;

  ngAfterViewInit(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.revealSection();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (this.sectionRef?.nativeElement) {
      this.sectionObserver.observe(this.sectionRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  // ── Reveal section + trigger count-up ──────────────────

  private revealSection(): void {
    const section = this.sectionRef.nativeElement;

    // Add visible class to section (triggers accent line CSS transition)
    section.classList.add('is-visible');

    // Stagger-reveal each stat cell then run count-up
    this.cellRefs.forEach((cellRef, index) => {
      const cell = cellRef.nativeElement;

      setTimeout(() => {
        cell.classList.add('is-visible');

        // Start count-up after cell is visible
        setTimeout(() => {
          const valueEl = cell.querySelector<HTMLElement>('.stat-value');
          if (valueEl) {
            this.animateCountUp(valueEl);
          }
        }, 200);

      }, index * 120);
    });
  }

  // ── Count-up animation ──────────────────────────────────

  private animateCountUp(el: HTMLElement): void {
    const target   = parseInt(el.dataset['target'] ?? '0', 10);
    const suffix   = el.dataset['suffix'] ?? '';
    const duration = 1800; // ms
    const start    = performance.now();

    // For large numbers like 50000 → display as "50k+"
    const format = (value: number): string => {
      if (target >= 1000) {
        return Math.floor(value / 1000) + suffix;
      }
      return Math.floor(value) + suffix;
    };

    const tick = (now: number): void => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = format(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = format(target);
      }
    };

    requestAnimationFrame(tick);
  }
}