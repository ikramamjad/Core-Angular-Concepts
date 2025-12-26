import { Component, signal, effect, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, ToastComponent],
  templateUrl: './app.html',
})
export class App {
  title = 'Angular Fundamentals';
  isDarkMode = signal(true); // Default to dark mode
  private renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }
}
