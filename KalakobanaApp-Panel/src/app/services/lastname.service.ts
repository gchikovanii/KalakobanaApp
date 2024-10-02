import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LastnameService {
  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/LastName'; 

  http = inject(HttpClient);

  addLastName(lastName: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, lastName, { withCredentials: true });
  }
  deleteLastName(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getLastNameByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
