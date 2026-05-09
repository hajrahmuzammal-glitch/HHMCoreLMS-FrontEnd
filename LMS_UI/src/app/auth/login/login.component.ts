import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  rememberMe = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkRememberedUser();
  }

  /**
   * Initialize the login form with validators
   */
  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  /**
   * Check if user email is saved in localStorage
   */
  checkRememberedUser(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.loginForm.patchValue({
        email: rememberedEmail,
        rememberMe: true
      });
      this.rememberMe = true;
    }
  }

  /**
   * Toggle password visibility
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle remember me checkbox
   */
  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
    this.loginForm.patchValue({ rememberMe: this.rememberMe });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      };

      // Save email if remember me is checked
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log('Login form data:', formData);
      
      // TODO: Replace this with your actual login service
      // Example: this.authService.login(formData).subscribe(...)
      
      // Simulating API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Login successful!');
        // Navigate to dashboard after successful login
        // this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Handle social media login
   * @param provider - Social media provider (facebook, google, linkedin)
   */
  socialLogin(provider: string): void {
    console.log(`Social login with ${provider}`);
    
    // TODO: Implement your social login logic here
    // Example: this.authService.socialLogin(provider).subscribe(...)
  }

  /**
   * Navigate to register page
   */
  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Navigate to forgot password page
   */
  navigateToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }
}