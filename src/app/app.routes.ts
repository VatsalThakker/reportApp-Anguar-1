import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ViewStudentComponent } from './get-student-by-id/get-student-by-id.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { GetFacultyCompenent } from './get-faculty/get-faculty.component';
import { UpdateFacultyComponent } from './update-faculty/update-faculty.component';
import { AddReportComponent } from './add-report/add-report.component';
import { GetReportComponent } from './get-report/get-report.component';
import { FacultyStudentsComponent } from './report-by-fid/report-by-fid.component';
import { ReportListComponent } from './report-list/report-list.component';
import { UpdateReportComponent } from './update-report/update-report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewReportSearchComponent } from './view-report-search/view-report-search.component';
import { logincheckGuard } from './logincheck.guard';
import { DeleteAppComponent } from './delete-app/delete-app.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'',component:LoginComponent},
    {path:'addstudent',component:AddStudentComponent,canActivate:[logincheckGuard]},
    {path:'addfaculty',component:AddFacultyComponent,canActivate:[logincheckGuard]},
    {path:'students',component:StudentListComponent,canActivate:[logincheckGuard]},
    {path: 'editstudent/:id',component: UpdateStudentComponent,canActivate:[logincheckGuard]},
    {path: 'viewstudent/:id',component: ViewStudentComponent,canActivate:[logincheckGuard]},
    {path: 'faculties',component: FacultyListComponent,canActivate:[logincheckGuard]},
    {path: 'viewfaculty/:id',component: GetFacultyCompenent,canActivate:[logincheckGuard]},
    {path: 'editfaculty/:id',component: UpdateFacultyComponent,canActivate:[logincheckGuard]},
    {path:'addreport/:id',component:AddReportComponent,canActivate:[logincheckGuard]},
    {path:'getreport/:id',component:GetReportComponent,canActivate:[logincheckGuard]},
    {path:'myresult',component:FacultyStudentsComponent,canActivate:[logincheckGuard]},
    {path:'reportlist',component:ReportListComponent,canActivate:[logincheckGuard]},
    {path:'editreport/:id',component:UpdateReportComponent,canActivate:[logincheckGuard]},
    {path:'dashboard',component:DashboardComponent,canActivate:[logincheckGuard]},
    {path:'nav',component:NavbarComponent,canActivate:[logincheckGuard]},
    {path:'searchreport',component:ViewReportSearchComponent,canActivate:[logincheckGuard]},
    {path:'delete',component:DeleteAppComponent},
    {path:'signup',component:SignupComponent},
    {path:'welcome',component:WelcomeComponent}
];
