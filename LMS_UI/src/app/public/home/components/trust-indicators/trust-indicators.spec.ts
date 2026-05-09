import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustIndicators } from './trust-indicators';

describe('TrustIndicators', () => {
  let component: TrustIndicators;
  let fixture: ComponentFixture<TrustIndicators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustIndicators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustIndicators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
