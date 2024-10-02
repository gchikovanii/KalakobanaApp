import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiverService {
  private baseUrl = 'bff/adminpanel/River'; 

  http =inject(HttpClient);

  addRiver(river: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, river, { withCredentials: true });
  }
  deleteRiver(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getRiverByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
