// import { Component } from '@angular/core';
// import { StudentServiceService } from '../services/student-service.service';
// import { Router } from '@angular/router';
// import { NgFor, NgIf } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-view-report-search',
//   imports: [NgIf,NgFor,HttpClientModule,FormsModule],
//   templateUrl: './view-report-search.component.html',
//   styleUrl: './view-report-search.component.css'
// })
// export class ViewReportSearchComponent 
// {
//   name: string = '';
//   students: any[] = [];
//   searched: boolean = false;

//   constructor(private studentService: StudentServiceService, private router: Router) {}
  
//   onSearch() {
//     console.log('inside search kk'+this.name)
//     if (this.name.trim() !== '') {
//       console.log('inside if search')
//       this.studentService.search(this.name).subscribe({
//         next: (data) => {
//           console.log(data);
//           this.students = data;
//           this.searched = true;
          
          
//         },
//         error: (err) => {
//           console.error(err);
//         }
        
//       });
//     }
//   }
//   openReport(studentId: number) {
//     this.router.navigate(['/viewstudent', studentId]);
//   }
// }import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-report-search',
  imports: [NgIf, NgFor, HttpClientModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './view-report-search.component.html',
  styleUrls: ['./view-report-search.component.css']
})
export class ViewReportSearchComponent {
  searchForm: FormGroup;
  students: any[] = [];
  searched: boolean = false;

  constructor(
    private studentService: StudentServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize form with control "name"
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  onSearch() {
    const name = this.searchForm.get('name')?.value?.trim();
    console.log('inside search, name:', name);

    if (name !== '') {
      this.studentService.search({ name }).subscribe({
        next: (data) => {
          console.log('Response:', data);

          // If backend returns a single object, wrap it into an array
          this.students = Array.isArray(data) ? data : [data];

          // Optional: combine firstName + lastName into name
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
    }
  }

  openReport(studentId: string) {
    this.router.navigate(['/viewstudent', studentId]);
  }
}
