import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MenuModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  
  collapsed = false;
  mobileMenuOpen = false;
  currentTheme = 'default';
  
  userMenuItems: MenuItem[] = [];
  notifItems: MenuItem[] = [];
  themeItems: MenuItem[] = [];
  profileItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadSettings();
    this.initMenus();
  }

  loadSettings() {
    const theme = localStorage.getItem('lms-theme') || 'default';
    const sidebarState = localStorage.getItem('lms-sidebar');
    
    this.currentTheme = theme;
    this.collapsed = sidebarState === 'collapsed';
    
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('lms-sidebar', this.collapsed ? 'collapsed' : 'expanded');
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('lms-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.initMenus();
  }

  showQuickAdd() {
    console.log('Quick add clicked');
  }

  initMenus() {
    this.userMenuItems = [
      { label: 'Profile Settings', icon: 'pi pi-user', command: () => this.router.navigate(['/admin/profile']) },
      { label: 'Preferences', icon: 'pi pi-sliders-h' },
      { separator: true },
      { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.router.navigate(['/login']) }
    ];

    this.notifItems = [
      { label: 'New student registered', icon: 'pi pi-user-plus' },
      { label: 'Payment received', icon: 'pi pi-dollar' },
      { label: 'Assignment submitted', icon: 'pi pi-file' },
      { separator: true },
      { label: 'View All Notifications', icon: 'pi pi-arrow-right' }
    ];

    this.themeItems = [
      { 
        label: 'Themes', 
        items: [
          { 
            label: 'Default Blue', 
            icon: 'pi pi-circle-fill', 
            command: () => this.changeTheme('default'),
            styleClass: this.currentTheme === 'default' ? 'active-theme theme-default' : 'theme-default'
          },
          { 
            label: 'Ocean Breeze', 
            icon: 'pi pi-circle-fill', 
            command: () => this.changeTheme('ocean'),
            styleClass: this.currentTheme === 'ocean' ? 'active-theme theme-ocean' : 'theme-ocean'
          },
          { 
            label: 'Purple Dream', 
            icon: 'pi pi-circle-fill', 
            command: () => this.changeTheme('purple'),
            styleClass: this.currentTheme === 'purple' ? 'active-theme theme-purple' : 'theme-purple'
          },
          { 
            label: 'Sunset Glow', 
            icon: 'pi pi-circle-fill', 
            command: () => this.changeTheme('sunset'),
            styleClass: this.currentTheme === 'sunset' ? 'active-theme theme-sunset' : 'theme-sunset'
          },
          { 
            label: 'Emerald Forest', 
            icon: 'pi pi-circle-fill', 
            command: () => this.changeTheme('emerald'),
            styleClass: this.currentTheme === 'emerald' ? 'active-theme theme-emerald' : 'theme-emerald'
          },
          { 
            label: 'Midnight Blue', 
            icon: 'pi pi-circle-fill', 
            command: () => this.changeTheme('midnight'),
            styleClass: this.currentTheme === 'midnight' ? 'active-theme theme-midnight' : 'theme-midnight'
          }
        ]
      }
    ];

    this.profileItems = [
      { label: 'My Profile', icon: 'pi pi-user' },
      { label: 'Account Settings', icon: 'pi pi-cog' },
      { label: 'Billing', icon: 'pi pi-credit-card' },
      { separator: true },
      { label: 'Help & Support', icon: 'pi pi-question-circle' },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.router.navigate(['/login']) }
    ];
  }
}