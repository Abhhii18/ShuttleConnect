import React from 'react';
import { History as HistoryIcon, MapPin, Clock, ChevronRight } from 'lucide-react';
import { MOCK_SESSIONS, MOCK_VENUES } from '../constants';
import { Button, Badge } from '@/components/ui';

export function HistoryPage() {
  return (
    <div className="flex-1 min-h-screen bg-white p-8 lg:p-16">
      <header className="mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase italic">Combat Records</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">A logs of every protocol you've initiated or joined. Every win and every loss is recorded here.</p>
      </header>

      <div className="space-y-6">
        {MOCK_SESSIONS.map((session) => {
          const venue = MOCK_VENUES.find(v => v.id === session.venueId);
          return (
            <div key={session.id} className="p-8 border border-paper-lines rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-black transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                  <HistoryIcon className="w-8 h-8 opacity-20" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px]">{session.sport}</Badge>
                    <span className="text-xs font-display font-bold uppercase tracking-widest opacity-40">{session.date}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold">{session.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {venue?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40 mb-1">Performance</p>
                  <p className="text-xl font-display font-black text-neon">COMPLETED</p>
                </div>
                <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-2">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
