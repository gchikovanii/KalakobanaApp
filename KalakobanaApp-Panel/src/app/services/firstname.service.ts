import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FirstnameService {
  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/FirstName'; 

  http =inject(HttpClient);

  addFirstName(firstName: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, firstName, { withCredentials: true });
  }
  deleteFirstName(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteFirstName/${name}`, {
      withCredentials: true,
    });
  }

  getFirstNameByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
