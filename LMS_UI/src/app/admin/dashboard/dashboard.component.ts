import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  enrollmentData: any;
  revenueData: any;
  chartOptions: any;
  doughnutOptions: any;

  activities = [
    { icon: 'pi pi-user-plus', title: 'New student registered: John Smith', time: '5 mins ago', user: 'Admissions', type: 'success' },
    { icon: 'pi pi-dollar', title: 'Payment received: $2,500', time: '12 mins ago', user: 'Finance Dept.', type: 'primary' },
    { icon: 'pi pi-file', title: 'Assignment submitted: Mathematics 101', time: '25 mins ago', user: 'Course Portal', type: 'info' },
    { icon: 'pi pi-calendar', title: 'Event scheduled: Parent-Teacher Meeting', time: '1 hour ago', user: 'Admin Office', type: 'warning' },
    { icon: 'pi pi-check-circle', title: 'Course completed: Emma Watson - Physics', time: '2 hours ago', user: 'Academic', type: 'success' }
  ];

  topStudents = [
    { name: 'Alice Johnson', course: 'Computer Science', score: 98, avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Michael Chen', course: 'Mathematics', score: 96, avatar: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Sarah Williams', course: 'Physics', score: 95, avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'David Brown', course: 'Engineering', score: 94, avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Emma Davis', course: 'Biology', score: 93, avatar: 'https://i.pravatar.cc/150?img=9' }
  ];

  upcomingEvents = [
    { day: '15', month: 'FEB', title: 'Annual Science Fair', time: '9:00 AM - 4:00 PM', location: 'Main Auditorium' },
    { day: '18', month: 'FEB', title: 'Parent-Teacher Conference', time: '2:00 PM - 6:00 PM', location: 'Conference Hall' },
    { day: '22', month: 'FEB', title: 'Sports Day Celebration', time: '10:00 AM - 3:00 PM', location: 'Sports Complex' },
    { day: '25', month: 'FEB', title: 'Final Exams Begin', time: 'All Day', location: 'Exam Centers' }
  ];

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    // Enrollment Trends Chart
    this.enrollmentData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'New Enrollments',
          data: [65, 78, 90, 81, 95, 105, 110, 125, 140, 155, 165, 180],
          borderColor: '#0891B2',
          backgroundColor: 'rgba(8, 145, 178, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 3
        },
        {
          label: 'Total Students',
          data: [1200, 1278, 1368, 1449, 1544, 1649, 1759, 1884, 2024, 2179, 2344, 2524],
          borderColor: '#9333EA',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 3
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              family: 'Inter',
              size: 13,
              weight: 500
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          borderRadius: 8,
          titleFont: {
            family: 'Inter',
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: 'Inter',
            size: 12
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      }
    };

    // Revenue Breakdown Chart
    this.revenueData = {
      labels: ['Tuition Fees', 'Course Materials', 'Events', 'Cafeteria', 'Transport', 'Others'],
      datasets: [
        {
          data: [45000, 28000, 15000, 12000, 18000, 6500],
          backgroundColor: [
            '#0891B2',
            '#9333EA',
            '#F59E0B',
            '#10B981',
            '#F97316',
            '#6366F1'
          ],
          borderWidth: 0,
          hoverOffset: 10
        }
      ]
    };

    this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              family: 'Inter',
              size: 12,
              weight: 500
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          borderRadius: 8,
          callbacks: {
            label: function(context: any) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: $${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      },
      cutout: '70%'
    };
  }
}