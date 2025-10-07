

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportServiceService } from '../services/report-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-update-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule,NavbarComponent],
  providers:[ReportServiceService],
  templateUrl: './update-report.component.html',
})
export class UpdateReportComponent implements OnInit {
  reportForm!: FormGroup;
  reportId!: string;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id') || '';

    
    this.initForm();

    if (this.reportId) {
      this.loadReportData(this.reportId);
    }
  }

  initForm() {
    this.reportForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      discipline: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      regularity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      communication: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      test: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)])
    });
  }

  loadReportData(id: string) {
    this.reportService.getReportById(id).subscribe({
      next: (res) => {
        console.log(res);
        const report = res.data[0];
        this.reportForm.patchValue({
          subject: report.subject,
          discipline: report.discipline,
          regularity: report.regularity,
          communication: report.communication,
          test: report.test
        });
      },
      error: (err) => {
        this.toastr.error('Failed to load report');
      }
    });
  }

  onSubmit() {
    if (this.reportForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    this.reportService.updateReport(this.reportId, this.reportForm.value).subscribe({
      next: () => {
        this.toastr.success('Report updated successfully!');
        this.router.navigate(['/reportlist']);
      },
      error: (err) => {
        this.toastr.error('Update failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
