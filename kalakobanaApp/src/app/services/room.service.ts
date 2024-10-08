import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room';
import { CreateRoomRequest } from '../Models/createRoomRequest';
import { RoomResponse } from '../Models/roomRespose';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'https://localhost:7250/bff/room'; 
  private hubConnection: signalR.HubConnection | undefined;

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

  startHubConnection(roomName: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7250/hub/room?roomName=${roomName}`, {
        withCredentials: true
      })
      .build();

    return this.hubConnection.start()
      .then(() => console.log('SignalR connection established for room:', roomName))
      .catch(err => console.error('Error establishing SignalR connection:', err));
  }

  // Stop SignalR connection
  stopHubConnection(): Promise<void> {
    return this.hubConnection?.stop() || Promise.resolve();
  }

  // Join room signal handler
  joinRoom(roomName: string): Promise<void> {
    return this.hubConnection?.invoke('JoinRoom', roomName) || Promise.reject('No connection');
  }
}
