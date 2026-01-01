import { Component, OnInit } from '@angular/core';
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
export class UiDemoComponent implements OnInit {
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

  tableData: any[] = [];

  private nextId = 1;
  private readonly STORAGE_KEY = 'tableData';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      try {
        this.tableData = JSON.parse(savedData);
        // Recalculate nextId based on max id in stored data
        if (this.tableData.length > 0) {
           const maxId = Math.max(...this.tableData.map(d => d.id || 0));
           this.nextId = maxId + 1;
        }
      } catch (e) {
        console.error('Error parsing stored data', e);
        this.initializeDefaultData();
      }
    } else {
      this.initializeDefaultData();
    }
  }

  initializeDefaultData() {
    this.tableData = [
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
    this.nextId = this.tableData.length + 1;
    // Optionally save default data so it persists next time? 
    // The requirement says "add data... save to local storage", "load saved data".
    // It doesn't explicitly say "save default data". But it's good practice.
    // However, if we save default data immediately, we can't test "empty state" easily.
    // Let's NOT save default data automatically to localStorage, but we use it if localStorage is empty.
  }

  saveData() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tableData));
  }

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
  
  handleDelete(row: any) {
    if (confirm(`Are you sure you want to delete ${row.name}?`)) {
      this.tableData = this.tableData.filter(item => item.id !== row.id);
      this.saveData();
      this.log(`Deleted row: ${row.id}`);
    }
  }

  addDataForButton(kind: 'primary' | 'secondary' | 'success' | 'danger') {
    const presets = {
      primary: {
        name: 'Primary Action Item',
        role: 'Admin',
        status: 'Active',
        email: 'primary.action@example.com'
      },
      secondary: {
        name: 'Secondary Navigation Entry',
        role: 'User',
        status: 'Queued',
        email: 'secondary.nav@example.com'
      },
      success: {
        name: 'Success Job Result',
        role: 'Service',
        status: 'Success',
        email: 'success@system.local'
      },
      danger: {
        name: 'Danger Operation Alert',
        role: 'Security',
        status: 'Critical',
        email: 'alert@security.local'
      }
    } as const;

    const preset = presets[kind];
    const newRow = {
      id: this.nextId++,
      name: preset.name,
      role: preset.role,
      status: preset.status,
      email: preset.email
    };

    // 1. Save to local storage (Requirement: "first save that data to browser local storage")
    // Wait, requirement says: "first save that data to browser local storage. 2. After saving... add the data row to the table"
    // This implies we should maybe construct the new list, save it, then update the view.
    
    const updatedData = [newRow, ...this.tableData];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    
    // 2. Add data row to table
    this.tableData = updatedData;
    
    this.log(`${kind} data added: ${newRow.name}`);
  }
}
