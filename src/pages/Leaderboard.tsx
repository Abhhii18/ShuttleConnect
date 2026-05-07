import React from 'react';
import { Trophy, Zap, Award, Star, ChevronRight, LayoutGrid } from 'lucide-react';
import { MOCK_PLAYERS } from '../constants';
import { Button, Badge } from '@/components/ui';

export function LeaderboardPage() {
  const topPlayers = [...MOCK_PLAYERS].sort((a, b) => b.stats.wins - a.stats.wins);

  return (
    <div className="flex-1 min-h-screen bg-white p-6 md:p-16 overflow-y-auto">
      <header className="mb-16 space-y-6">
        <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none">The Elite List</h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-medium">The highest-performing assets in the ShuttleConnect network. Rank is determined by win/loss ratio and reliability score.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.4em] opacity-40 mb-6">Top Performers</h3>
          {topPlayers.map((player, i) => (
            <div 
              key={player.id} 
              className={`p-6 border rounded-[2.5rem] flex items-center gap-4 md:gap-6 transition-all hover:scale-[1.01] cursor-pointer ${
                i === 0 ? 'bg-black text-white border-black shadow-2xl relative overflow-hidden' : 'bg-white border-paper-lines'
              }`}
              onClick={() => alert(`Operational data for ${player.name} is classified.`)}
            >
              {i === 0 && (
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Trophy className="w-32 h-32 text-neon" />
                </div>
              )}
              
              <div className="w-8 md:w-12 text-center shrink-0">
                <span className={`text-xl md:text-3xl font-display font-black ${i === 0 ? 'text-neon' : 'text-muted-foreground opacity-40'}`}>
                  {i + 1}
                </span>
              </div>
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 shadow-lg">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-display font-black uppercase italic truncate">{player.name}</h3>
                  {player.isElite && <Zap className="w-4 h-4 text-neon fill-neon" />}
                </div>
                <p className={`text-[8px] md:text-[10px] font-display font-bold uppercase tracking-widest truncate ${i === 0 ? 'text-white/40' : 'text-muted-foreground opacity-40'}`}>
                   {player.preferredSports.join(' • ')}
                </p>
              </div>

              <div className="flex items-center gap-6 md:gap-12 mr-2 md:mr-8 shrink-0">
                 <div className="text-right">
                    <p className={`text-[8px] md:text-[9px] font-display font-bold uppercase tracking-widest ${i === 0 ? 'text-white/30' : 'text-muted-foreground opacity-40'}`}>Wins</p>
                    <p className="text-xl md:text-2xl font-display font-black">{player.stats.wins}</p>
                 </div>
                 <div className="text-right hidden sm:block">
                    <p className={`text-[8px] md:text-[9px] font-display font-bold uppercase tracking-widest ${i === 0 ? 'text-white/30' : 'text-muted-foreground opacity-40'}`}>Reliability</p>
                    <p className="text-xl md:text-2xl font-display font-black text-neon">{player.reliabilityScore}%</p>
                 </div>
              </div>
              
              <ChevronRight className={`w-5 h-5 shrink-0 ${i === 0 ? 'text-white/20' : 'text-black/10'}`} />
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="p-10 bg-black text-white rounded-[3.5rem] border border-black space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10">
               <Award className="w-48 h-48 text-neon" />
            </div>
            
            <div className="w-16 h-16 bg-neon rounded-2xl flex items-center justify-center shadow-xl rotate-3">
              <Star className="w-8 h-8 text-black" />
            </div>
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter text-neon leading-none">Season Rewards</h3>
              <p className="text-white/60 text-lg leading-relaxed font-medium">Top 10 players receive limited edition equipment drops and lifetime legacy badges.</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-6 relative z-10 transition-all hover:bg-white/10 cursor-pointer">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <LayoutGrid className="w-6 h-6 text-neon" />
               </div>
               <div>
                  <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Current Prize Pool</p>
                  <p className="text-2xl font-display font-black text-white">$2,500 <span className="text-sm opacity-40">USD</span></p>
               </div>
            </div>

            <Button 
              onClick={() => alert('Entry into the Season Protocol is currently invitation-only.')}
              className="w-full h-16 bg-neon text-black rounded-2xl font-display font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Apply for Entry
            </Button>
          </div>

          <div className="p-10 border-2 border-paper-lines rounded-[3.5rem] space-y-6">
             <h4 className="text-xl font-display font-bold uppercase italic italic">Climb the Rank</h4>
             <p className="text-muted-foreground text-sm leading-relaxed">Establish your legacy by winning consecutive match protocols and maintaining a 95%+ reliability score.</p>
             <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[10px] font-display font-bold uppercase tracking-widest">
                   <div className="w-2 h-2 bg-neon rounded-full" /> No-ghosting streaks
                </li>
                <li className="flex items-center gap-3 text-[10px] font-display font-bold uppercase tracking-widest">
                   <div className="w-2 h-2 bg-black rounded-full" /> Elite venue participation
                </li>
                <li className="flex items-center gap-3 text-[10px] font-display font-bold uppercase tracking-widest">
                   <div className="w-2 h-2 bg-paper-lines rounded-full" /> Advanced drill certifications
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
