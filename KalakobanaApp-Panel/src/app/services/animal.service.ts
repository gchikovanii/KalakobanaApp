import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/Animal'; 

  http =inject(HttpClient);

  addAnimal(animal: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, animal, { withCredentials: true });
  }
  deleteAnimal(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${name}`, {
      withCredentials: true,
    });
  }

  getAnimalByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
