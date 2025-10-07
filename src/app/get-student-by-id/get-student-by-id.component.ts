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

  constructor(private router: Router,private route: ActivatedRoute, private studentService: StudentServiceService) {
    const id = this.route.snapshot.params['id'];

    this.studentService.studentReport(id).subscribe(resp => {
      this.student = resp.studentDetails[0];
      this.reports = resp.reportDetails;
    }, err => {
      console.error('Error fetching student details:', err);
    });
  }
  viewReportDetails(reportId: string) {
    this.router.navigate(['/getreport', reportId]);
  }
  
}
