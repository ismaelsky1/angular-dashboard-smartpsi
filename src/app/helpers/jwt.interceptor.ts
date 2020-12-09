import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.startsWith(`${environment.api}`)) {
      const currentToken = this.authenticationService.getToken();

      if (currentToken) {
        request = request.clone({
          setHeaders: {Authorization: `Bearer ${currentToken}`, Accept: '*/*'}
        });
      }
    } else {
      request = request.clone();
    }

    return next.handle(request);
  }
}
