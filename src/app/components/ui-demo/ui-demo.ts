import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { TableComponent, Column } from '../../shared/ui/table/table.component';

@Component({
  selector: 'app-ui-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent, TableComponent],
  templateUrl: './ui-demo.html'
})
export class UiDemoComponent {
  // Modal State
  isModalOpen = false;

  // Table Config
  tableColumns: Column[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'email', label: 'Email' }
  ];

  tableData = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', role: 'Editor', status: 'Active', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', role: 'User', status: 'Pending', email: 'alice@example.com' },
    { id: 5, name: 'Charlie Wilson', role: 'Admin', status: 'Active', email: 'charlie@example.com' },
    { id: 6, name: 'Eva Davis', role: 'User', status: 'Active', email: 'eva@example.com' },
    { id: 7, name: 'Frank Miller', role: 'Editor', status: 'Inactive', email: 'frank@example.com' },
    { id: 8, name: 'Grace Taylor', role: 'User', status: 'Active', email: 'grace@example.com' },
    { id: 9, name: 'Henry Anderson', role: 'User', status: 'Pending', email: 'henry@example.com' },
    { id: 10, name: 'Ivy Thomas', role: 'Admin', status: 'Active', email: 'ivy@example.com' },
    { id: 11, name: 'Jack White', role: 'User', status: 'Active', email: 'jack@example.com' },
    { id: 12, name: 'Kelly Martin', role: 'Editor', status: 'Inactive', email: 'kelly@example.com' }
  ];

  log(message: string) {
    console.log(message);
  }

  handleModalAction(action: string) {
    console.log('Modal Action:', action);
    if (action === 'confirm') {
      alert('Confirmed!');
    }
    this.isModalOpen = false;
  }
}
