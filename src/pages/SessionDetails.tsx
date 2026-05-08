import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  Zap, 
  Share2, 
  MoreHorizontal,
  ChevronRight,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Session, Player, Venue } from '../types';
import { MOCK_PLAYERS, MOCK_VENUES, MOCK_SESSIONS } from '../constants';
import { type View } from '../components/Navigation';

interface SessionDetailsProps {
  sessionId: string;
  sessions: Session[];
  currentUserId: string;
  onBack: () => void;
  onJoin: (sessionId: string) => void;
  onLeave: (sessionId: string) => void;
}

export function SessionDetailsPage({ sessionId, sessions, currentUserId, onBack, onJoin, onLeave }: SessionDetailsProps) {
  const session = sessions.find(s => s.id === sessionId) || sessions[0];
  const organizer = MOCK_PLAYERS.find(p => p.id === session.organizerId);
  const venue = MOCK_VENUES.find(v => v.id === session.venueId);
  const joinedPlayers = session.joinedPlayers.map(pid => MOCK_PLAYERS.find(p => p.id === pid)).filter(Boolean) as Player[];

  const slotsLeft = session.totalPlayers - session.joinedPlayers.length;
  const isJoined = session.joinedPlayers.includes(currentUserId);
  const isFull = session.joinedPlayers.length >= session.totalPlayers;

  return (
    <div className="flex-1 min-h-screen bg-white">
      {/* Header / Cover */}
      <header className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={venue?.image} 
          alt={venue?.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        
        <div className="absolute top-8 left-8 flex gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-12 h-12 p-0 rounded-2xl bg-white/80 backdrop-blur-md border-white/20 shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute top-8 right-8 flex gap-3">
          <Button variant="outline" className="w-12 h-12 p-0 rounded-2xl bg-white/80 backdrop-blur-md border-white/20 shadow-xl">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="w-12 h-12 p-0 rounded-2xl bg-white/80 backdrop-blur-md border-white/20 shadow-xl">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 md:-mt-24 pb-32 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-black/5 border border-paper-lines">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-neon text-black border-none px-4 py-1 font-display font-bold text-[10px] uppercase tracking-widest">{session.sport}</Badge>
                <Badge variant="outline" className="border-black px-4 py-1 font-display font-bold text-[10px] uppercase tracking-widest">{session.level}</Badge>
                {session.isBoosted && (
                  <Badge className="bg-black text-neon border-none px-4 py-1 font-display font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-neon" /> Boosted
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9] break-words">{session.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-8 py-6 border-y border-paper-lines">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                       <Clock className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Time & Date</p>
                       <p className="font-display font-bold">{session.date} @ {session.time}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-neon">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Location</p>
                       <p className="font-display font-bold">{venue?.name}</p>
                    </div>
                 </div>
              </div>
            </div>

            <section className="space-y-6">
               <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Protocol Description</h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 {session.description || "No specific details provided for this protocol. Standard racket rules apply."}
               </p>
            </section>

            <section className="space-y-8">
               <div className="flex items-baseline justify-between border-b border-paper-lines pb-6">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Current Squad ({session.joinedPlayers.length}/{session.totalPlayers})</h2>
                  <p className="text-xs font-display font-bold text-muted-foreground uppercase tracking-widest">{slotsLeft} Slots Remaining</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {joinedPlayers.map((player) => (
                    <div key={player.id} className="p-6 border border-paper-lines rounded-3xl flex items-center gap-6 group hover:border-black transition-all">
                       <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                          <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center gap-2">
                             <h4 className="font-display font-bold uppercase">{player.name}</h4>
                             {player.isElite && <Zap className="w-3 h-3 fill-neon text-neon" />}
                          </div>
                          <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Reliability {player.reliabilityScore}%</p>
                       </div>
                       <Button variant="outline" className="w-10 h-10 p-0 rounded-xl border-2">
                          <ChevronRight className="w-4 h-4" />
                       </Button>
                    </div>
                  ))}
                  {Array.from({ length: slotsLeft }).map((_, i) => (
                    <div key={i} className="p-6 border-2 border-dashed border-paper-lines rounded-3xl flex items-center justify-center bg-muted/5 opacity-40">
                       <span className="font-display text-[10px] uppercase font-bold tracking-[0.2em]">Awaiting Unit</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-4">
             <div className="sticky top-8 space-y-6">
                <div className="p-8 bg-black text-white rounded-[3rem] shadow-2xl space-y-8">
                   <div className="space-y-2">
                      <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Entry Commitment</p>
                      <div className="flex items-baseline gap-2">
                         <span className="text-5xl font-display font-black tracking-tighter">${session.costPerHead}</span>
                         <span className="text-xs opacity-60">USD / HR</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-2xl border border-white/10">
                         <ShieldCheck className="w-4 h-4 text-neon" />
                         <span className="text-xs font-display font-bold uppercase tracking-wider">Refundable until 24h prior</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-2xl border border-white/10">
                         <Users className="w-4 h-4 text-white" />
                         <span className="text-xs font-display font-bold uppercase tracking-wider">Shared Venue Access</span>
                      </div>
                   </div>

                   {isJoined ? (
                     <Button 
                      onClick={() => onLeave(sessionId)}
                      variant="outline"
                      className="w-full h-16 border-white/20 text-white hover:bg-white/10 rounded-2xl font-display font-black text-lg transition-all bg-transparent"
                     >
                       Leave Protocol
                     </Button>
                   ) : (
                     <Button 
                      disabled={isFull}
                      onClick={() => onJoin(sessionId)}
                      className="w-full h-16 bg-neon text-black rounded-2xl font-display font-black text-lg shadow-xl shadow-neon/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isFull ? 'Sector Full' : 'Initiate Protocol'}
                     </Button>
                   )}
                   
                   <p className="text-[9px] text-center uppercase tracking-widest opacity-40">Transaction secured by ShuttleConnect</p>
                </div>

                <div className="p-8 border border-paper-lines rounded-[3rem] bg-white space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden">
                         <img src={organizer?.image} alt={organizer?.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Protocol Lead</p>
                         <h4 className="font-display font-bold">{organizer?.name}</h4>
                      </div>
                   </div>
                   <Button variant="outline" className="w-full h-12 rounded-xl flex items-center gap-2 border-2">
                      <MessageSquare className="w-4 h-4" /> Message Lead
                   </Button>
                </div>

                <div className="flex items-start gap-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                   <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
                   <p className="text-xs font-medium text-red-600 leading-relaxed">
                     Failure to attend without 24h notice will result in a 20% Reliability Score reduction.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
