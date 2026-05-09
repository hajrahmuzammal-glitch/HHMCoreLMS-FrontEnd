import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Tooltip } from 'primeng/tooltip';

interface Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  status: 'active' | 'inactive' | 'suspended';
  enrollmentDate: Date;
  avatar?: string;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputText,
    SelectModule,
    Tag,
    ConfirmDialog,
    Toast,
    FormsModule,
    Tooltip
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  selectedStudents: Student[] = [];
  
  // Filters
  searchValue: string = '';
  statusFilter: any = null;
  departmentFilter: any = null;

  statusOptions = [
    { label: 'All Status', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Suspended', value: 'suspended' }
  ];

  departmentOptions = [
    { label: 'All Departments', value: null },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Business Administration', value: 'Business Administration' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Medicine', value: 'Medicine' },
    { label: 'Arts & Humanities', value: 'Arts & Humanities' }
  ];

  loading: boolean = true;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    // Simulate API call
    setTimeout(() => {
      this.students = this.getMockStudents();
      this.loading = false;
    }, 1000);
  }

  getMockStudents(): Student[] {
    return [
      {
        id: 1,
        studentId: 'STU2024001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu',
        phone: '+1 234-567-8901',
        department: 'Computer Science',
        semester: 4,
        status: 'active',
        enrollmentDate: new Date('2022-09-01')
      },
      {
        id: 2,
        studentId: 'STU2024002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@university.edu',
        phone: '+1 234-567-8902',
        department: 'Business Administration',
        semester: 6,
        status: 'active',
        enrollmentDate: new Date('2021-09-01')
      },
      {
        id: 3,
        studentId: 'STU2024003',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.j@university.edu',
        phone: '+1 234-567-8903',
        department: 'Engineering',
        semester: 2,
        status: 'inactive',
        enrollmentDate: new Date('2023-09-01')
      },
      {
        id: 4,
        studentId: 'STU2024004',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.w@university.edu',
        phone: '+1 234-567-8904',
        department: 'Medicine',
        semester: 8,
        status: 'active',
        enrollmentDate: new Date('2020-09-01')
      },
      {
        id: 5,
        studentId: 'STU2024005',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.b@university.edu',
        phone: '+1 234-567-8905',
        department: 'Arts & Humanities',
        semester: 3,
        status: 'suspended',
        enrollmentDate: new Date('2023-01-15')
      },
      // Add more mock students
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 6,
        studentId: `STU2024${String(i + 6).padStart(3, '0')}`,
        firstName: `Student${i + 6}`,
        lastName: `Last${i + 6}`,
        email: `student${i + 6}@university.edu`,
        phone: `+1 234-567-89${String(i + 6).padStart(2, '0')}`,
        department: this.departmentOptions[Math.floor(Math.random() * 5) + 1].value!,
        semester: Math.floor(Math.random() * 8) + 1,
        status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'suspended',
        enrollmentDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1)
      }))
    ];
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warn';
      case 'suspended':
        return 'danger';
      default:
        return 'warn';
    }
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  viewStudent(student: Student) {
    this.router.navigate(['/admin/students/view', student.id]);
  }

  editStudent(student: Student) {
    this.router.navigate(['/admin/students/edit', student.id]);
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Perform delete operation
        this.students = this.students.filter(s => s.id !== student.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Student deleted successfully'
        });
      }
    });
  }

  deleteSelectedStudents() {
    if (this.selectedStudents.length === 0) return;

    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.selectedStudents.length} students?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids = this.selectedStudents.map(s => s.id);
        this.students = this.students.filter(s => !ids.includes(s.id));
        this.selectedStudents = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${ids.length} students deleted successfully`
        });
      }
    });
  }

  exportToCSV() {
    this.messageService.add({
      severity: 'info',
      summary: 'Export',
      detail: 'Exporting to CSV...'
    });
    // Implement CSV export logic
  }

  addNewStudent() {
    this.router.navigate(['/admin/students/add']);
  }
}