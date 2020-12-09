import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  constructor(
    private http: HttpClient
  ) { }


  recoverPassword(email) {
    return this.http.get<any>(`${environment.api}/users/recoverpassword/${email}`).pipe(
      map(response => response.data)
    );
  }

  redefinePassword({ id, hashRecover, new_password, confirm_password }) {
    return this.http.patch<any>(`${environment.api}/users/redefinepassword`, {
      id, document, hashRecover, new_password, confirm_password
    }).pipe(
      map(response => response)
    );
  }
}
