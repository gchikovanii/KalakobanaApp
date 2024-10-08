import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/Plant'; 

  http =inject(HttpClient);

  addPlant(plant: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, plant, { withCredentials: true });
  }
  deletePlant(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${name}`, {
      withCredentials: true,
    });
  }
  getPlantByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
