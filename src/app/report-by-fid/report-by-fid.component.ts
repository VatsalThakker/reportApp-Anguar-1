import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../services/report-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentServiceService } from '../services/student-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-students',
  templateUrl: './report-by-fid.component.html',
  imports:[HttpClientModule,NgIf,NgForOf,NavbarComponent],
  providers:[ReportServiceService,StudentServiceService,ToastrService]
})
export class FacultyStudentsComponent implements OnInit {
  students: any[] = [];
  facultyId: string | null | undefined ; // 🔁 Replace with dynamic ID if needed

  constructor(private reportService: ReportServiceService,private router :Router,private student: StudentServiceService,private t: ToastrService) {}
  
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
    this.router.navigate(['/viewstudent', studentId]);
  }
  editStudent(id: string) {
    this.router.navigate(['/editstudent', id]);
  }
  deleteStudent(id: string) {
    if (!confirm('Are you sure you want to delete this student?')) return;
  
    this.student.deleteStudent(id).subscribe({
      next: (res) => {
        this.students = this.students.filter(s => s._id !== id); // ✅ Remove from local list
        this.t.success('Student deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting student:', err);
        this.t.error('Failed to delete student');
      }
    });
  }
  viewReport(studentId: string) {
    this.router.navigate(['/addreport', studentId]);
  }
}
