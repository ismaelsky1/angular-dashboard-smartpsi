import { Peoples } from './../../dashboard/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  index(params) {
    return this.http
      .get<any>(`${environment.api}/appointment`, { params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  show(id) {
    return this.http.get<any>(`${environment.api}/appointment/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  store(data) {
    return this.http.post<any>(`${environment.api}/appointment`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http.put<any>(`${environment.api}/appointment`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  delete(id) {
    return this.http.delete<any>(`${environment.api}/appointment/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getReportPdf(params) {
    return this.http.get(`${environment.api}/report/`, { params, responseType: 'blob' }).pipe(map(response => {
      return response;
    }));
  }

  getReportPdfClient(id) {
    return this.http.get(`${environment.api}/reportClient/${id}`, { responseType: 'blob' }).pipe(map(response => {
      return response;
    }));
  }

}
