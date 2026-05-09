import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-basic.html',
  styleUrls: ['./login-basic.scss']
})
export class BasicLoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private backgroundParticles: BackgroundParticle[] = [];
  private animationId: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.createParticles();
    this.createBackgroundParticles();
    this.animate();
    this.setupMouseTracking();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
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
   * Initialize canvas for particle animation
   */
  initCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /**
   * Resize canvas to match window size
   */
  resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Create main interactive particle system
   */
  createParticles(): void {
    const particleCount = 100;
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  /**
   * Create background ambient particles
   */
  createBackgroundParticles(): void {
    const bgParticleCount = 150;
    this.backgroundParticles = [];
    
    for (let i = 0; i < bgParticleCount; i++) {
      this.backgroundParticles.push(new BackgroundParticle(this.canvas.width, this.canvas.height));
    }
  }

  /**
   * Setup mouse tracking for interactive effects
   */
  setupMouseTracking(): void {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  /**
   * Animation loop
   */
  animate(): void {
    this.ctx.fillStyle = 'rgba(0, 27, 72, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawAmbientLights();

    this.backgroundParticles.forEach((particle, index) => {
      particle.update(this.mouseX, this.mouseY);
      particle.draw(this.ctx);

      for (let j = index + 1; j < this.backgroundParticles.length; j++) {
        const dx = this.backgroundParticles[j].x - particle.x;
        const dy = this.backgroundParticles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.3;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(this.backgroundParticles[j].x, this.backgroundParticles[j].y);
          this.ctx.stroke();
        }
      }
    });

    this.particles.forEach((particle, index) => {
      particle.update(this.mouseX, this.mouseY);
      particle.draw(this.ctx);

      for (let j = index + 1; j < this.particles.length; j++) {
        const dx = this.particles[j].x - particle.x;
        const dy = this.particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 107, 53, ${0.2 * (1 - distance / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Draw ambient light spots
   */
  drawAmbientLights(): void {
    const lights = [
      { x: this.canvas.width * 0.1, y: this.canvas.height * 0.15, radius: 200, color: 'rgba(0, 78, 137, 0.08)' },
      { x: this.canvas.width * 0.9, y: this.canvas.height * 0.2, radius: 250, color: 'rgba(59, 130, 246, 0.06)' },
      { x: this.canvas.width * 0.15, y: this.canvas.height * 0.85, radius: 220, color: 'rgba(255, 107, 53, 0.05)' },
      { x: this.canvas.width * 0.85, y: this.canvas.height * 0.8, radius: 240, color: 'rgba(59, 130, 246, 0.07)' },
    ];

    lights.forEach(light => {
      const gradient = this.ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
      gradient.addColorStop(0, light.color);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(light.x - light.radius, light.y - light.radius, light.radius * 2, light.radius * 2);
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
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      };

      console.log('Login credentials:', credentials);
      
      // TODO: Replace with actual authentication service
      // Example: this.authService.login(credentials).subscribe(...)
      
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
   */
  socialLogin(provider: string): void {
    console.log(`Social login with ${provider}`);
    // TODO: Implement social login logic
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
  forgotPassword(): void {
    console.log('Forgot password clicked');
    // TODO: Navigate to forgot password page
    // this.router.navigate(['/auth/forgot-password']);
  }
}

/**
 * Main interactive Particle class
 */
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseX: number;
  baseY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    
    const colors = ['rgba(255, 107, 53, 0.8)', 'rgba(0, 78, 137, 0.8)', 'rgba(255, 210, 63, 0.6)'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouseX: number, mouseY: number): void {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = 150;
    const force = (maxDistance - distance) / maxDistance;

    if (distance < maxDistance) {
      this.x -= forceDirectionX * force * 3;
      this.y -= forceDirectionY * force * 3;
    } else {
      this.x += (this.baseX - this.x) * 0.02;
      this.y += (this.baseY - this.y) * 0.02;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/**
 * Background Particle class
 */
class BackgroundParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    const edge = Math.random();
    if (edge < 0.25) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * (canvasHeight * 0.3);
    } else if (edge < 0.5) {
      this.x = Math.random() * canvasWidth;
      this.y = canvasHeight * 0.7 + Math.random() * (canvasHeight * 0.3);
    } else if (edge < 0.75) {
      this.x = Math.random() * (canvasWidth * 0.25);
      this.y = Math.random() * canvasHeight;
    } else {
      this.x = canvasWidth * 0.75 + Math.random() * (canvasWidth * 0.25);
      this.y = Math.random() * canvasHeight;
    }

    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.size = Math.random() * 1.5 + 0.5;
    
    const colors = [
      'rgba(59, 130, 246, 0.3)',
      'rgba(0, 78, 137, 0.4)',
      'rgba(151, 202, 216, 0.25)',
      'rgba(255, 107, 53, 0.2)'
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouseX: number, mouseY: number): void {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = 200;
    const force = (maxDistance - distance) / maxDistance;

    if (distance < maxDistance) {
      this.x -= forceDirectionX * force * 1.5;
      this.y -= forceDirectionY * force * 1.5;
    } else {
      this.x += (this.baseX - this.x) * 0.01;
      this.y += (this.baseY - this.y) * 0.01;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}