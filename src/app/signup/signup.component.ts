import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentServiceService } from '../services/student-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports:[ NgIf, RouterLink, ReactiveFormsModule, HttpClientModule ],
  providers: [StudentServiceService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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
        
        this.studentForm.reset();
        this.submitText = 'Submit';
        console.log(res);
        
        this.router.navigateByUrl('/welcome'+res.user._id); // Update route as needed
      },
      error: (err) => {
        console.error('Error:', err);
       
        this.submitText = 'Submit';
      }
    });
  }

}