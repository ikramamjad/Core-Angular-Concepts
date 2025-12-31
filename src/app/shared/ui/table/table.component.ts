import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronLeft, ChevronRight } from 'lucide-angular';

export interface Column {
  key: string;
  label: string;
  template?: boolean; // If true, allows custom template projection (advanced) - sticking to basic for now
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Search Bar -->
      <div class="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div class="relative w-full max-w-xs">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <lucide-icon [img]="Search" class="h-5 w-5 text-gray-400"></lucide-icon>
          </div>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchTermChange()"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search..."
          />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                *ngFor="let col of columns"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let row of displayedData" class="hover:bg-gray-50 transition-colors">
              <td
                *ngFor="let col of columns"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                <!-- Simple text binding for now. Can be enhanced with Templates later -->
                {{ row[col.key] }}
              </td>
            </tr>
            <tr *ngIf="displayedData.length === 0">
              <td [attr.colspan]="columns.length" class="px-6 py-12 text-center text-gray-500">
                No data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ startIndex + 1 }}</span>
              to
              <span class="font-medium">{{ endIndex }}</span>
              of
              <span class="font-medium">{{ totalItems }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                (click)="changePage(currentPage - 1)"
                [disabled]="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <lucide-icon [img]="ChevronLeft" class="h-5 w-5"></lucide-icon>
              </button>
              
              <!-- Simple Page Numbers -->
              <ng-container *ngFor="let page of pages">
                 <button
                  (click)="changePage(page)"
                  [class.bg-blue-50]="page === currentPage"
                  [class.text-blue-600]="page === currentPage"
                  [class.border-blue-500]="page === currentPage"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {{ page }}
                </button>
              </ng-container>

              <button
                (click)="changePage(currentPage + 1)"
                [disabled]="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <lucide-icon [img]="ChevronRight" class="h-5 w-5"></lucide-icon>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TableComponent implements OnChanges {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  // Icons
  readonly Search = Search;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  // Internal State
  searchTerm: string = '';
  currentPage: number = 1;
  displayedData: any[] = [];
  
  // Computed
  get totalItems(): number { return this.filteredData.length; }
  get totalPages(): number { return Math.ceil(this.totalItems / this.pageSize); }
  get startIndex(): number { return (this.currentPage - 1) * this.pageSize; }
  get endIndex(): number { return Math.min(this.startIndex + this.pageSize, this.totalItems); }
  get pages(): number[] {
    // Simple pagination logic: show all pages (can be improved for large datasets)
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private filteredData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.filterAndPaginate();
    }
  }

  onSearchTermChange() {
    this.search.emit(this.searchTerm);
    this.currentPage = 1; // Reset to first page on search
    this.filterAndPaginate();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
      this.updateDisplayedData();
    }
  }

  private filterAndPaginate() {
    // Client-side filtering
    if (!this.searchTerm) {
      this.filteredData = this.data;
    } else {
      const lowerTerm = this.searchTerm.toLowerCase();
      this.filteredData = this.data.filter(item => {
        return this.columns.some(col => {
          const val = item[col.key];
          return val ? String(val).toLowerCase().includes(lowerTerm) : false;
        });
      });
    }
    this.updateDisplayedData();
  }

  private updateDisplayedData() {
    this.displayedData = this.filteredData.slice(this.startIndex, this.endIndex);
  }
}
