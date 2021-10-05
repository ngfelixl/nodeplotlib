import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlotsService {
  constructor(private http: HttpClient) {}

  loadPlotsStack(id: number): Observable<any> {
    return this.http.get(`http://localhost:{{port}}/data/${id}`);
  }
}
