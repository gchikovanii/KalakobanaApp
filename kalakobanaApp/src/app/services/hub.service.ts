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
  userJoined$ = this.userJoinedSource.asObservable(); 


  private userLeftSource = new Subject<string>();
  userLeft$ = this.userLeftSource.asObservable();

  private roomTerminatedSource = new Subject<string>();
  roomTerminated$ = this.roomTerminatedSource.asObservable();
  constructor() {
    this.retryConnection(); // Start initial connection
  }
  
  private async retryConnection() {
    let retryAttempts = 0;
    const maxRetries = 5;
  
    while (retryAttempts < maxRetries) {
      // Start or retry the connection only if disconnected
      if (!this.hubConnection || this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
        await this.startConnection();
      }
  
      // Check if connected successfully
      if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
        console.log("Successfully connected to Hub");
        break;
      }
  
      // Increment retry count and wait before trying again
      retryAttempts++;
      console.warn(`Reconnection attempt ${retryAttempts} failed. Retrying...`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before retrying
    }
  
    if (retryAttempts >= maxRetries) {
      console.error('Max reconnection attempts reached. Unable to connect to Hub.');
    }
  }
  
  async startConnection() {
    if (!this.hubConnection || this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7056/roomHub', { withCredentials: true })
        .withAutomaticReconnect()
        .build();
  
      try {
        await this.hubConnection.start();
        console.log("Connection started");
  
        // Clear previous listeners to prevent duplication
        this.hubConnection.off('ReceiveMessageUserLeft');
        this.hubConnection.off('ReceiveMessage');
        this.hubConnection.off('ReceiveMessageTerminated');
  
        this.hubConnection.on('ReceiveMessageUserLeft', (message: string) => {
          console.log(`[ReceiveMessageUserLeft] ${new Date().toISOString()} - Message: ${message}`);
          this.userLeftSource.next(message);
        });
        
        this.hubConnection.on('ReceiveMessage', (message: string) => {
          console.log(`[ReceiveMessage] ${new Date().toISOString()} - Message: ${message}`);
          this.userJoinedSource.next(message);
        });
        
        this.hubConnection.on('ReceiveMessageTerminated', (message: string) => {
          console.log(`[ReceiveMessageTerminated] ${new Date().toISOString()} - Message: ${message}`);
          this.roomTerminatedSource.next(message);
        });
      } catch (error) {
        console.error('Error connecting to SignalR:', error);
      }
    }
  }
  
  async joinRoom(roomName: string, userId: string, password: string | null = null): Promise<void> {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('JoinRoom', roomName, userId, password);
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
      } catch (error) {
        console.error('Error creating and joining room:', error);
      }
    }
  }
  // Calls the backend LeaveRoom method
  async leaveRoom(roomName: string, userId: string): Promise<void> {
    if (this.hubConnection) {
      try {
        await this.hubConnection.invoke('LeaveRoom', roomName, userId);
        console.log('LeaveRoom invoked on backend');
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    }
  }
}
