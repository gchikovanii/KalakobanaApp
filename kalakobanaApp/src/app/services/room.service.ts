import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room';
import { CreateRoomRequest } from '../Models/createRoomRequest';
import { RoomResponse } from '../Models/roomRespose';
import * as signalR from '@microsoft/signalr';
import { JoinRoomRequest, LeaveRoomRequest } from '../Models/JoinRoomRequest';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private hubConnection: signalR.HubConnection | undefined;

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
  // Create a new room
  createRoom(roomRequest: CreateRoomRequest): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}`, roomRequest, { withCredentials: true });
  }
  // Remove a room by name
  deleteRoomByName(roomName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/by-name/${roomName}`, { withCredentials: true });
  }

  // Join room signal handler
  joinRoom(joinRoomRequest: JoinRoomRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/join`, joinRoomRequest, { withCredentials: true });
  }

  // Leave a room
  leaveRoom(leaveRoomRequest: LeaveRoomRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/leave`, leaveRoomRequest, { withCredentials: true });
  }
}
