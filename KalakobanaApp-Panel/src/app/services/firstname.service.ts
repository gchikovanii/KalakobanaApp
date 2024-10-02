import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstnameService {
  private baseUrl = 'api/FirstName'; 

  http =inject(HttpClient);

  addFirstName(firstName: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, firstName);
  }
  deleteFirstName(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getFirstNameByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`);
  }
}
