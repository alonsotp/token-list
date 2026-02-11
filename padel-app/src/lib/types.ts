export interface Club {
  id: string;
  name: string;
  address: string;
  city: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  courts: Court[];
  amenities: string[];
  openTime: string;
  closeTime: string;
  phone: string;
  email: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface Court {
  id: string;
  clubId: string;
  name: string;
  type: "indoor" | "outdoor";
  surface: "artificial-grass" | "concrete" | "glass";
  pricePerHour: number;
  imageUrl: string;
  features: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  courtId: string;
  clubId: string;
  courtName: string;
  clubName: string;
  date: string;
  time: string;
  duration: number;
  players: string[];
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
}

export interface Match {
  id: string;
  clubId: string;
  clubName: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  level: "beginner" | "intermediate" | "advanced" | "pro";
  currentPlayers: Player[];
  maxPlayers: number;
  creator: Player;
  type: "competitive" | "friendly";
  gender: "mixed" | "male" | "female";
  description: string;
  pricePerPlayer: number;
}

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  matchesPlayed: number;
  wins: number;
}

export interface User extends Player {
  email: string;
  phone: string;
  preferredHand: "left" | "right";
  preferredPosition: "drive" | "backhand" | "both";
  city: string;
  memberSince: string;
  bookings: Booking[];
}
