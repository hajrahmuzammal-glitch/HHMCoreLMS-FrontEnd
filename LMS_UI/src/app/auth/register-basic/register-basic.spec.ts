import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBasic } from './register-basic';

describe('RegisterBasic', () => {
  let component: RegisterBasic;
  let fixture: ComponentFixture<RegisterBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
