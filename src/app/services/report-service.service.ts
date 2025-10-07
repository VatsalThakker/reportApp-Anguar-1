import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  constructor(private http: HttpClient) { }
  addReport(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + "report", data)
  }
  getAllReport():Observable<any>{
    return this.http.get(environment.apiUrl + "report")
  }
  deleteReport(id:any):Observable<any>{
    return this.http.delete(environment.apiUrl + "report/"+id)
  }
  getReportById(id:any):Observable<any>{
    return this.http.get(environment.apiUrl + "report/"+id)
  }
  getReportBySid(id:any):Observable<any>{
    return this.http.get(environment.apiUrl + "report/"+id)
  }
  updateReport(id:any,data:any):Observable<any>{
    return this.http.put(environment.apiUrl + "report/"+id,data)
  }
  getReportByFid(id:any):Observable<any>{
    return this.http.get(environment.apiUrl + "report/faculty/"+id)
  }
}
