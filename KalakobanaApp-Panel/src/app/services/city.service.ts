import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = 'api/City'; 

  http =inject(HttpClient);

  addCity(city: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, city);
  }
  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCityByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`);
  }

}
