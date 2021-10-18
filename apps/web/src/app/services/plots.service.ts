import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTransferObject } from '@npl/interfaces';


@Injectable()
export class PlotsService {
  constructor(private http: HttpClient) {}

  loadPlots(): Observable<DataTransferObject> {
    return this.http.get<DataTransferObject>(`/api/plots`);
  }
}
