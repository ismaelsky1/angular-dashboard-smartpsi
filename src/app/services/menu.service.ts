import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  index(){
    return this.http.get<any>(`${environment.api}/menu`).pipe(map(response => {
      return response;
    }));
  }
}
