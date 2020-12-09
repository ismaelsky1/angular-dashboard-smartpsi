import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardNumbersResponse, DashboardResponse } from './dashboard.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  dashboard(params): Observable<DashboardResponse> {
    return this.http.get<any>(`${environment.api}/dashboard`, {params}).pipe(
      map(response => response)
    );
  }

}
