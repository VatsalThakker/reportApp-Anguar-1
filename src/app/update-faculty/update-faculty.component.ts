import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FacultyServiceService } from '../services/faculty-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-update-faculty',
  standalone: true,
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgIf, RouterLink,NavbarComponent],
  providers: [FacultyServiceService],
})
export class UpdateFacultyComponent implements OnInit {
  facultyForm!: FormGroup;
  facultyId!: string;

  constructor(
    private facultyService: FacultyServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facultyId = this.route.snapshot.paramMap.get('id') || '';
    this.initializeForm();
    this.loadFacultyData();
  }

  initializeForm() {
    this.facultyForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      contactNo: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  loadFacultyData() {
    this.facultyService.getFacultyById(this.facultyId).subscribe({
      next: (resp) => {
        const faculty = resp[0] || resp;
        this.facultyForm.patchValue(faculty);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load faculty data');
      }
    });
  }

  onSubmit() {
    if (this.facultyForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    this.facultyService.updateFaculty(this.facultyId, this.facultyForm.value).subscribe({
      next: () => {
        this.toastr.success('Faculty updated successfully!');
        this.router.navigate(['/faculties']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Update failed. Try again.');
      }
    });
  }
}
