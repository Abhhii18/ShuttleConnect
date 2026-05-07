import React from 'react';
import { ArrowRight, Trophy, Users, Shield, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui';
import { type View } from '../components/Navigation';

interface LandingProps {
  onNavigate: (view: View) => void;
}

export function LandingPage({ onNavigate }: LandingProps) {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-paper-lines px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-neon fill-neon" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter uppercase">Shuttle<span className="opacity-40">Connect</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-display font-bold uppercase tracking-widest">
           <button onClick={() => onNavigate('Discover')} className="hover:text-neon transition-colors">Protocols</button>
           <button onClick={() => onNavigate('Venues')} className="hover:text-neon transition-colors">Venues</button>
           <button onClick={() => onNavigate('Squads')} className="hover:text-neon transition-colors">Squads</button>
        </div>
        <Button 
          onClick={() => onNavigate('Discover')}
          className="h-10 px-6 bg-black text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-black/20"
        >
          Enter Console
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white z-10" />
          <img 
            src="https://images.unsplash.com/photo-1541250848049-b4f71413cc30?auto=format&fit=crop&q=80&w=2600" 
            alt="Hero"
            className="w-full h-full object-cover scale-110 opacity-30"
          />
        </div>

        <div className="relative z-20 text-center max-w-5xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-black font-display text-[10px] uppercase font-bold tracking-[0.3em] mb-8">
              <Zap className="w-3 h-3 fill-neon" /> Next-Generation Protocol
            </div>
            <h1 className="text-7xl md:text-[140px] font-display font-black leading-[0.85] tracking-tighter mb-8 uppercase">
              Play Better <br />
              <span className="text-edge-outline">Games</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium mb-12">
              Match with reliable players. Secure premium venues. Build your elite squad. ShuttleConnect is the OS for amateur racket sports.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={() => onNavigate('Discover')}
                className="h-16 px-10 bg-black text-white rounded-2xl font-display font-bold text-lg hover:scale-105 transition-transform group shadow-2xl shadow-black/20"
              >
                Find Your Next Game
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('Membership')}
                className="h-16 px-10 rounded-2xl font-display font-bold text-lg border-2"
              >
                Go Elite
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-40">
          <div className="w-[1px] h-12 bg-black" />
          <span className="font-display text-[10px] uppercase tracking-widest vertical-rl h-12 text-center flex items-center">Scroll</span>
        </div>
      </section>

      {/* Stats / Marquee */}
      <section className="py-12 border-y border-paper-lines bg-black overflow-hidden select-none">
        <div className="flex gap-20 whitespace-nowrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-20 items-center">
              <span className="text-white font-display font-black text-6xl opacity-20 uppercase tracking-tighter italic">Precision Matchmaking</span>
              <div className="w-10 h-1 bg-neon" />
              <span className="text-neon font-display font-black text-6xl uppercase tracking-tighter">98.4% Reliability</span>
              <div className="w-10 h-1 bg-white/20" />
              <span className="text-white font-display font-black text-6xl opacity-20 uppercase tracking-tighter italic">Elite Venues Only</span>
              <div className="w-10 h-1 bg-neon" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Identity Verification"
              description="Our proof-of-play protocol ensures you only match with players who match your intensity and reliability."
            />
            <FeatureCard 
              icon={<Trophy className="w-8 h-8" />}
              title="Skill Hierarchy"
              description="A dynamic ELO-based ranking system that evolves with every match, ensuring fair and competitive sessions."
            />
            <FeatureCard 
              icon={<MapPin className="w-8 h-8" />}
              title="Curated Venues"
              description="Direct integration with premium court facilities. Instant booking. No overhead."
            />
          </div>
        </div>
      </section>

      {/* Elite Section */}
      <section className="py-32 px-6 bg-paper-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">Elite Membership. <br />No Compromises.</h2>
            <p className="text-xl text-muted-foreground">Unlock early access to the most high-viz sessions and private squad invitations.</p>
            <ul className="space-y-4">
              {['Unlimited Boosts', 'Advanced Analytics', 'Private Concierge', 'Legacy Badges'].map((item) => (
                <li key={item} className="flex items-center gap-3 font-display font-medium">
                  <div className="w-5 h-5 rounded-full bg-neon flex items-center justify-center">
                    <Zap className="w-3 h-3 text-black" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => onNavigate('Membership')}
              className="h-14 px-8 bg-black text-white rounded-xl"
            >
              View Plans
            </Button>
          </div>
          <div className="flex-1 w-full aspect-square bg-[#000] rounded-3xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1595435064112-4f74d0e64096?auto=format&fit=crop&q=80&w=800" 
              alt="Elite" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="font-display text-[10px] uppercase tracking-[0.4em] opacity-60 mb-2">Venue Preview</p>
              <h3 className="text-4xl font-display font-bold">The Glass House</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-paper-lines text-center bg-white">
        <h2 className="text-4xl font-display font-bold mb-12">SHUTTLECONNECT</h2>
        <div className="flex justify-center gap-8 text-sm text-muted-foreground font-medium mb-12">
          <a href="#" className="hover:text-black">Terms</a>
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Support</a>
          <a href="#" className="hover:text-black">Careers</a>
        </div>
        <p className="text-xs text-muted-foreground opacity-40 font-mono tracking-widest">© 2024 SHUTTLECONNECT PROTOCOL. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-10 border border-paper-lines rounded-3xl hover:border-black transition-all group">
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-8 group-hover:bg-neon transition-colors group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
