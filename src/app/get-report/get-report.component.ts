import { Component } from '@angular/core';
import { ReportServiceService } from '../services/report-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-get-report',
  imports: [CommonModule, RouterLink, HttpClientModule,NavbarComponent],
  providers:[ReportServiceService],
  templateUrl: './get-report.component.html',
  styleUrl: './get-report.component.css'
})
export class GetReportComponent {
  report: any;
  reportId: string = '';
  sid : string =''

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportServiceService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.reportId = this.route.snapshot.paramMap.get('id') || '';
    this.getReport();
  }

  getReport() {
    this.reportService.getReportById(this.reportId).subscribe({
      next: (res) => {
        this.report = res.data[0];
        this.sid=res.data[0].student_id._id
        console.log(res.data[0])
      },
      error: (err) => {
        console.error('Error fetching report:', err);
      }
    });
  }
  openReport() {
    this.router.navigate(['/viewstudent/'+this.sid]);
  }
}
