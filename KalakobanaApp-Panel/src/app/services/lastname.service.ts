import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastnameService {
  private baseUrl = 'api/LastName'; 

  http =inject(HttpClient);

  addLastName(lastName: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, lastName);
  }
  deleteLastName(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getLastNameByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`);
  }
}
