import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FacultyServiceService } from '../services/faculty-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-faculty',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule, HttpClientModule,NavbarComponent],
  providers: [FacultyServiceService],
  templateUrl: './add-faculty.component.html',
  styleUrl: './add-faculty.component.css'
})
export class AddFacultyComponent {
  facultyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  submitText: string = 'Submit';

  constructor(
    private facultyService: FacultyServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.facultyForm.invalid) {
      this.toastr.warning('Please fill all required fields.');
      return;
    }

    this.submitText = 'Submitting...';

    this.facultyService.addFaculty(this.facultyForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Faculty added successfully!');
        this.facultyForm.reset();
        this.submitText = 'Submit';
        this.router.navigateByUrl('/faculties'); // update route as needed
      },
      error: (err) => {
        console.error('Error:', err);
        this.toastr.error('Error adding faculty: ' + (err?.error?.message || 'Unknown error'));
        this.submitText = 'Submit';
      }
    });
  }
}
