import React, { useState } from 'react';
import { Users, Zap, Trophy, Heart, ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import { MOCK_SQUADS, MOCK_PLAYERS } from '../constants';
import { Button, Badge } from '@/components/ui';

export function SquadsPage() {
  const [selectedSquadId, setSelectedSquadId] = useState<string | null>(null);
  const [isScouting, setIsScouting] = useState(false);
  const [agentSearch, setAgentSearch] = useState('');

  const filteredPlayers = MOCK_PLAYERS.filter(p => 
    p.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
    p.preferredSports.some(s => s.toLowerCase().includes(agentSearch.toLowerCase()))
  );

  const handleRecruit = (playerName: string) => {
    alert(`Recruitment invitation dispatched to ${playerName}. Awaiting synchronization.`);
  };

  const handleCreateSquad = () => {
    alert('Squad formation protocol initiated. Select your founding members.');
  };

  if (isScouting) {
    return (
      <div className="flex-1 min-h-screen bg-white p-6 md:p-16 overflow-y-auto">
        <header className="mb-12">
          <Button variant="outline" onClick={() => setIsScouting(false)} className="mb-8 h-12 px-6 rounded-xl border-2 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Squads
          </Button>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none">Recruitment Console</h1>
            <p className="text-xl text-muted-foreground font-medium">Scrub the network for available field agents matching your tactical needs.</p>
          </div>
        </header>

        <div className="max-w-4xl space-y-12">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-black transition-colors" />
            <input 
              placeholder="Search for agents by skill, rank, or discipline..." 
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              className="w-full h-20 pl-16 pr-8 bg-muted/30 border-2 border-transparent focus:border-black focus:bg-white rounded-[2rem] outline-none font-display font-bold text-xl transition-all"
            />
          </div>

          <div className="space-y-6 pb-32">
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.4em] opacity-40">Available Free Agents</h3>
            {filteredPlayers.length > 0 ? filteredPlayers.map(player => (
              <div key={player.id} className="p-6 md:p-8 border border-paper-lines rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group hover:border-black transition-all">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-2 border-white shrink-0">
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <h4 className="text-2xl font-display font-bold uppercase italic">{player.name}</h4>
                    {player.isVerified && <ShieldCheck className="w-5 h-5 text-neon" />}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {player.preferredSports.map(s => <Badge key={s} variant="outline" className="text-[9px] uppercase font-black">{s}</Badge>)}
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40 mb-1">Reliability</p>
                  <p className="text-2xl font-display font-black text-neon">{player.reliabilityScore}%</p>
                </div>
                <Button 
                  onClick={() => handleRecruit(player.name)}
                  className="h-12 w-full md:w-auto px-10 bg-black text-white rounded-xl font-display font-black text-[10px] uppercase tracking-widest hover:bg-neon hover:text-black transition-colors"
                >
                  Recruit
                </Button>
              </div>
            )) : (
              <div className="py-20 text-center border-2 border-dashed border-paper-lines rounded-[3rem]">
                <p className="font-display font-bold uppercase opacity-20 italic text-xl">No matching agents found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedSquadId) {
    const squad = MOCK_SQUADS.find(s => s.id === selectedSquadId)!;
    return (
      <div className="flex-1 min-h-screen bg-white p-6 md:p-16 overflow-y-auto">
        <header className="mb-12">
          <Button variant="outline" onClick={() => setSelectedSquadId(null)} className="mb-8 h-12 px-6 rounded-xl border-2 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Squads
          </Button>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white animate-float">
              <img src={squad.image} alt={squad.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <Badge className="bg-neon text-black font-black uppercase tracking-[0.2em]">Active Squad Unit</Badge>
              <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none">{squad.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-8">
                 <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-neon" />
                    <span className="font-display font-bold text-lg uppercase">Rank #{squad.ranking}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-neon fill-neon" />
                    <span className="font-display font-bold text-lg uppercase">{squad.chemistry}% Chemistry</span>
                 </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-paper-lines mt-12 pb-32">
           <div className="lg:col-span-8 space-y-8">
              <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.4em] opacity-40">Unit Roster</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {squad.members.map(mid => {
                  const player = MOCK_PLAYERS.find(p => p.id === mid);
                  return (
                    <div key={mid} className="p-6 border border-paper-lines rounded-[2rem] flex items-center gap-6 bg-paper-bg hover:border-black transition-all cursor-crosshair">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                        <img src={player?.image} alt={player?.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-display font-black uppercase italic">{player?.name}</h4>
                        <p className="text-[9px] font-display font-bold uppercase tracking-widest opacity-40">Reliability Index {player?.reliabilityScore}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>
           
           <div className="lg:col-span-4 p-10 bg-black text-white rounded-[4rem] border border-black space-y-10 shadow-2xl">
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter text-neon">Squad Pulse</h3>
                <p className="text-white/60 text-sm leading-relaxed">High-viz tactical performance tracking for the active unit. Real-time data feed enabled.</p>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between font-display text-[10px] font-black uppercase tracking-widest text-neon">
                    <span>Performance Rating</span>
                    <span>94/100</span>
                 </div>
                 <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-neon rounded-full" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[8px] font-display font-bold uppercase tracking-widest opacity-40 mb-1">Win Rate</p>
                       <p className="text-xl font-display font-black">72%</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[8px] font-display font-bold uppercase tracking-widest opacity-40 mb-1">Active Streaks</p>
                       <p className="text-xl font-display font-black text-neon">05</p>
                    </div>
                 </div>
              </div>
              <Button 
                onClick={() => alert(`Analyzing tactical data for ${squad.name}...`)}
                className="w-full h-16 bg-neon text-black rounded-2xl font-display font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform"
              >
                Squad Analytics
              </Button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-white p-6 md:p-16 overflow-y-auto">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none">Squad System</h1>
          <p className="text-xl text-muted-foreground max-w-xl font-medium">Build your elite network. Higher squad chemistry unlocks higher tier match-ups.</p>
        </div>
        <Button 
          onClick={handleCreateSquad}
          className="h-16 px-10 bg-black text-white rounded-[2rem] font-display font-black text-lg shadow-2xl hover:bg-neon hover:text-black transition-colors"
        >
          Create Squad
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
        {MOCK_SQUADS.map((squad, i) => (
          <div
            key={squad.id}
            className="p-8 border border-paper-lines rounded-[3rem] group hover:border-black transition-all bg-muted/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Users className="w-48 h-48" />
            </div>

            <div className="relative z-10 flex flex-col gap-8 h-full">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <img src={squad.image} alt={squad.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold">{squad.name}</h3>
                  <p className="text-[10px] font-display font-bold uppercase tracking-widest text-muted-foreground">Rank #{squad.ranking} Worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                 <div className="space-y-1">
                    <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Chemistry</p>
                    <p className="text-2xl font-display font-black text-neon shadow-black flex items-center gap-2">
                       {squad.chemistry}% <Heart className="w-4 h-4 fill-neon text-neon" />
                    </p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Total Victories</p>
                    <p className="text-2xl font-display font-black">{squad.wins}</p>
                 </div>
              </div>

              <div className="pt-4 space-y-4">
                 <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">Active Unit</p>
                 <div className="flex -space-x-3">
                    {squad.members.map(mid => {
                      const player = MOCK_PLAYERS.find(p => p.id === mid);
                      return (
                        <div key={mid} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-muted shadow-lg">
                          <img src={player?.image} alt={player?.name} />
                        </div>
                      );
                    })}
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-black/5 flex items-center justify-center text-xs font-bold text-muted-foreground">
                      +4
                    </div>
                 </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setSelectedSquadId(squad.id)}
                className="mt-auto h-12 rounded-2xl border-2 font-display font-bold hover:bg-black hover:text-neon transition-colors uppercase tracking-widest text-xs"
              >
                Squad Intel
              </Button>
            </div>
          </div>
        ))}
        
        {/* Recruitment Card */}
        <div className="p-8 border-2 border-dashed border-paper-lines rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6 opacity-60 hover:opacity-100 transition-opacity">
           <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 opacity-20" />
           </div>
           <div className="space-y-2">
              <h3 className="text-xl font-display font-bold uppercase italic">Scout Players</h3>
              <p className="text-sm text-muted-foreground mx-auto">Find players matching your chemistry requirements.</p>
           </div>
           <Button 
            variant="outline" 
            onClick={() => setIsScouting(true)}
            className="h-10 px-6 rounded-xl border-2 font-display font-bold text-[10px] uppercase tracking-widest"
           >
            Open Scout
           </Button>
        </div>
      </div>
    </div>
  );
}
