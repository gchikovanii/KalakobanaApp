import { GameMode } from "./GameMode";

export interface RoomResponse {
    id: string;
    name: string;
    currentUserInRoomCount: number;
    maxUsersInRoomCount: number;
    password: string | null;
    gameMode: GameMode; 
    status: boolean; 
  }