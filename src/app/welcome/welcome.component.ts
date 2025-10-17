import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  studentName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // You can fetch this from localStorage or a signup service
    this.studentName = localStorage.getItem('studentName') || 'Student';
  }
}
