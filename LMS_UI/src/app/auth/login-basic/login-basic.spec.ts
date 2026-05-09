import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBasic } from './login-basic';

describe('LoginBasic', () => {
  let component: LoginBasic;
  let fixture: ComponentFixture<LoginBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
