import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from '../home/home';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Home],
  template: `
    <div class="space-y-6">
      <div class="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p class="text-slate-600 dark:text-slate-400">Welcome to your dashboard. Here are the Angular Fundamentals.</p>
      </div>
      <app-home></app-home>
    </div>
  `,
})
export class Dashboard {}
