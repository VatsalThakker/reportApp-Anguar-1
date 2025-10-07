import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyServiceService } from '../services/faculty-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-faculty',
  standalone: true,
  imports: [HttpClientModule,NgIf,NavbarComponent],
  providers: [FacultyServiceService],
  templateUrl: './get-faculty.component.html',
  styleUrls: ['./get-faculty.component.css']
})
export class GetFacultyCompenent implements OnInit {
  faculty: any = null;

  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyServiceService
  ) {}

  ngOnInit(): void {
    const facultyId = this.route.snapshot.paramMap.get('id');
    if (facultyId) {
      this.facultyService.getFacultyById(facultyId).subscribe({
        next: (resp: any) => {
          console.log(resp)
          this.faculty = resp[0] ?? resp;
        },
        error: (err) => {
          console.error('Error fetching faculty details:', err);
        }
      });
    }
  }
}
