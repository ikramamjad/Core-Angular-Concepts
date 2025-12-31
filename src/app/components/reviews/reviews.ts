import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { LucideAngularModule, AlertCircle } from 'lucide-angular';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './reviews.html'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];
  isLoading = false;
  error: string | null = null;
  
  readonly icons = {
    alertCircle: AlertCircle
  };

  private destroy$ = new Subject<void>();

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.isLoading = true;
    this.error = null;

    this.reviewService.getActiveReviews()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data) => {
          this.reviews = data;
        },
        error: (err) => {
          this.error = 'Failed to load reviews. Please try again later.';
          console.error('Error fetching reviews:', err);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
