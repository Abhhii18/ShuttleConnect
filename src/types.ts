export type SportType = 'Badminton' | 'Tennis' | 'Squash';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
export type ReliabilityLevel = 'A' | 'B' | 'C' | 'D';

export interface Player {
  id: string;
  name: string;
  image: string;
  reliabilityScore: number;
  attendanceRate: number;
  sportsmanshipRating: number;
  isElite?: boolean;
  isVerified?: boolean;
  isCoachVerified?: boolean;
  preferredSports: SportType[];
  stats: {
    wins: number;
    losses: number;
    streaks: number;
  };
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  isVerified?: boolean;
  isPartner?: boolean;
  image: string;
  images?: string[];
  priceRange: string;
  availability: string;
}

export interface Session {
  id: string;
  title: string;
  sport: SportType;
  level: SkillLevel;
  date: string;
  time: string;
  venueId: string;
  organizerId: string;
  totalPlayers: number;
  joinedPlayers: string[]; // Player IDs
  costPerHead: number;
  isBoosted?: boolean;
  reliabilityTier: ReliabilityLevel;
  urgencyTag?: string;
  description: string;
}

export interface Squad {
  id: string;
  name: string;
  image: string;
  members: string[]; // Player IDs
  chemistry: number;
  ranking: number;
  wins: number;
}
