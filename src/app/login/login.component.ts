import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataStoreService } from '../data-store.service';
import { StudentServiceService } from '../services/student-service.service';
import { FacultyServiceService } from '../services/faculty-service.service';
@Component({
  selector: 'x',
  imports: [NgIf,RouterLink,ReactiveFormsModule,HttpClientModule],
  providers:[FacultyServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  
  loginText: string = 'Login';


  
  constructor(private data:DataStoreService,private toast:ToastrService,private router:Router,private auth:FacultyServiceService)
  {
    
  }
  login() {
    this.loginText = "Authenticating...."
    this.auth.login(this.loginForm.value).subscribe(resp => {
      console.log(resp);
      localStorage.setItem("facultyId",resp.user.id)
      localStorage.setItem("firstName",resp.user.firstName)
      this.loginText = "Login"
      this.router.navigateByUrl("/dashboard")
    },err => {
      this.loginText = "Login"
      console.log(err.error.message)
      this.toast.error("Invalid Credentials"+err.error.message, "", { timeOut: 3000 })
    })
  }
}