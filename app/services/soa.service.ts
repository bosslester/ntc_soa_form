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

  /* ========================
     GET
  ========================= */

  /** GET SOA HEADER */
  getSoa(id: number): Observable<Soa> {
    return this.http.get<Soa>(`${this.baseUrl}/${id}`);
  }

  /** GET SOA DETAILS */
  getSoaDetails(id: number): Observable<SoaDetail[]> {
    return this.http.get<SoaDetail[]>(`${this.baseUrl}/${id}/details`);
  }

  /** GET ALL SOA */
  getAllSoa(): Observable<Soa[]> {
    return this.http.get<Soa[]>(this.baseUrl);
  }


  /* ========================
     POST (CREATE)
  ========================= */

  /** CREATE NEW SOA */
  createSoa(soa: Soa): Observable<Soa> {
    return this.http.post<Soa>(this.baseUrl, soa);
  }

  /** CREATE SOA DETAIL */
  createSoaDetail(
    soaId: number,
    detail: SoaDetail
  ): Observable<SoaDetail> {
    return this.http.post<SoaDetail>(
      `${this.baseUrl}/${soaId}/details`,
      detail
    );
  }


  /* ========================
     PUT (UPDATE)
  ========================= */

  /** UPDATE SOA */
  updateSoa(id: number, soa: Soa): Observable<Soa> {
    return this.http.put<Soa>(
      `${this.baseUrl}/${id}`,
      soa
    );
  }

  /** UPDATE SOA DETAIL */
  updateSoaDetail(
    detailId: number,
    detail: SoaDetail
  ): Observable<SoaDetail> {
    return this.http.put<SoaDetail>(
      `${this.baseUrl}/details/${detailId}`,
      detail
    );
  }


  /* ========================
     DELETE
  ========================= */

  /** DELETE SOA */
  deleteSoa(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );
  }

  /** DELETE SOA DETAIL */
  deleteSoaDetail(detailId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/details/${detailId}`
    );
  }

}
