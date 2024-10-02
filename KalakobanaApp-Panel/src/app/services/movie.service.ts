import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'api/Movie'; 

  http =inject(HttpClient);

  addMovie(movie: { value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, movie);
  }
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getMovieByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetByName?name=${name}`);
  }
}
