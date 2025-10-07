import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StudentServiceService } from '../services/student-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgIf, NgFor,NavbarComponent],
  providers: [StudentServiceService, ToastrService],
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent {
  studentForm: FormGroup | null = null;
  // student: any;
  selectedFile: File | null = null;

  constructor(
    private studentService: StudentServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    const studentId = this.route.snapshot.params['id'];

    // Load student by ID
    this.studentService.getStudentById(studentId).subscribe(resp => {
      const student = resp[0] || resp;
      console.log(resp);
      
      console.log(student);
      this.studentForm = new FormGroup({
        firstName: new FormControl(student.firstName),
        lastName: new FormControl(student.lastName),
        email: new FormControl(student.email),
        password: new FormControl(''),
        gender: new FormControl(student.gender),
        batch: new FormControl(student.batch),
        collegeName: new FormControl(student.collegeName),
        contactNo: new FormControl(student.contactNo),
        branch: new FormControl(student.branch)
      });
    });
    
    
  }


  updateStudent() {
    if (!this.studentForm) return;

    const formValue = this.studentForm.value;

    const studentId = this.route.snapshot.params['id'];

    this.studentService.updateStudent(studentId, formValue).subscribe(
      resp => {
        this.toastr.success('Student updated successfully', '', { timeOut: 3000 });
        this.router.navigateByUrl('/students');
      },
      err => {
        this.toastr.error('Update failed: ' + err.error.message, '', { timeOut: 3000 });
      }
    );
  }
}