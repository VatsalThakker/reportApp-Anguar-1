import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FacultyServiceService {
  
  constructor(private http: HttpClient) { }
  addFaculty(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + "addfaculty", data)
  }
  getFacultyById(id:any):Observable<any>{
    return this.http.get(environment.apiUrl+"faculty/"+id)
  }
  login(data:any):Observable<any>{
    return this.http.post(environment.apiUrl + "login", data)
  }
  getAllUser():Observable<any>{
    return this.http.get(environment.apiUrl+"user")
  }
  getAllAdmin():Observable<any>{
    return this.http.get(environment.apiUrl+"admin")
  }
  getAllFaculty():Observable<any>{
    return this.http.get(environment.apiUrl+"faculty")
  }
  updateFaculty(id:any,data:any):Observable<any>{
    return this.http.put(environment.apiUrl+"faculty/"+id,data)
  }
  deleteFaculty(id:any):Observable<any>{
    return this.http.delete(environment.apiUrl+"faculty/"+id)
  }
}
