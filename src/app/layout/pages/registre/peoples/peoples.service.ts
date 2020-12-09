import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeoplesService {
  constructor(private http: HttpClient) {}

  index(params) {
    return this.http
      .get<any>(`${environment.api}/peoples`, { params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  show(id) {
    return this.http.get<any>(`${environment.api}/peoples/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  store(data) {
    return this.http.post<any>(`${environment.api}/peoples`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http.put<any>(`${environment.api}/peoples`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  delete(id) {
    return this.http.delete<any>(`${environment.api}/peoples/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
