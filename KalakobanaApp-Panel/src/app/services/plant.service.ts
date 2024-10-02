import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private baseUrl = 'bff/adminpanel/Plant'; 

  http =inject(HttpClient);

  addPlant(plant: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, plant, { withCredentials: true });
  }
  deletePlant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
  getPlantByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
