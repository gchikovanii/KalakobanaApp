import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RiverService {
  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/River'; 

  http =inject(HttpClient);

  addRiver(river: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, river, { withCredentials: true });
  }
  deleteRiver(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${name}`, {
      withCredentials: true,
    });
  }

  getRiverByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
