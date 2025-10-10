import { Component, NgModule, OnInit } from '@angular/core';
import { ReportServiceService } from '../services/report-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentServiceService } from '../services/student-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-faculty-students',
  templateUrl: './report-by-fid.component.html',
  imports:[HttpClientModule,NgIf,NgForOf,NavbarComponent,ReactiveFormsModule],
  providers:[ReportServiceService,StudentServiceService,ToastrService]
})
export class FacultyStudentsComponent implements OnInit {
  students: any[] = [];
  facultyId: string | null | undefined ; // 🔁 Replace with dynamic ID if needed
  searched: boolean | undefined;
  searchForm: FormGroup;

  constructor(private reportService: ReportServiceService,private router :Router,private student: StudentServiceService,private t: ToastrService,private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }
  
  ngOnInit(): void {
    this.facultyId = localStorage.getItem('facultyId');
    this.reportService.getReportByFid(this.facultyId).subscribe(
      (res) => {
        this.students = res.data;
        console.log(this.students);
        
      },
      (err) => {
        console.error('Error fetching students:', err);
      }
    );
    this.searchForm.get('name')?.valueChanges.subscribe((val: string) => {
      this.onSearch(val);
    });
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
  onSearch(query: string) {
    const name = query?.trim();
    console.log('inside search, name:', name);

    if (name && name !== '') {
      this.student.search({ name }).subscribe({
        next: (data: any[]) => {
          console.log('Search Response:', data);

          // If backend returns a single object, wrap it in array
          this.students = Array.isArray(data) ? data : [data];

          // Optional: combine firstName + lastName
          this.students = this.students.map(s => ({
            ...s,
            name: `${s.firstName} ${s.lastName}`
          }));

          this.searched = true;
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.students = [];
          this.searched = true;
        }
      });
    } else {
      // ✅ If cleared, restore full list
      this.students = [...this.students];
      this.searched = false;
    }
  }
}
