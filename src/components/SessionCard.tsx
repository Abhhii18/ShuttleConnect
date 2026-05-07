import React from 'react';
import { Session, Player, Venue } from '../types';
import { MapPin, Users, Zap, Clock, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui';
import { MOCK_PLAYERS, MOCK_VENUES } from '../constants';

interface SessionCardProps {
  session: Session;
  onClick: () => void;
  key?: string | number;
}

export function SessionCard({ session, onClick }: SessionCardProps) {
  const organizer = MOCK_PLAYERS.find(p => p.id === session.organizerId);
  const venue = MOCK_VENUES.find(v => v.id === session.venueId);

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-paper-lines rounded-[2rem] p-6 hover:border-black transition-all cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-black/5"
    >
      {session.isBoosted && (
        <div className="absolute -top-3 left-8 z-10 glass px-4 py-1 rounded-full flex items-center gap-2 border-neon/50">
          <Zap className="w-3 h-3 fill-neon text-black" />
          <span className="text-[10px] font-display font-bold uppercase tracking-widest">Boosted</span>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-display font-bold text-muted-foreground uppercase tracking-widest">
            {session.sport} 
            <span className="w-1 h-1 rounded-full bg-paper-lines" />
            Tier {session.reliabilityTier}
          </div>
          <h3 className="text-2xl font-display font-bold group-hover:italic transition-all leading-tight">{session.title}</h3>
        </div>
        <Badge variant={session.level === 'Advanced' || session.level === 'Pro' ? 'default' : 'secondary'} className="rounded-lg h-8">
          {session.level}
        </Badge>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{session.date} • {session.time}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="w-4 h-4 text-black" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-black">{venue?.name}</span>
            <span className="text-[10px] uppercase tracking-wider">{venue?.location}</span>
          </div>
          {venue?.isVerified && <ShieldCheck className="w-4 h-4 text-neon ml-auto" />}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-paper-lines">
        <div className="flex -space-x-2">
          {session.joinedPlayers.map((pid, i) => {
            const player = MOCK_PLAYERS.find(p => p.id === pid);
            return (
              <div 
                key={pid} 
                className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-muted"
                title={player?.name}
              >
                <img src={player?.image} alt={player?.name} />
              </div>
            );
          })}
          {Array.from({ length: session.totalPlayers - session.joinedPlayers.length }).map((_, i) => (
            <div 
              key={i} 
              className="w-10 h-10 rounded-full border-2 border-white bg-muted/50 flex items-center justify-center"
            >
              <Users className="w-4 h-4 opacity-20" />
            </div>
          ))}
        </div>
        
        <div className="text-right">
          <p className="text-[9px] font-display font-bold uppercase tracking-widest opacity-40 mb-1">Entry Split</p>
          <p className="text-xl font-display font-bold">${session.costPerHead}<span className="text-[10px] font-normal opacity-40 ml-1">USD</span></p>
        </div>
      </div>

      {session.urgencyTag && (
        <div className="mt-4 flex items-center justify-center py-2 bg-red-50 rounded-xl">
          <span className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.2em]">
            {session.urgencyTag}
          </span>
        </div>
      )}
    </div>
  );
}
