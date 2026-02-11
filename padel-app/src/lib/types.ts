export interface Venue {
  id: string;
  name: string;
  address: string;
  district: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  courtCount: number;
  amenities: string[];
  openTime: string;
  closeTime: string;
  phone: string;
  description: string;
}

export interface Match {
  id: string;
  venueId: string;
  venueName: string;
  district: string;
  date: string;
  time: string;
  level: "principiante" | "intermedio" | "avanzado" | "pro";
  currentPlayers: Player[];
  maxPlayers: number;
  creator: Player;
  type: "competitivo" | "amistoso";
  gender: "mixto" | "varones" | "damas";
  description: string;
  pricePerPlayer: number;
  duration: number;
}

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  district: string;
  matchesPlayed: number;
  wins: number;
  memberSince: string;
}

export interface User extends Player {
  email: string;
  phone: string;
  preferredHand: "izquierda" | "derecha";
  preferredPosition: "drive" | "revés" | "ambos";
  upcomingMatches: Match[];
  pastMatches: Match[];
}
