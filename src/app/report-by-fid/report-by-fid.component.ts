import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../services/report-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-faculty-students',
  templateUrl: './report-by-fid.component.html',
  imports:[HttpClientModule,NgIf,NgForOf,NavbarComponent],
  providers:[ReportServiceService]
})
export class FacultyStudentsComponent implements OnInit {
  students: any[] = [];
  facultyId: string | null | undefined ; // 🔁 Replace with dynamic ID if needed

  constructor(private reportService: ReportServiceService,private router :Router) {}

  ngOnInit(): void {
    this.facultyId = localStorage.getItem('facultyId');
    this.reportService.getReportByFid(this.facultyId).subscribe(
      (res) => {
        this.students = res.data;
      },
      (err) => {
        console.error('Error fetching students:', err);
      }
    );
  }
  viewStudent(studentId: string) {
    // Navigate to student detail page
    this.router.navigate(['/viewstudent', studentId]);
  }
}
