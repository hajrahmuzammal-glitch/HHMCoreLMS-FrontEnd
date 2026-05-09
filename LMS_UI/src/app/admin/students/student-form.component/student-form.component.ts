import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { DatePicker} from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Card,
    InputText,
    TextareaModule,
    Select,
    DatePicker,
    ButtonModule,
    // FileUpload,
    Toast,
    FormsModule,
    TooltipModule,
  ],
  providers: [MessageService],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  studentId: string | null = null;
  loading: boolean = false;
  maxDate: Date = new Date();
  // Dropdown Options
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  departmentOptions = [
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Business Administration', value: 'Business Administration' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Medicine', value: 'Medicine' },
    { label: 'Arts & Humanities', value: 'Arts & Humanities' },
    { label: 'Natural Sciences', value: 'Natural Sciences' }
  ];

  programOptions = [
    { label: 'Bachelor of Science', value: 'BS' },
    { label: 'Bachelor of Arts', value: 'BA' },
    { label: 'Bachelor of Business Administration', value: 'BBA' },
    { label: 'Master of Science', value: 'MS' },
    { label: 'Master of Business Administration', value: 'MBA' },
    { label: 'PhD', value: 'PhD' }
  ];

  semesterOptions = Array.from({ length: 8 }, (_, i) => ({
    label: `Semester ${i + 1}`,
    value: i + 1
  }));

  bloodGroupOptions = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' }
  ];

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Suspended', value: 'suspended' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm() {
    this.studentForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      bloodGroup: [null],
      
      // Contact Information
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      alternatePhone: ['', Validators.pattern(/^[0-9+\-\s()]+$/)],
      
      // Address
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
      country: ['', Validators.required],
      
      // Academic Information
      studentId: ['', Validators.required],
      department: [null, Validators.required],
      program: [null, Validators.required],
      semester: [null, Validators.required],
      enrollmentDate: [new Date(), Validators.required],
      status: ['active', Validators.required],
      
      // Guardian Information
      guardianName: ['', Validators.required],
      guardianRelation: ['', Validators.required],
      guardianPhone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      guardianEmail: ['', Validators.email],
      
      // Additional Information
      previousSchool: [''],
      medicalConditions: [''],
      notes: ['']
    });
  }

  checkEditMode() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.isEditMode = true;
      this.loadStudentData(this.studentId);
    }
  }

  loadStudentData(id: string) {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      // Mock data - replace with actual API call
      const mockData = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        dateOfBirth: new Date('2000-05-15'),
        bloodGroup: 'O+',
        email: 'john.doe@university.edu',
        phone: '+1 234-567-8901',
        alternatePhone: '+1 234-567-8902',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        studentId: 'STU2024001',
        department: 'Computer Science',
        program: 'BS',
        semester: 4,
        enrollmentDate: new Date('2022-09-01'),
        status: 'active',
        guardianName: 'Robert Doe',
        guardianRelation: 'Father',
        guardianPhone: '+1 234-567-8903',
        guardianEmail: 'robert.doe@email.com',
        previousSchool: 'XYZ High School',
        medicalConditions: 'None',
        notes: 'Good student'
      };

      this.studentForm.patchValue(mockData);
      this.loading = false;
    }, 1000);
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched(this.studentForm);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly'
      });
      return;
    }

    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      const action = this.isEditMode ? 'updated' : 'added';
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Student ${action} successfully`
      });

      setTimeout(() => {
        this.router.navigate(['/admin/students']);
      }, 1500);

      this.loading = false;
    }, 1500);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  cancel() {
    this.router.navigate(['/admin/students']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.studentForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    if (field?.hasError('email')) {
      return 'Invalid email format';
    }
    if (field?.hasError('minlength')) {
      return `Minimum ${field.errors?.['minlength'].requiredLength} characters required`;
    }
    if (field?.hasError('pattern')) {
      return 'Invalid format';
    }
    return '';
  }
}