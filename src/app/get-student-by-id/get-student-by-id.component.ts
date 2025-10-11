import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
 

@Component({
  selector: 'app-view-student',
  templateUrl: './get-student-by-id.component.html',
  styleUrls: ['./get-student-by-id.component.css'],
  imports: [CommonModule, HttpClientModule, NavbarComponent, RouterLink],  
  providers:[StudentServiceService],
})
export class ViewStudentComponent {
  student: any = null;
  reports: any[] = [];
  data :any 
  grandTotal: number | undefined;
  overallPercentage: number | undefined;
  overallStatus: string | undefined;

  constructor(private router: Router,private route: ActivatedRoute, private studentService: StudentServiceService) {
    const id = this.route.snapshot.params['id'];

    this.studentService.studentReport(id).subscribe(resp => {
      this.student = resp.studentDetails[0];
      this.reports = resp.reportDetails;
      this.data=resp
      console.log(resp);
      this.reports.forEach((r) => {
        r.total =
          (r.regularity || 0) +
          (r.discipline || 0) +
          (r.communication || 0) +
          (r.test || 0);

        r.per = (r.total / 20) * 100;
        r.sstatus = this.getStatus(r.per);
      });
      this.calculateTotals();

    }, err => {
      console.error('Error fetching student details:', err);
    });
  }
  viewReportDetails(reportId: string) {
    this.router.navigate(['/getreport', reportId]);
  }
  calculateTotals() {
    let totalMarks = 0;
    let totalSubjects = this.reports.length;

    this.reports.forEach((r) => {
      // individual report calculations
      r.total =
        (r.regularity || 0) +
        (r.discipline || 0) +
        (r.communication || 0) +
        (r.test || 0);

      r.per = (r.total / 20) * 100;
      r.sstatus = this.getStatus(r.per);

      // add to grand total
      totalMarks += r.total;
    });

    // ✅ overall calculations
    this.grandTotal = totalMarks;
    const maxTotal = totalSubjects * 20; // each subject has max 20 marks
    this.overallPercentage = (this.grandTotal / maxTotal) * 100;
    this.overallStatus = this.getStatus(this.overallPercentage);
  }
  getStatus(per: number): string {
    if (per > 75) return 'Excellent';
    if (per > 50) return 'Very Good';
    if (per > 25) return 'Good';
    return 'Needs Improvement';
  }
  
}
