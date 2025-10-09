import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink,FormsModule],
  providers: [DashboardServiceService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  facultyId: string | null = null;
  data1: any = {};
  constructor(
    private dashboard: DashboardServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.facultyId = localStorage.getItem('facultyId');
    if (this.facultyId) {
      this.dashboard.count(this.facultyId).subscribe(
        (res) => {
          console.log(res);
          this.data1=res
        },
        (err) => {
          console.error('Error fetching students:', err);
        }
      );
    }
  }
}
