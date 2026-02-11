import { Club, Court, Match, User, Booking, TimeSlot } from "./types";

export const clubs: Club[] = [
  {
    id: "club-1",
    name: "Padel City Madrid",
    address: "Calle de la Raqueta, 15",
    city: "Madrid",
    imageUrl: "/images/club1.jpg",
    rating: 4.7,
    reviewCount: 342,
    courts: [],
    amenities: ["Parking", "Showers", "Pro Shop", "Bar & Restaurant", "Lockers", "WiFi"],
    openTime: "07:00",
    closeTime: "23:00",
    phone: "+34 912 345 678",
    email: "info@padelcitymadrid.es",
    description: "Premium padel facility in the heart of Madrid featuring 8 state-of-the-art courts, professional coaching, and a vibrant social atmosphere.",
    latitude: 40.4168,
    longitude: -3.7038,
  },
  {
    id: "club-2",
    name: "Barcelona Padel Indoor",
    address: "Avinguda Diagonal, 220",
    city: "Barcelona",
    imageUrl: "/images/club2.jpg",
    rating: 4.5,
    reviewCount: 218,
    courts: [],
    amenities: ["Parking", "Showers", "Pro Shop", "Café", "Lockers"],
    openTime: "08:00",
    closeTime: "22:00",
    phone: "+34 933 456 789",
    email: "info@bcnpadelindoor.es",
    description: "Barcelona's premier indoor padel center with 6 climate-controlled courts and professional training programs for all levels.",
    latitude: 41.3874,
    longitude: 2.1686,
  },
  {
    id: "club-3",
    name: "Valencia Padel Club",
    address: "Carrer del Padel, 8",
    city: "Valencia",
    imageUrl: "/images/club3.jpg",
    rating: 4.8,
    reviewCount: 156,
    courts: [],
    amenities: ["Parking", "Showers", "Physiotherapy", "Bar", "Lockers", "Kids Area"],
    openTime: "07:00",
    closeTime: "23:00",
    phone: "+34 961 234 567",
    email: "info@valenciapadelclub.es",
    description: "Family-friendly padel club with outdoor and indoor courts, kids programs, and on-site physiotherapy services.",
    latitude: 39.4699,
    longitude: -0.3763,
  },
  {
    id: "club-4",
    name: "Sevilla Padel Center",
    address: "Avenida de Andalucía, 45",
    city: "Sevilla",
    imageUrl: "/images/club4.jpg",
    rating: 4.3,
    reviewCount: 89,
    courts: [],
    amenities: ["Parking", "Showers", "Pro Shop", "Café"],
    openTime: "08:00",
    closeTime: "22:00",
    phone: "+34 954 567 890",
    email: "info@sevillapadel.es",
    description: "Modern padel center in Sevilla offering competitive pricing and a welcoming community for players of all levels.",
    latitude: 37.3891,
    longitude: -5.9845,
  },
  {
    id: "club-5",
    name: "Malaga Beach Padel",
    address: "Paseo Marítimo, 120",
    city: "Málaga",
    imageUrl: "/images/club5.jpg",
    rating: 4.6,
    reviewCount: 275,
    courts: [],
    amenities: ["Parking", "Showers", "Beach Bar", "Lockers", "WiFi", "Equipment Rental"],
    openTime: "07:00",
    closeTime: "23:00",
    phone: "+34 952 678 901",
    email: "info@malagabeachpadel.es",
    description: "Play padel with stunning Mediterranean views. Our beachfront location offers an unbeatable padel experience.",
    latitude: 36.7213,
    longitude: -4.4214,
  },
  {
    id: "club-6",
    name: "Bilbao Padel Arena",
    address: "Gran Vía, 78",
    city: "Bilbao",
    imageUrl: "/images/club6.jpg",
    rating: 4.4,
    reviewCount: 134,
    courts: [],
    amenities: ["Parking", "Showers", "Pro Shop", "Restaurant", "Lockers", "Sauna"],
    openTime: "07:00",
    closeTime: "23:00",
    phone: "+34 944 789 012",
    email: "info@bilbaopadelarena.es",
    description: "Northern Spain's finest padel arena with top-tier facilities including sauna, restaurant, and professional coaching staff.",
    latitude: 43.263,
    longitude: -2.935,
  },
];

export const courts: Court[] = [
  // Club 1 courts
  { id: "court-1-1", clubId: "club-1", name: "Court 1 - Central", type: "indoor", surface: "artificial-grass", pricePerHour: 28, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control"] },
  { id: "court-1-2", clubId: "club-1", name: "Court 2 - Panoramic", type: "indoor", surface: "artificial-grass", pricePerHour: 32, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Panoramic Glass", "Climate Control", "Camera"] },
  { id: "court-1-3", clubId: "club-1", name: "Court 3 - Outdoor", type: "outdoor", surface: "artificial-grass", pricePerHour: 22, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Glass Walls"] },
  { id: "court-1-4", clubId: "club-1", name: "Court 4 - Premium", type: "indoor", surface: "artificial-grass", pricePerHour: 36, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control", "Camera", "VIP Seating"] },
  // Club 2 courts
  { id: "court-2-1", clubId: "club-2", name: "Court A", type: "indoor", surface: "artificial-grass", pricePerHour: 26, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control"] },
  { id: "court-2-2", clubId: "club-2", name: "Court B", type: "indoor", surface: "artificial-grass", pricePerHour: 26, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control"] },
  { id: "court-2-3", clubId: "club-2", name: "Court C - Championship", type: "indoor", surface: "artificial-grass", pricePerHour: 34, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Panoramic Glass", "Climate Control", "Camera", "Spectator Seating"] },
  // Club 3 courts
  { id: "court-3-1", clubId: "club-3", name: "Pista 1", type: "outdoor", surface: "artificial-grass", pricePerHour: 20, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Glass Walls"] },
  { id: "court-3-2", clubId: "club-3", name: "Pista 2", type: "outdoor", surface: "artificial-grass", pricePerHour: 20, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Glass Walls"] },
  { id: "court-3-3", clubId: "club-3", name: "Pista 3 - Indoor", type: "indoor", surface: "artificial-grass", pricePerHour: 28, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control"] },
  { id: "court-3-4", clubId: "club-3", name: "Pista Kids", type: "outdoor", surface: "artificial-grass", pricePerHour: 14, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Reduced Size"] },
  // Club 4 courts
  { id: "court-4-1", clubId: "club-4", name: "Court 1", type: "indoor", surface: "artificial-grass", pricePerHour: 22, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls"] },
  { id: "court-4-2", clubId: "club-4", name: "Court 2", type: "outdoor", surface: "artificial-grass", pricePerHour: 18, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Glass Walls"] },
  // Club 5 courts
  { id: "court-5-1", clubId: "club-5", name: "Beach Court 1", type: "outdoor", surface: "artificial-grass", pricePerHour: 24, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Glass Walls", "Sea View"] },
  { id: "court-5-2", clubId: "club-5", name: "Beach Court 2", type: "outdoor", surface: "artificial-grass", pricePerHour: 24, imageUrl: "/images/court-outdoor.jpg", features: ["Floodlights", "Glass Walls", "Sea View"] },
  { id: "court-5-3", clubId: "club-5", name: "Premium Indoor", type: "indoor", surface: "artificial-grass", pricePerHour: 30, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control", "Camera"] },
  // Club 6 courts
  { id: "court-6-1", clubId: "club-6", name: "Arena Court 1", type: "indoor", surface: "artificial-grass", pricePerHour: 26, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control"] },
  { id: "court-6-2", clubId: "club-6", name: "Arena Court 2", type: "indoor", surface: "artificial-grass", pricePerHour: 26, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Glass Walls", "Climate Control"] },
  { id: "court-6-3", clubId: "club-6", name: "Arena Court 3", type: "indoor", surface: "artificial-grass", pricePerHour: 30, imageUrl: "/images/court-indoor.jpg", features: ["LED Lighting", "Panoramic Glass", "Climate Control", "Camera"] },
];

// Assign courts to clubs
clubs.forEach((club) => {
  club.courts = courts.filter((c) => c.clubId === club.id);
});

const samplePlayers = [
  { id: "player-1", name: "Carlos García", avatarUrl: "/images/avatar1.jpg", level: 4.2, matchesPlayed: 156, wins: 89 },
  { id: "player-2", name: "María López", avatarUrl: "/images/avatar2.jpg", level: 3.8, matchesPlayed: 98, wins: 52 },
  { id: "player-3", name: "Alejandro Ruiz", avatarUrl: "/images/avatar3.jpg", level: 5.1, matchesPlayed: 234, wins: 167 },
  { id: "player-4", name: "Laura Martínez", avatarUrl: "/images/avatar4.jpg", level: 3.5, matchesPlayed: 67, wins: 31 },
  { id: "player-5", name: "Pablo Hernández", avatarUrl: "/images/avatar5.jpg", level: 4.8, matchesPlayed: 189, wins: 121 },
  { id: "player-6", name: "Ana Fernández", avatarUrl: "/images/avatar6.jpg", level: 4.0, matchesPlayed: 112, wins: 63 },
  { id: "player-7", name: "Diego Torres", avatarUrl: "/images/avatar7.jpg", level: 2.9, matchesPlayed: 45, wins: 18 },
  { id: "player-8", name: "Sofía Ramírez", avatarUrl: "/images/avatar8.jpg", level: 3.2, matchesPlayed: 78, wins: 35 },
];

export const matches: Match[] = [
  {
    id: "match-1",
    clubId: "club-1",
    clubName: "Padel City Madrid",
    courtId: "court-1-1",
    courtName: "Court 1 - Central",
    date: "2026-02-15",
    time: "18:00",
    level: "intermediate",
    currentPlayers: [samplePlayers[0], samplePlayers[1]],
    maxPlayers: 4,
    creator: samplePlayers[0],
    type: "friendly",
    gender: "mixed",
    description: "Looking for 2 more players for a fun evening match. Intermediate level preferred.",
    pricePerPlayer: 7,
  },
  {
    id: "match-2",
    clubId: "club-1",
    clubName: "Padel City Madrid",
    courtId: "court-1-4",
    courtName: "Court 4 - Premium",
    date: "2026-02-16",
    time: "10:00",
    level: "advanced",
    currentPlayers: [samplePlayers[2], samplePlayers[4], samplePlayers[5]],
    maxPlayers: 4,
    creator: samplePlayers[2],
    type: "competitive",
    gender: "mixed",
    description: "Competitive match on the premium court. Need 1 more advanced player!",
    pricePerPlayer: 9,
  },
  {
    id: "match-3",
    clubId: "club-2",
    clubName: "Barcelona Padel Indoor",
    courtId: "court-2-3",
    courtName: "Court C - Championship",
    date: "2026-02-15",
    time: "20:00",
    level: "pro",
    currentPlayers: [samplePlayers[2]],
    maxPlayers: 4,
    creator: samplePlayers[2],
    type: "competitive",
    gender: "male",
    description: "High-level competitive match. Minimum level 4.5 required.",
    pricePerPlayer: 8.5,
  },
  {
    id: "match-4",
    clubId: "club-3",
    clubName: "Valencia Padel Club",
    courtId: "court-3-1",
    courtName: "Pista 1",
    date: "2026-02-17",
    time: "17:00",
    level: "beginner",
    currentPlayers: [samplePlayers[6], samplePlayers[7]],
    maxPlayers: 4,
    creator: samplePlayers[6],
    type: "friendly",
    gender: "mixed",
    description: "Beginner-friendly match! Come enjoy some padel in a relaxed atmosphere.",
    pricePerPlayer: 5,
  },
  {
    id: "match-5",
    clubId: "club-5",
    clubName: "Malaga Beach Padel",
    courtId: "court-5-1",
    courtName: "Beach Court 1",
    date: "2026-02-16",
    time: "09:00",
    level: "intermediate",
    currentPlayers: [samplePlayers[1], samplePlayers[3]],
    maxPlayers: 4,
    creator: samplePlayers[1],
    type: "friendly",
    gender: "female",
    description: "Morning beach padel session. Ladies only, intermediate level.",
    pricePerPlayer: 6,
  },
  {
    id: "match-6",
    clubId: "club-6",
    clubName: "Bilbao Padel Arena",
    courtId: "court-6-3",
    courtName: "Arena Court 3",
    date: "2026-02-18",
    time: "19:30",
    level: "advanced",
    currentPlayers: [samplePlayers[4]],
    maxPlayers: 4,
    creator: samplePlayers[4],
    type: "competitive",
    gender: "mixed",
    description: "Looking for 3 competitive players for an intense session.",
    pricePerPlayer: 7.5,
  },
];

export const currentUser: User = {
  id: "user-1",
  name: "Carlos García",
  email: "carlos.garcia@email.com",
  phone: "+34 612 345 678",
  avatarUrl: "/images/avatar1.jpg",
  level: 4.2,
  matchesPlayed: 156,
  wins: 89,
  preferredHand: "right",
  preferredPosition: "drive",
  city: "Madrid",
  memberSince: "2024-03-15",
  bookings: [
    {
      id: "booking-1",
      courtId: "court-1-1",
      clubId: "club-1",
      courtName: "Court 1 - Central",
      clubName: "Padel City Madrid",
      date: "2026-02-15",
      time: "18:00",
      duration: 90,
      players: ["Carlos García", "María López", "Player 3", "Player 4"],
      totalPrice: 42,
      status: "confirmed",
    },
    {
      id: "booking-2",
      courtId: "court-1-4",
      clubId: "club-1",
      courtName: "Court 4 - Premium",
      clubName: "Padel City Madrid",
      date: "2026-02-20",
      time: "10:00",
      duration: 90,
      players: ["Carlos García", "Alejandro Ruiz"],
      totalPrice: 54,
      status: "pending",
    },
  ],
};

export function generateTimeSlots(court: Court, date: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const basePrice = court.pricePerHour;

  for (let hour = 7; hour <= 22; hour++) {
    for (const minutes of ["00", "30"]) {
      if (hour === 22 && minutes === "30") continue;
      const time = `${hour.toString().padStart(2, "0")}:${minutes}`;

      // Peak hours: 17:00-21:00 weekdays, 9:00-14:00 weekends
      const isPeakHour = hour >= 17 && hour <= 21;
      const price = isPeakHour ? basePrice * 1.3 : basePrice;

      // Randomly make some slots unavailable for demo
      const seed = hashCode(`${court.id}-${date}-${time}`);
      const available = seed % 3 !== 0;

      slots.push({
        time,
        available,
        price: Math.round(price * 100) / 100,
      });
    }
  }
  return slots;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getClubById(id: string): Club | undefined {
  return clubs.find((c) => c.id === id);
}

export function getCourtById(id: string): Court | undefined {
  return courts.find((c) => c.id === id);
}

export function getCourtsByClubId(clubId: string): Court[] {
  return courts.filter((c) => c.clubId === clubId);
}

export function getMatchesByClub(clubId: string): Match[] {
  return matches.filter((m) => m.clubId === clubId);
}

export function getOpenMatches(): Match[] {
  return matches.filter((m) => m.currentPlayers.length < m.maxPlayers);
}
