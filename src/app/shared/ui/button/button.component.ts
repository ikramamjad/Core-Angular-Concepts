import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonType = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="htmlType"
      [disabled]="disabled"
      [ngClass]="getClasses()"
      (click)="onClick.emit($event)"
      class="font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
    >
      <ng-content></ng-content>
      {{ label }}
    </button>
  `
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() htmlType: 'button' | 'submit' | 'reset' = 'button';
  
  @Output() onClick = new EventEmitter<MouseEvent>();

  getClasses(): string {
    const baseClasses = {
      'primary': 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      'secondary': 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      'danger': 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      'success': 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
    };

    const sizeClasses = {
      'small': 'px-3 py-1.5 text-sm',
      'medium': 'px-4 py-2 text-base',
      'large': 'px-6 py-3 text-lg'
    };

    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

    return `${baseClasses[this.type]} ${sizeClasses[this.size]} ${disabledClasses}`;
  }
}
