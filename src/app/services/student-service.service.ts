import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http:HttpClient) { }
  studentLogin(data:any): Observable<any>{
    return this.http.post(environment.apiUrl+"studentlogin", data)
  }
  addStudent(data:any):Observable<any>{
    return this.http.post(environment.apiUrl+"signup", data)
  }
  getAllStudent():Observable<any>{
    return this.http.get(environment.apiUrl+"student")
  }
  getStudentById(sid:any):Observable<any>{
    return this.http.get(environment.apiUrl+"student/"+sid)
  }
  deleteStudent(sid:any):Observable<any>{
    return this.http.delete(environment.apiUrl+"student/"+sid)
  }
  updateStudent(id:any,data:any):Observable<any>{
    return this.http.put(environment.apiUrl+"student/"+id,data)
  }
  search(data:any):Observable<any>{
    return this.http.post(environment.apiUrl+"search",data)
  }
  studentReport(sid:any):Observable<any>{
    return this.http.get(environment.apiUrl+"sreport/"+sid)
  }
}
