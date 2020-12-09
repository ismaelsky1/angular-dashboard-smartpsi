import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private http: HttpClient
  ) { }

  changePassword(data): Observable<any> {
    return this.http.patch<any>(`${environment.api}/users/changerpassword`, data).pipe(
      map(response => response)
    );
  }
}
