import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  private hubConnection: signalR.HubConnection | undefined;
  private userJoinedSource = new Subject<string>();
  userJoined$ = this.userJoinedSource.asObservable(); // Observable to subscribe to

  constructor() {
    this.startConnection();
    if (this.hubConnection) {
      this.hubConnection.onclose(async () => {
        console.log('Disconnected from Hub');
        // Attempt to reconnect or inform the user
        await this.startConnection();
      });
    }
  }
  
  private async startConnection() {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      return; // Already connected
    }
  
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7056/roomHub', { withCredentials: true })
      .build();
  
    try {
      await this.hubConnection.start();
      console.log('SignalR Connected');
      this.hubConnection.on('ReceiveMessage', (message: string) => {
        this.userJoinedSource.next(message);
      });
    } catch (error) {
      console.error('Error connecting to SignalR:', error);
    }
  }

  async joinRoom(roomName: string, userId: string, password: string | null = null): Promise<void> {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('JoinRoom', roomName, userId, password);
        console.log(`Joined room: ${roomName} as user ${userId}`);
      } catch (error) {
        console.error('Error joining room:', error);
      }
    }
  }

  
  // Calls the backend CreateAndJoinRoom method
  async createAndJoinRoom(roomName: string) {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('CreateAndJoinRoom', roomName );
        console.log(`Room created and joined: ${roomName}`);
      } catch (error) {
        console.error('Error creating and joining room:', error);
      }
    }
  }

  // Calls the backend LeaveRoom method
  async leaveRoom(roomName: string, userId: string) {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('LeaveRoom', roomName, userId);
        console.log(`Left room: ${roomName} as user ${userId}`);
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    }
  }

  // Calls the backend TerminateProcess method to close the room
  async terminateProcess(roomName: string) {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('TerminateProcess', roomName);
        console.log(`Room terminated: ${roomName}`);
      } catch (error) {
        console.error('Error terminating room:', error);
      }
    }
  }
 
}
