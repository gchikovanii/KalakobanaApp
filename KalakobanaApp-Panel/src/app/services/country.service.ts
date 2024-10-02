import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'bff/adminpanel/Country'; 
  http = inject(HttpClient);

  addCountry(country: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, country);
  }
  deleteCountry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getCityByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`);
  }
}
