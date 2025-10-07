import { NgIf, NgFor, CommonModule } from '@angular/common'; // ✅ include CommonModule
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';

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
  

  constructor(private student: StudentServiceService, private t: ToastrService,private router: Router ) {
    this.getAllStudent();
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
}
