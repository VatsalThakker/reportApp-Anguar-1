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

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'',component:LoginComponent},
    {path:'addstudent',component:AddStudentComponent},
    {path:'addfaculty',component:AddFacultyComponent},
    {path:'students',component:StudentListComponent},
    {path: 'editstudent/:id',component: UpdateStudentComponent },
    {path: 'viewstudent/:id',component: ViewStudentComponent },
    {path: 'faculties',component: FacultyListComponent },
    {path: 'viewfaculty/:id',component: GetFacultyCompenent },
    {path: 'editfaculty/:id',component: UpdateFacultyComponent },
    {path:'addreport/:id',component:AddReportComponent},
    {path:'getreport/:id',component:GetReportComponent},
    {path:'myresult',component:FacultyStudentsComponent},
    {path:'reportlist',component:ReportListComponent},
    {path:'editreport/:id',component:UpdateReportComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'nav',component:NavbarComponent},
    {path:'searchreport',component:ViewReportSearchComponent}
];
