import React, { useState } from 'react';
import { MapPin, Star, ShieldCheck, ChevronRight, Search } from 'lucide-react';
import { MOCK_VENUES } from '../constants';
import { Button, Badge } from '@/components/ui';

export function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = MOCK_VENUES.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-white p-8 lg:p-16 overflow-y-auto">
      <header className="mb-16 space-y-6">
        <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none">Elite Venues</h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-medium">Access premium facilities across the globe. Verified quality and standard protocols guaranteed.</p>
        
        <div className="flex flex-col md:flex-row items-center gap-4 pt-8">
           <div className="relative flex-1 w-full max-w-2xl group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-black transition-colors" />
             <input 
              placeholder="Search cities, districts or clubs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-6 bg-muted/30 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl outline-none font-display font-bold text-lg transition-all" 
             />
           </div>
           <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 font-display font-bold uppercase tracking-widest text-[10px] w-full md:w-auto">Filter Facilities</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-32">
        {filteredVenues.length > 0 ? filteredVenues.map((venue, i) => (
          <div
            key={venue.id}
            className="group relative h-[400px] md:h-[500px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-xl"
          >
            <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-black/10 z-0" />
            
            <div className="absolute top-8 right-8 flex gap-3 z-10">
              {venue.images && venue.images.length > 1 && (
                <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-display font-bold uppercase tracking-widest border border-white/20">
                  {venue.images.length} Photos
                </div>
              )}
              {venue.isVerified && (
                <div className="bg-neon text-black p-3 rounded-full shadow-2xl scale-110">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white z-10">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-neon text-neon" />
                    <span className="font-display font-bold text-sm tracking-widest">{venue.rating}</span>
                  </div>
                  <span className="text-white/40 text-sm font-bold tracking-widest uppercase italic">• {venue.priceRange}</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black leading-tight uppercase italic tracking-tighter">{venue.name}</h3>
                <p className="font-display text-[9px] md:text-xs uppercase font-black tracking-[0.2em] opacity-60 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-neon" /> {venue.location}
                </p>
              </div>
              <Button 
                onClick={() => alert(`Detailed intelligence for ${venue.name} protocol coming soon.`)}
                className="h-12 w-12 md:h-14 md:w-14 p-0 rounded-full bg-white text-black hover:bg-neon transition-all hover:scale-110 group-hover:translate-x-2 shadow-2xl self-end md:self-auto shrink-0"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </Button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-32 text-center space-y-4 border-2 border-dashed border-paper-lines rounded-[4rem]">
            <Search className="w-16 h-16 mx-auto opacity-10" />
            <h3 className="text-2xl font-display font-bold uppercase opacity-20 italic">No facilities identified</h3>
            <p className="text-muted-foreground">Adjust your search parameters to locate active units.</p>
          </div>
        )}
      </div>
    </div>
  );
}
