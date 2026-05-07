import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronRight, Zap } from 'lucide-react';
import { SessionCard } from '../components/SessionCard';
import { MOCK_SESSIONS, MOCK_VENUES } from '../constants';
import { Button, Badge, ScrollArea, ScrollBar } from '@/components/ui';

import { Session } from '../types';

export function DiscoverPage({ sessions, onSelectSession, onCreateSession }: { sessions: Session[], onSelectSession: (id: string) => void, onCreateSession: () => void }) {
  const [activeSport, setActiveSport] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const sports = ['All', 'Badminton', 'Tennis', 'Squash'];

  const filteredSessions = sessions.filter(session => {
    const venue = MOCK_VENUES.find(v => v.id === session.venueId);
    const matchesSport = activeSport === 'All' || session.sport === activeSport;
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         session.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const boostedSessions = filteredSessions.filter(s => s.isBoosted);
  const regularSessions = filteredSessions.filter(s => !s.isBoosted);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      {/* Search & Filter Header */}
      <header className="px-6 md:px-8 pt-8 pb-4 shrink-0 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 max-w-2xl relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="Search sessions, venues, or discipline..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-16 pr-8 bg-muted/30 border-2 border-transparent focus:border-black focus:bg-white rounded-3xl outline-none font-display font-medium text-lg transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-16 w-16 p-0 rounded-3xl border-2 shrink-0">
               <SlidersHorizontal className="w-6 h-6" />
             </Button>
             <Button 
                onClick={onCreateSession}
                className="h-16 px-8 flex-1 md:flex-none md:px-10 bg-black text-white rounded-3xl font-display font-bold text-lg"
             >
               New Session
             </Button>
          </div>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-4">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`h-12 px-8 rounded-2xl font-display font-bold text-[10px] uppercase tracking-widest transition-all shrink-0 ${
                  activeSport === sport 
                    ? 'bg-neon text-black shadow-lg shadow-neon/20' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 md:px-8 pb-32">
        {/* Dynamic Highlights Section */}
        {boostedSessions.length > 0 && (
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter uppercase italic">Elite Protocols</h2>
              <button className="text-[10px] font-display font-bold text-muted-foreground hover:text-black flex items-center gap-1 group uppercase tracking-widest">
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boostedSessions.map((session) => (
                <SessionCard 
                  key={session.id} 
                  session={session} 
                  onClick={() => onSelectSession(session.id)} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Promotion Banner */}
        <section className="mb-12">
          <div className="bg-black rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 group">
            <div className="absolute top-0 right-0 p-12 opacity-10 flex flex-col items-end">
              <p className="font-display text-[100px] md:text-[150px] leading-none font-bold select-none text-white italic">BOOST</p>
            </div>
            <div className="relative z-10 space-y-6 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon text-black font-display text-[10px] font-black uppercase tracking-widest">
                <Zap className="w-3 h-3 fill-black" /> Pro-Tier Feature
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-display font-black text-white leading-tight uppercase italic tracking-tighter">Elevate Your Protocol.</h3>
                <p className="text-white/60 text-lg">Push your protocol to the top of the board for instant squad completion.</p>
              </div>
              <Button 
                onClick={() => alert('Initiating Boost Protocol...')}
                className="h-14 px-10 bg-neon text-black rounded-2xl font-display font-black text-lg shadow-xl shadow-neon/20 hover:scale-105 transition-transform"
              >
                Boost Now ($0.99)
              </Button>
            </div>
            <div className="hidden lg:flex flex-1 justify-end">
               <img 
                src="https://images.unsplash.com/photo-1595435064112-4f74d0e64096?auto=format&fit=crop&w=400&h=400" 
                alt="Boost" 
                className="w-64 h-64 rounded-full object-cover border-8 border-neon/20 p-2"
              />
            </div>
          </div>
        </section>

        {/* Categories / Grid */}
        <section className="pb-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-display font-bold uppercase italic">{activeSport === 'All' ? 'Battle Ground' : `${activeSport} Sector`}</h2>
            <div className="flex-1 h-[1px] bg-paper-lines" />
          </div>
          
          {regularSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularSessions.map((session) => (
                <SessionCard 
                  key={`${session.id}-rec`} 
                  session={session} 
                  onClick={() => onSelectSession(session.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="p-20 text-center space-y-4 border border-dashed border-paper-lines rounded-[3rem]">
               <h3 className="text-2xl font-display font-bold uppercase opacity-20">No matching protocols found</h3>
               <p className="text-muted-foreground">Adjust your filters or search parameters to locate active sessions.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
