import { Component } from '@angular/core';
import { FacultyServiceService } from '../services/faculty-service.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-faculty-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink,NavbarComponent],
  providers: [FacultyServiceService],
  templateUrl: './faculty-list.component.html',
  styleUrl: './faculty-list.component.css'
})
export class FacultyListComponent {
  data: Array<any> = [];

  constructor(
    private faculty: FacultyServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getAllFaculty();
  }

  getAllFaculty() {
    this.faculty.getAllUser().subscribe({
      next: (resp: any) => {
        this.data = resp?.data || [];
        console.log(this.data);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to fetch faculty list');
      }
    });
  }

  editFaculty(id: string) {
    this.router.navigate(['/editfaculty', id]);
  }

  deleteFaculty(id: string) {
    if (!confirm('Are you sure you want to delete this faculty?')) return;

    this.faculty.deleteFaculty(id).subscribe({
      next: () => {
        this.data = this.data.filter(f => f._id !== id);
        this.toastr.success('Faculty deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting faculty:', err);
        this.toastr.error('Failed to delete faculty');
      }
    });
  }

  viewFaculty(id: string) {
    this.router.navigate(['/viewfaculty', id]);
  }
}
