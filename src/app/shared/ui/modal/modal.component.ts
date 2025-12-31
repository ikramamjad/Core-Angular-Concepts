import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule, X } from 'lucide-angular';

export interface ModalButton {
  label: string;
  action: string;
  type?: 'primary' | 'secondary' | 'danger' | 'success';
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" (click)="close()"></div>

      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          
          <!-- Header -->
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-xl font-semibold leading-6 text-gray-900" id="modal-title">{{ title }}</h3>
                  <button (click)="close()" class="text-gray-400 hover:text-gray-500 transition-colors">
                    <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>
                  </button>
                </div>
                
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ content }}
                  </p>
                  <ng-content></ng-content>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer (Buttons) -->
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
            <ng-container *ngFor="let btn of buttons">
              <app-button
                [label]="btn.label"
                [type]="btn.type || 'primary'"
                (onClick)="onAction(btn.action)"
                class="w-full sm:w-auto"
              ></app-button>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() buttons: ModalButton[] = [];
  
  @Output() action = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<void>();

  readonly X = X;

  onAction(actionType: string) {
    this.action.emit(actionType);
  }

  close() {
    this.closeEvent.emit();
  }
}
