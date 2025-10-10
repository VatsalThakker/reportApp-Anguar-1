import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentServiceService],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  data: Array<any> = [];
  allStudents: Array<any> = []; // backup copy
  searchForm: FormGroup;
  searched = false;

  constructor(
    private student: StudentServiceService,
    private t: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.getAllStudent();

    // ✅ live search as user types
    this.searchForm.get('name')?.valueChanges.subscribe((val: string) => {
      this.onSearch(val);
    });
  }

  // ✅ Fetch all students initially or when search is cleared
  getAllStudent() {
    this.student.getAllStudent().subscribe({
      next: (resp) => {
        this.data = resp?.data || [];
        this.allStudents = this.data; // keep copy
        console.log('All students:', resp);
      },
      error: (err) => {
        console.log(err);
        this.t.error('Failed to fetch students');
      }
    });
  }

  // ✅ Search logic
  onSearch(query: string) {
    const name = query?.trim();
    console.log('inside search, name:', name);

    if (name && name !== '') {
      this.student.search({ name }).subscribe({
        next: (data: any[]) => {
          console.log('Search Response:', data);

          // If backend returns a single object, wrap it in array
          this.data = Array.isArray(data) ? data : [data];

          // Optional: combine firstName + lastName
          this.data = this.data.map(s => ({
            ...s,
            name: `${s.firstName} ${s.lastName}`
          }));

          this.searched = true;
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.data = [];
          this.searched = true;
        }
      });
    } else {
      // ✅ If cleared, restore full list
      this.data = [...this.allStudents];
      this.searched = false;
    }
  }

  // ✅ Action buttons
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
        this.data = this.data.filter(s => s._id !== id);
        this.allStudents = this.allStudents.filter(s => s._id !== id);
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
}
