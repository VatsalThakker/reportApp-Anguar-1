import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReportServiceService } from '../services/report-service.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-report-list',
  imports: [CommonModule, HttpClientModule, RouterLink,NavbarComponent],
  providers:[ReportServiceService],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  reports: any[] = [];

  constructor(
    private reportService: ReportServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getAllReports();
  }

  getAllReports() {
    this.reportService.getAllReport().subscribe({
      next: (res) => {
        this.reports = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load reports');
        console.error(err);
      }
    });
  }

  deleteReport(id: string) {
    if (!confirm('Are you sure you want to delete this report?')) return;

    this.reportService.deleteReport(id).subscribe({
      next: () => {
        this.toastr.success('Report deleted successfully');
        this.reports = this.reports.filter(r => r._id !== id);
      },
      error: () => this.toastr.error('Failed to delete report')
    });
  }

  editReport(id: string) {
    this.router.navigate(['/editreport', id]);
  }

  viewReport(id: string) {
    this.router.navigate(['/getreport', id]);
  }
}
/*

export class ReportListComponent {
  reports: any[] = [];

  constructor(
    private reportService: ReportService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getAllReports();
  }

  getAllReports() {
    this.reportService.getAllReports().subscribe({
      next: (res) => {
        this.reports = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load reports');
        console.error(err);
      }
    });
  }

  deleteReport(id: string) {
    if (!confirm('Are you sure you want to delete this report?')) return;

    this.reportService.deleteReport(id).subscribe({
      next: () => {
        this.toastr.success('Report deleted successfully');
        this.reports = this.reports.filter(r => r._id !== id);
      },
      error: () => this.toastr.error('Failed to delete report')
    });
  }

  editReport(id: string) {
    this.router.navigate(['/editreport', id]);
  }

  viewReport(id: string) {
    this.router.navigate(['/viewreport', id]);
  }
}

*/