import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReportServiceService } from '../services/report-service.service'; // ✅ your service to post report
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-student-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,NavbarComponent],
  providers:[ReportServiceService],
  templateUrl: './add-report.component.html',
})
export class AddReportComponent {
  reportForm!: FormGroup;
  studentId!: string;
  facultyId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private reportService: ReportServiceService,
    private router: Router
  ) {
    this.studentId = this.route.snapshot.params['id'];
    this.facultyId = localStorage.getItem('facultyId') || ''; // get faculty_id from localStorage

    this.reportForm = this.fb.group({
      subject: ['', Validators.required],
      discipline: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      regularity: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      communication: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      test: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  onSubmit() {
    if (this.reportForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    const reportData = {
      ...this.reportForm.value,
      student_id: this.studentId,
      faculty_id: this.facultyId
    };

    this.reportService.addReport(reportData).subscribe({
      next: () => {
        this.toastr.success('Report added successfully!');
        this.router.navigate(['/reportlist']); // update route if needed
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to submit report.');
      }
    });
  }
}
