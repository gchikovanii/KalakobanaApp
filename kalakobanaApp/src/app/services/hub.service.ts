import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  private hubConnection!: signalR.HubConnection;
  private startHubConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/roomHub`) // Adjust API URL as necessary
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Hub connection started.'))
      .catch(error => console.error('Error establishing SignalR connection:', error));

    // Listen for messages from the server
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('Message received:', message);
      // Handle the incoming message (e.g., display it in the UI)
    });

    this.hubConnection.on('ReceiveMessageUerLeft', (message: string) => {
      console.log('User left message received:', message);
      // Handle the user left message
    });
  }

  // Calls the backend CreateAndJoinRoom method
  async createAndJoinRoom(roomName: string) {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('CreateAndJoinRoom', { Name: roomName });
        console.log(`Room created and joined: ${roomName}`);
      } catch (error) {
        console.error('Error creating and joining room:', error);
      }
    }
  }

  // Calls the backend JoinRoom method
  async joinRoom(roomName: string, userId: string, password: string | null = null) {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('JoinRoom', roomName, userId, password);
        console.log(`Joined room: ${roomName} as user ${userId}`);
      } catch (error) {
        console.error('Error joining room:', error);
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
  constructor() {
    this.startHubConnection();
   }
}
