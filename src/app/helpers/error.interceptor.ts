import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private injector: Injector,
    private modalService: NzModalService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(request).pipe(catchError(error => {

      // if(error.status === 401 && error.error.message === 'TOKEN_EXPIRED'){

      //   const http = this.injector.get(HttpClient);
      //   const oldToken = jwt_decode(this.authenticationService.getToken());

      //   return http.post<any>(`${environment.api}/refreshToken`, {
      //     user_id: oldToken.id
      //   }).pipe(switchMap(response => {

      //     this.authenticationService.setToken(response.data.token);

      //     const cloneRequest = request.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${response.data.token}`
      //       }
      //     });

      //     return next.handle(cloneRequest);
      //   }));
      // }

      if (error.status === 401) {
        this.authenticationService.logout();
      }

      const errorMessage = error.error.message || error.statusText;

      const statusCodeAvailabled = [404, 405, 400, 409, 500];

      console.log(error)

      if (statusCodeAvailabled.indexOf(error.status) > -1) {

        let contents = '';

        if (Array.isArray(errorMessage)) {
          for (const key in errorMessage) {
            const value = errorMessage[key];
            contents += `<li>${value}</li>`;
          }
        } else {
          contents = errorMessage;
        }

        this.modalService.error({
          nzTitle: 'Ops, ocorreu um erro',
          nzContent: `<ul>${contents}</ul>`
        });
      }

      return throwError(errorMessage);

    }));
  }

}
