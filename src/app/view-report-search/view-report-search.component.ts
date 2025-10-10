import { Component } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-report-search',
  standalone: true,
  imports: [NgIf, NgFor, HttpClientModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './view-report-search.component.html',
  styleUrls: ['./view-report-search.component.css']
})
export class ViewReportSearchComponent {
  searchForm: FormGroup;
  students: any[] = [];
  searched = false;

  constructor(
    private studentService: StudentServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    // 👀 Live search as user types
    this.searchForm.get('name')?.valueChanges.subscribe((val: string) => {
      this.onSearch(val);
    });
  }

  onSearch(query?: string) {
    const name = (query ?? this.searchForm.get('name')?.value)?.trim();

    if (name && name !== '') {
      this.studentService.search({ name }).subscribe({
        next: (data) => {
          console.log('Response:', data);

          // Ensure array
          this.students = Array.isArray(data) ? data : [data];

          // Optional: combine full name
          this.students = this.students.map(s => ({
            ...s,
            name: `${s.firstName} ${s.lastName}`
          }));

          this.searched = true;
        },
        error: (err) => {
          console.error('Error:', err);
          this.students = [];
          this.searched = true;
        }
      });
    } else {
      // ✅ When cleared, reset list
      this.students = [];
      this.searched = false;
    }
  }

  openReport(studentId: string) {
    this.router.navigate(['/viewstudent', studentId]);
  }
}
