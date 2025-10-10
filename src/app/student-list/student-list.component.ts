import { NgIf, NgFor, CommonModule } from '@angular/common'; // ✅ include CommonModule
 import { Component, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

 
@Component({
  selector: 'app-student-list',
  standalone: true, // ✅ Required if this is a standalone component
  imports: [
    CommonModule,         // ✅ Includes both NgIf and NgFor
    HttpClientModule,
    RouterLink,
    NavbarComponent
  ],
  providers: [StudentServiceService],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  data: Array<any> = [];
  searchForm: FormGroup;
  

  constructor(private student: StudentServiceService, private t: ToastrService,private router: Router ,private fb: FormBuilder) {
    this.getAllStudent();

    //new
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  getAllStudent() {
    this.student.getAllStudent().subscribe({
      next: (resp) => {
        this.data = resp?.data || []; // Adjust based on API shape
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
        this.t.error('Failed to fetch students');
      }
    });
  }
  viewReport(studentId: string) {
    this.router.navigate(['/addreport', studentId]);
  }
  
  editStudent(id: string) {
    this.router.navigate(['/editstudent', id]);
  }
  deleteStudent(id: string) {
    if (!confirm('Are you sure you want to delete this student?')) return;
  
    this.student.deleteStudent(id).subscribe({
      next: (res) => {
        this.data = this.data.filter(s => s._id !== id); // ✅ Remove from local list
        this.t.success('Student deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting student:', err);
        this.t.error('Failed to delete student');
      }
    });
  }
  viewStudent(id: string) {
    this.router.navigate(['/viewstudent', id]);
  }


  onSearch() {
    const name = this.searchForm.get('name')?.value?.trim();
    console.log('inside search, name:', name);

    if (name !== '') {
      this.student.search({ name }).subscribe({
        // next: (data) => {
        //   console.log('Response:', data);

        //   // If backend returns a single object, wrap it into an array
        //   this.data = Array.isArray(data) ? data : [data];

        //   // Optional: combine firstName + lastName into name
        //   this.data = this.data.map(s => ({
        //     ...s,
        //     name: `${s.firstName} ${s.lastName}`
        //   }));

        //   this.searched = true;
        // },
        // error: (err) => {
        //   console.error('Error:', err);
        //   this.students = [];
        //   this.searched = true;
        // }
      });
    }
  }
}