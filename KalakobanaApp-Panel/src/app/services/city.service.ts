import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/City'; 

  http =inject(HttpClient);

  addCity(city: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, city, { withCredentials: true });
  }
  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getCityByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }

}
