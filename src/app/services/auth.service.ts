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
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'currentUser';
  private readonly SECRET = 'cuboid-secret';

  constructor() {
    // Check localStorage on init to persist session
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  async login(email: string) {
    const user: User = { email, name: email.split('@')[0] };
    const token = await this.generateJwt({
      sub: email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    });
    this.currentUser.set(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
    this.toastService.show('Successfully logged in!', 'success');
    this.router.navigate(['/dashboard']);
  }

  async register(email: string) {
    const user: User = { email, name: email.split('@')[0] };
    const token = await this.generateJwt({
      sub: email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    });
    this.currentUser.set(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
    this.toastService.show('Account created successfully!', 'success');
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.toastService.show('You have been logged out.', 'info');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;
    const payload = this.decodeJwtPayload(token);
    if (!payload) return false;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now >= payload.exp) {
      this.logout();
      return false;
    }
    return this.currentUser() !== null;
  }

  private async generateJwt(payload: Record<string, any>): Promise<string> {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(signingInput)
    );
    const encodedSignature = this.base64UrlEncodeBytes(signature);
    return `${signingInput}.${encodedSignature}`;
  }

  private base64UrlEncode(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    const base64 = btoa(binary);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private base64UrlEncodeBytes(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach(b => binary += String.fromCharCode(b));
    const base64 = btoa(binary);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private decodeJwtPayload(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const pad = base64.length % 4 ? '='.repeat(4 - (base64.length % 4)) : '';
      const decoded = atob(base64 + pad);
      const bytes = Uint8Array.from(decoded.split('').map(c => c.charCodeAt(0)));
      const json = new TextDecoder().decode(bytes);
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
