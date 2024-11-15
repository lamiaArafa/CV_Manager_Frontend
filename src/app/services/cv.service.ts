import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private baseUrl = 'https://localhost:7055'; 

  constructor(private http: HttpClient) {}

  // Fetch all CVs
  getCVs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllCVs`);
  }

  getCVById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetCVById?id=${id}`);
  }

  // Create Or Update a new CV
  createOrUpdateCV(cvData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CreateORUpdateCV`, cvData);
  }

  // Delete a CV
  deleteCV(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/DeleteCV?id=${id}`);
  }
}
