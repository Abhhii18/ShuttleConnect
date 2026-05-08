import React from 'react';
import { 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  History, 
  Settings, 
  Share2,
  TrendingUp,
  Award,
  ChevronRight,
  Camera,
  Check,
  X,
  Plus
} from 'lucide-react';
import { Button, Progress, Badge } from '@/components/ui';
import { MOCK_VENUES } from '../constants';
import { Player } from '../types';

export function ProfilePage({ user, onUpdateUser }: { user: Player, onUpdateUser: (user: Player) => void }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValues, setEditValues] = React.useState(user);

  const handleSave = () => {
    onUpdateUser(editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues(user);
    setIsEditing(false);
  };

  const toggleSport = (sport: string) => {
    setEditValues(prev => ({
      ...prev,
      preferredSports: prev.preferredSports.includes(sport)
        ? prev.preferredSports.filter(s => s !== sport)
        : [...prev.preferredSports, sport]
    }));
  };

  return (
    <div className="flex-1 min-h-screen bg-white">
      {/* Profile Header */}
      <header className="relative py-20 px-8 lg:px-16 border-b border-paper-lines overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
          <Trophy className="w-[400px] h-[400px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="relative group">
            <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative">
              <img src={isEditing ? editValues.image : user.image} alt={user.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <label className="cursor-pointer p-4 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-colors">
                    <Camera className="w-8 h-8 text-white" />
                    <input 
                      type="text" 
                      className="hidden" 
                      onChange={(e) => setEditValues(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Paste image URL..."
                    />
                  </label>
                </div>
              )}
            </div>
            {isEditing && (
              <input 
                type="text" 
                value={editValues.image}
                onChange={(e) => setEditValues(prev => ({ ...prev, image: e.target.value }))}
                className="absolute -bottom-12 left-0 right-0 bg-white border border-paper-lines rounded-lg px-3 py-2 text-[10px] font-mono outline-none focus:border-black"
                placeholder="Image URL..."
              />
            )}
            {!isEditing && (
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-neon rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <ShieldCheck className="w-8 h-8 text-black" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {isEditing ? (
                <input 
                  value={editValues.name}
                  onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                  className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase outline-none border-b-4 border-neon bg-transparent w-full max-w-xl"
                  autoFocus
                />
              ) : (
                <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase">{user.name}</h1>
              )}
              <div className="inline-flex h-8 items-center px-4 rounded-full border-2 border-black font-display text-[10px] uppercase font-bold tracking-widest bg-black text-white self-center md:self-auto">
                Elite Tier
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> Silicon Valley, CA
              </div>
              <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                <History className="w-4 h-4" /> Joined Oct 2023
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="rounded-xl h-12 px-8 bg-neon text-black font-display font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" /> Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="rounded-xl h-12 px-8 border-2 font-display font-bold flex items-center gap-2">
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} className="rounded-xl h-12 px-8 bg-black text-white font-display font-bold">Edit Profile</Button>
                  <Button variant="outline" onClick={() => alert('Sharing protocol ready.')} className="rounded-xl h-12 w-12 p-0 border-2"><Share2 className="w-5 h-5" /></Button>
                  <Button variant="outline" onClick={() => alert('Console settings accessed.')} className="rounded-xl h-12 w-12 p-0 border-2"><Settings className="w-5 h-5" /></Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto p-8 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Stats Section */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <StatCard label="Win Rate" value="78.9%" sub="Rank #12" trend="+2.4%" />
              <StatCard label="Reliability" value={user.reliabilityScore.toString()} sub="Tier A+" trend="Stable" />
              <StatCard label="Consistency" value="4.9" sub="Impact Score" trend="+0.1" />
            </div>

            <section className="space-y-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-display font-bold uppercase tracking-tighter">Performance Matrix</h2>
                <button className="text-xs font-display font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">Details <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="p-10 border border-paper-lines rounded-[3rem] space-y-8 bg-muted/20">
                <PerformanceRow label="Skill Level" value={88} color="bg-black" />
                <PerformanceRow label="Stamina" value={76} color="bg-black/60" />
                <PerformanceRow label="Tactics" value={92} color="bg-neon" />
                <PerformanceRow label="Spirit" value={100} color="bg-black" />
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-display font-bold uppercase tracking-tighter">Combat Records</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-neon text-black border-none font-bold">WINS: {user.stats.wins}</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-none font-bold">LOSS: {user.stats.losses}</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                {user.matches?.map((match) => (
                  <div 
                    key={match.id} 
                    className="p-6 border border-paper-lines rounded-[2.5rem] bg-white group hover:border-black transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          match.result === 'Win' ? 'bg-neon shadow-lg shadow-neon/20' : 'bg-muted'
                        }`}>
                          <Award className={`w-6 h-6 ${match.result === 'Win' ? 'text-black' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <h4 className="text-xl font-display font-black uppercase italic tracking-tight">{match.opponent}</h4>
                            <span className={`text-[10px] font-display font-bold uppercase tracking-widest ${
                              match.result === 'Win' ? 'text-neon' : 'text-red-500'
                            }`}>
                              [{match.result}]
                            </span>
                          </div>
                          <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">
                            {match.sport} • {match.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 md:text-right px-6 md:px-0">
                        <div className="space-y-1">
                          <p className="text-[9px] font-display font-bold uppercase tracking-widest opacity-30">Final Score</p>
                          <p className="text-xl font-display font-black tracking-tighter">{match.score}</p>
                        </div>
                        <div className="space-y-1 hidden sm:block">
                          <p className="text-[9px] font-display font-bold uppercase tracking-widest opacity-30">Intensity</p>
                          <p className="text-xl font-display font-black tracking-tighter text-muted-foreground">{match.stats.duration}</p>
                        </div>
                        <div className="space-y-1 hidden md:block">
                          <p className="text-[9px] font-display font-bold uppercase tracking-widest opacity-30">Points</p>
                          <p className="text-xl font-display font-black tracking-tighter">
                            <span className="text-neon">{match.stats.pointsWon}</span>
                            <span className="opacity-20 mx-1">/</span>
                            <span>{match.stats.pointsLost}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
               <h2 className="text-3xl font-display font-bold uppercase tracking-tighter">Recent Sanctuary Visits</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_VENUES.slice(0, 2).map(venue => (
                    <div key={venue.id} className="p-6 border border-paper-lines rounded-[2.5rem] flex items-center gap-6 group hover:border-black transition-all">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
                          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold uppercase truncate">{venue.name}</h4>
                          <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40 truncate">{venue.location}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Side Info Section */}
          <div className="lg:col-span-4 space-y-12">
            <section className="p-8 bg-black text-white rounded-[3rem] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-neon rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-3xl font-display font-bold leading-tight">Mastery Badges</h3>
                <div className="flex flex-wrap gap-3">
                   <div className="px-4 py-2 border border-white/20 rounded-xl font-display text-[10px] uppercase font-bold tracking-widest bg-white/10">Legacy Member</div>
                   <div className="px-4 py-2 border border-white/20 rounded-xl font-display text-[10px] uppercase font-bold tracking-widest bg-white/10">Smasher</div>
                   <div className="px-4 py-2 border border-white/20 rounded-xl font-display text-[10px] uppercase font-bold tracking-widest bg-white/10">No-Ghosting</div>
                </div>
                <Button 
                  onClick={() => alert('Accessing Trophy Room...')}
                  className="w-full h-12 bg-white text-black rounded-xl font-display font-bold hover:bg-neon hover:text-black transition-colors"
                >
                  View Trophy Room
                </Button>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold uppercase tracking-tighter">Preferred Disciplines</h2>
                {isEditing && (
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest">Select Disciplines</Badge>
                )}
              </div>
              <div className="space-y-3">
                {(isEditing ? ['Badminton', 'Tennis', 'Squash'] : user.preferredSports).map(sport => {
                  const isSelected = editValues.preferredSports.includes(sport);
                  return (
                    <div 
                      key={sport} 
                      onClick={() => isEditing && toggleSport(sport)}
                      className={`flex items-center justify-between p-5 border rounded-2xl transition-all ${
                        isEditing 
                          ? isSelected ? 'border-neon bg-neon/5' : 'border-paper-lines'
                          : 'border-paper-lines hover:border-black cursor-pointer'
                      }`}
                    >
                      <span className="font-display font-bold uppercase tracking-[0.1em]">{sport}</span>
                      {isEditing ? (
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-neon border-neon' : 'border-paper-lines'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-black" />}
                        </div>
                      ) : (
                        <BadgeIcon className="w-5 h-5 text-neon group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, trend }: { label: string, value: string, sub: string, trend: string }) {
  return (
    <div className="p-8 border border-paper-lines rounded-[2.5rem] bg-white group hover:border-black transition-all">
      <p className="text-[10px] font-display font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-60">{label}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-4xl font-display font-black tracking-tighter">{value}</h3>
        <span className="text-[10px] font-display font-bold text-neon bg-black px-2 py-0.5 rounded-full">{trend}</span>
      </div>
      <p className="text-xs font-display font-bold uppercase tracking-widest opacity-30">{sub}</p>
    </div>
  );
}

function PerformanceRow({ label, value, color = "bg-black" }: { label: string, value: number, color?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between font-display text-[10px] font-bold uppercase tracking-widest opacity-60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-4 w-full bg-paper-lines rounded-full overflow-hidden p-1">
        <div 
          style={{ width: `${value}%` }}
          className={`h-full ${color} rounded-full transition-all duration-1000`} 
        />
      </div>
    </div>
  );
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
