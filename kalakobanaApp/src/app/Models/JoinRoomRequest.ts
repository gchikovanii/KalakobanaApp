export interface JoinRoomRequest{
    roomName: string;
    password: string | null;
}
export interface LeaveRoomRequest{
    roomName: string;
}