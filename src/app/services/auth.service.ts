import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

export interface User {
  email: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use a signal to track the current user. null means not logged in.
  currentUser = signal<User | null>(null);
  
  private router = inject(Router);
  private toastService = inject(ToastService);

  constructor() {
    // Check localStorage on init to persist session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(email: string) {
    // Simulate API call
    const user: User = { email, name: email.split('@')[0] };
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.toastService.show('Successfully logged in!', 'success');
    this.router.navigate(['/dashboard']);
  }

  register(email: string) {
    // Simulate API call
    const user: User = { email, name: email.split('@')[0] };
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.toastService.show('Account created successfully!', 'success');
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.toastService.show('You have been logged out.', 'info');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }
}
