import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Moon, Sun, Code2, LogOut } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterModule, CommonModule],
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string = '';
  @Input() isDarkMode: boolean = true;
  @Output() themeToggled = new EventEmitter<void>();

  authService = inject(AuthService);

  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Code2 = Code2;
  readonly LogOut = LogOut;

  logout() {
    this.authService.logout();
  }
}
