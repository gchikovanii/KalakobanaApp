import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private baseUrl = 'api/Animal'; 

  http =inject(HttpClient);

  addAnimal(animal: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, animal);
  }
  deleteAnimal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAnimalByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`);
  }
}
