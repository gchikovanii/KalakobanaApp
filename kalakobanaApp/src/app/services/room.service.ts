import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Room } from '../Models/room';
import { CreateRoomRequest } from '../Models/createRoomRequest';
import { RoomResponse } from '../Models/roomRespose';
import { JoinRoomRequest, LeaveRoomRequest } from '../Models/JoinRoomRequest';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'https://localhost:7250/bff/room'; 

  constructor(private http: HttpClient) {}

  // Get all rooms
  getRooms(): Observable<RoomResponse[]> {
    return this.http.get<RoomResponse[]>(`${this.apiUrl}`, { withCredentials: true });
  }
  // Get a room by name
  getRoomByName(roomName: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/by-name/${roomName}`, { withCredentials: true });
  }

  // Remove a room by name
  deleteRoomByName(roomName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/by-name/${roomName}`, { withCredentials: true });
  }
  // Create a new room
  createRoom(roomRequest: CreateRoomRequest): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}`, roomRequest, { withCredentials: true });
  }
 // Join room method
  joinRoom(joinRoomRequest: JoinRoomRequest): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/join`, joinRoomRequest, { withCredentials: true });
  }


  // Leave a room
  async leaveRoom(leaveRoomRequest: LeaveRoomRequest): Promise<void> {
    try {
      await lastValueFrom(
        this.http.post<void>(`${this.apiUrl}/leave`, leaveRoomRequest, { withCredentials: true })
      );
    } catch (error) {
      console.error('Error leaving room:', error);
      throw error; // Rethrow to handle in calling function if needed
    }
  }
}
