import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/Country'; 
  http = inject(HttpClient);

  addCountry(country: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, country, { withCredentials: true });
  }
  deleteCountry(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${name}`, {
      withCredentials: true,
    });
  }
  getCountryByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
