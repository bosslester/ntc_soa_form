import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soa } from '../models/soa.model';
import { SoaDetail } from '../models/soa-detail.model';

@Injectable({
  providedIn: 'root'
})
export class SoaService {

  private readonly baseUrl = 'http://localhost:5000/api/soa';

  constructor(private http: HttpClient) {}

  /** GET SOA HEADER */
  getSoa(id: number): Observable<Soa> {
    return this.http.get<Soa>(${this.baseUrl}/${id});
  }

  /** GET SOA DETAILS */
  getSoaDetails(id: number): Observable<SoaDetail[]> {
    return this.http.get<SoaDetail[]>(${this.baseUrl}/${id}/details);
  }
}