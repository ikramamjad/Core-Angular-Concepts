import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionService } from '../../services/subscription.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.html',
})
export class Footer {
  year: number = new Date().getFullYear();
  subscribeForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubscribe() {
    if (this.subscribeForm.invalid) {
      this.subscribeForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    const email = this.subscribeForm.get('email')?.value;

    this.subscriptionService.subscribe(email)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Subscribed Successfully';
          this.subscribeForm.reset();
          // Clear success message after a few seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Subscription error:', error);
          this.errorMessage = 'Failed.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }
}
