import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  index(params) {
    return this.http
      .get<any>(`${environment.api}/users`, { params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  show(id) {
    return this.http.get<any>(`${environment.api}/users/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  store(data) {
    return this.http.post<any>(`${environment.api}/users`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http.put<any>(`${environment.api}/users`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  avatar(data) {

    const formData: any = new FormData();
    formData.append('avatar', data.avatar);

    return this.http.patch<any>(`${environment.api}/users/avatar`, formData).pipe(
      map((response) => {
        return response;
      })
    );
  }

  delete(id) {
    return this.http.delete<any>(`${environment.api}/users/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
