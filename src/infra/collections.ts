export interface Class {
  id: string;
  name: string;
  roles: number;
  level: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Character {
  id: string;
  name: string;
  class: Class;
  user: User;
  level: number;
  roles: number;
}

export interface Dungeon {
  id: string;
  name: string;
  suggestedLevel: number;
}

export interface DungeonEvent {
  id: string;
  dungeon: Dungeon;
  scheduledAt: Date;
  participants: Character[];
}
