import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.panelApiUrl + 'bff/adminpanel/Movie'; 

  http =inject(HttpClient);

  addMovie(movie: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, movie, { withCredentials: true });
  }
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
  getMovieByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`, { withCredentials: true });
  }
}
