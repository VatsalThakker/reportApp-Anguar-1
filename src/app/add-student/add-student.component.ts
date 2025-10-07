import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentServiceService } from '../services/student-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  providers: [StudentServiceService],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('royal12'),
    gender: new FormControl('', [Validators.required]),
    batch: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required])
  });

  selectedFile!: File;
  submitText: string = 'Submit';

  constructor(
    private studentService: StudentServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.studentForm.invalid || !this.selectedFile) {
      // this.toastr.warning('Please fill all required fields and select a profile picture.', '', {
      //   positionClass: 'toast-top-left'
      // });
      return;
    }

    this.submitText = 'Submitting...';

    const formData = new FormData();
    Object.entries(this.studentForm.value).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    formData.append('profilePic', this.selectedFile);

    this.studentService.addStudent(formData).subscribe({
      next: (res) => {
        // this.toastr.success('Student added successfully!', '', {
        //   positionClass: 'toast-top-right'
        // });
        this.studentForm.reset();
        this.submitText = 'Submit';
        this.router.navigateByUrl('/students'); // Update route as needed
      },
      error: (err) => {
        console.error('Error:', err);
        // this.toastr.error('Error adding student: ' + (err?.error?.message || 'Unknown error'), '', {
          // positionClass: 'toast-top-right'
        // });
        this.submitText = 'Submit';
      }
    });
  }
}
