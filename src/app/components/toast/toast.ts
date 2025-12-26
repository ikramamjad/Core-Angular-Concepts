import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { LucideAngularModule, CheckCircle, AlertCircle, Info, X } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <div *ngFor="let toast of toastService.toasts()"
           class="pointer-events-auto min-w-[300px] p-4 rounded-lg shadow-lg border backdrop-blur-md animate-slide-in-right transition-all duration-300 flex items-start gap-3"
           [ngClass]="{
             'bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100': toast.type === 'success',
             'bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100': toast.type === 'error',
             'bg-blue-50/90 dark:bg-blue-900/90 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-100': toast.type === 'info'
           }">
        
        <lucide-icon [img]="getIcon(toast.type)" class="w-5 h-5 mt-0.5 flex-shrink-0"></lucide-icon>
        
        <div class="flex-1">
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>

        <button (click)="toastService.remove(toast.id)" class="text-current opacity-70 hover:opacity-100 transition-opacity">
          <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slide-in-right {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in-right {
      animation: slide-in-right 0.3s ease-out forwards;
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
  
  readonly X = X;
  readonly CheckCircle = CheckCircle;
  readonly AlertCircle = AlertCircle;
  readonly Info = Info;

  getIcon(type: string) {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  }
}
