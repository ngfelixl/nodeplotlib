import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTransferObject } from '@npl/interfaces';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const url = environment.production
  ? '/api/plots'
  : 'http://localhost:3333/api/plots';

@Injectable()
export class PlotsService {
  data$ = this.http.get<DataTransferObject>(url).pipe(shareReplay(1));

  constructor(private http: HttpClient) {}
}
