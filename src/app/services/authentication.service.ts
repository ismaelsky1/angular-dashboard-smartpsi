import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

interface Token {
  sub: string;
  ext: string;
  key: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentTokenSubject: BehaviorSubject<any>;
  private currentToken: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentTokenSubject = new BehaviorSubject<any>(sessionStorage.getItem('psitoken'));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public getToken() {
    return sessionStorage.getItem('psitoken');
  }

  public getTokenDecode() {
    return jwt_decode(sessionStorage.getItem('psitoken'));
  }

  public setToken(token) {
    sessionStorage.setItem('psitoken', token);
  }

  public getFilter() {
    const token: any = this.getTokenDecode();
    let id: string;

    if (token.role === 'ROOT') {
      id = null;
    }

    if (token.role === 'USER' || token.role === 'FREE') {
      id = token.sub;
    }

    if (token.role === 'AUX') {
      id = token.masterId;
    }

    return id;
  }

  login(credentials) {
    return this.http.post<any>(`${environment.api}/sessions`, credentials).pipe(map(response => {
      this.setToken(response.token);
      this.currentTokenSubject.next(response.token);
      return response;
    }));
  }

  logout() {
    sessionStorage.removeItem('psitoken');
    this.currentTokenSubject.next(null);
    this.router.navigate(['login']);
  }

  signUp(data) {
    return this.http.post<any>(`${environment.api}/signUp`, data).pipe(map(response => {
      this.setToken(response.token);
      this.currentTokenSubject.next(response.token);
      return response;
    }));
  }
}
