import { Player, Venue, Session, Squad } from './types';

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Alex Chen',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    reliabilityScore: 98,
    attendanceRate: 100,
    sportsmanshipRating: 4.9,
    isElite: true,
    isVerified: true,
    preferredSports: ['Badminton', 'Tennis'],
    stats: { wins: 45, losses: 12, streaks: 8 }
  },
  {
    id: 'p2',
    name: 'Sarah Miller',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    reliabilityScore: 92,
    attendanceRate: 95,
    sportsmanshipRating: 4.8,
    isElite: false,
    isVerified: true,
    preferredSports: ['Squash'],
    stats: { wins: 32, losses: 18, streaks: 3 }
  },
  {
    id: 'p3',
    name: 'David Kim',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    reliabilityScore: 85,
    attendanceRate: 88,
    sportsmanshipRating: 4.5,
    isElite: false,
    isVerified: false,
    preferredSports: ['Tennis'],
    stats: { wins: 21, losses: 24, streaks: 1 }
  }
];

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'The Arena Center',
    location: 'Downtown District',
    rating: 4.9,
    isVerified: true,
    isPartner: true,
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=600&fit=crop'
    ],
    priceRange: '$$',
    availability: 'Open until 11 PM'
  },
  {
    id: 'v2',
    name: 'Elite Racket Club',
    location: 'North Hill',
    rating: 4.7,
    isVerified: true,
    isPartner: false,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563604859062-811eb11c039c?w=800&h=600&fit=crop'
    ],
    priceRange: '$$$',
    availability: 'Members Only'
  },
  {
    id: 'v3',
    name: 'Southside Smash',
    location: 'South Metro',
    rating: 4.5,
    isVerified: false,
    isPartner: true,
    image: 'https://images.unsplash.com/photo-1587280508204-ad7ef28e3dac?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587280508204-ad7ef28e3dac?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616429731117-640f0f4a8618?w=800&h=600&fit=crop'
    ],
    priceRange: '$',
    availability: 'Available 24/7'
  }
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    title: 'Advanced Drill & Match',
    sport: 'Badminton',
    level: 'Advanced',
    date: 'Oct 24, 2024',
    time: '08:00 - 10:00',
    venueId: 'v1',
    organizerId: 'p1',
    totalPlayers: 4,
    joinedPlayers: ['p1', 'p2'],
    costPerHead: 15,
    isBoosted: true,
    reliabilityTier: 'A',
    urgencyTag: 'Need 2 Players',
    description: 'Looking for consistent players for weekly morning drills. High intensity.'
  },
  {
    id: 's2',
    title: 'Social Squash Night',
    sport: 'Squash',
    level: 'Intermediate',
    date: 'Oct 25, 2024',
    time: '19:00 - 21:00',
    venueId: 'v1',
    organizerId: 'p2',
    totalPlayers: 2,
    joinedPlayers: ['p2'],
    costPerHead: 20,
    isBoosted: false,
    reliabilityTier: 'B',
    description: 'Casual squash followed by drinks. All intermediate levels welcome.'
  }
];

export const MOCK_SQUADS: Squad[] = [
  {
    id: 'sq1',
    name: 'The Shuttle Smashers',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    members: ['p1', 'p2'],
    chemistry: 94,
    ranking: 12,
    wins: 28
  }
];
