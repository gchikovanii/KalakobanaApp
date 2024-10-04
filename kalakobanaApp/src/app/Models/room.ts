export interface Room {
    name: string;
    password?: string;
    maxUsersInRoomCount: number;
    gameMode: string;
    rounds: number;
    adminId: string;
    settings: {
      includeFirstName: boolean;
      includeLastName: boolean;
      includeCity: boolean;
      includeCountry: boolean;
      includeAnimal: boolean;
      includePlant: boolean;
      includeMovie: boolean;
      includeRiver: boolean;
    };
  }