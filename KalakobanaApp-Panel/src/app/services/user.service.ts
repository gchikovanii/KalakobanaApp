import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../models/CustomUser';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<CustomUser> {
    return this.http.get<CustomUser>(`${this.apiUrl}/urls/getting-by-email/${email}`, { withCredentials: true });
  }
  updateStatus(user: CustomUser): Observable<any> {
    const url = `${this.apiUrl}/urls/update-status`;
    console.log(`Updating status for ${user.email} to ${user.active ? 'active' : 'inactive'}`);
    return this.http.put(url, user);
  }
}
