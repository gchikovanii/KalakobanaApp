import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UpdateProfileDto } from '../Models/updateProfileDTO';
import { Observable } from 'rxjs';
import { UserDto } from '../Models/userAgg';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl; 
  http = inject(HttpClient);
  
  updateProfile(profileData: UpdateProfileDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-profile`, profileData, { withCredentials: true });
  }

  getProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/get-profile`, { withCredentials: true });
  }

}