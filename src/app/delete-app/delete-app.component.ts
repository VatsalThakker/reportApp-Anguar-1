import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-playstore',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.css'],
  imports:[HttpClientModule,ReactiveFormsModule]
})
export class DeleteAppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // 👇 No submission — just show a simple console message
    console.log('Entered email:', this.email?.value);
    alert(`You entered: ${this.email?.value}`);
  }
}
