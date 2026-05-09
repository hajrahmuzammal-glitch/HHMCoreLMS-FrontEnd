import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ButtonIcon } from "primeng/button";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the signup form with validators
   */
  initializeForm(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Toggle password visibility
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      
      const formData = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      console.log('Signup form data:', formData);

      // TODO: Replace this with your actual signup service
      // Example: this.authService.signup(formData).subscribe(...)
      
      // Simulating API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Account created successfully!');
        // Navigate to login or dashboard after successful signup
        // this.router.navigate(['/login']);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Handle social media signup
   * @param provider - Social media provider (facebook, twitter, linkedin)
   */
  socialSignup(provider: string): void {
    console.log(`Social signup with ${provider}`);
    
    // TODO: Implement your social login logic here
    // Example: this.authService.socialLogin(provider).subscribe(...)
  }

  /**
   * Navigate to login page
   */
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}