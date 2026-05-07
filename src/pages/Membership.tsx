import React from 'react';
import { CreditCard, Zap, CheckCircle2, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui';

export function MembershipPage() {
  return (
    <div className="flex-1 min-h-screen bg-white p-8 lg:p-16">
      <header className="mb-20 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neon/10 border border-neon/30 text-black font-display text-[10px] uppercase font-bold tracking-widest">
           <Zap className="w-3 h-3 fill-neon" /> Restricted Access
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none">The Elite Membership</h1>
        <p className="text-xl text-muted-foreground">The ultimate protocol package for serious racket athletes. No queues, no ghosting, only high-viz performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PricingCard 
          tier="Standard"
          price="0"
          description="Basic access for the casual player."
          features={[
            '3 Session Initiations / Mo',
            'Standard Matchmaking',
            'Community Support',
            'Public Rating Visibility'
          ]}
        />
        <PricingCard 
          tier="Elite"
          price="19"
          description="Full protocol access with priority execution."
          features={[
            'Unlimited Session Initiations',
            'Priority Matchmaking',
            '24/7 Concierge Support',
            'Exclusive Elite Venues',
            'Verified Badge',
            'Advanced Performance Analytics'
          ]}
          isElite
        />
      </div>

      <div className="mt-20 p-12 border border-paper-lines rounded-[3rem] bg-paper-bg max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-neon" />
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter">Security Protocol</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            All Elite payments are processed via 256-bit encrypted channels. Legacy data is never shared with third-party advertising units.
          </p>
        </div>
        <div className="w-[1px] h-20 bg-paper-lines hidden md:block" />
        <div className="flex-1 flex justify-end">
           <div className="flex items-center gap-4 text-xs font-display font-bold uppercase tracking-widest opacity-40 italic">
              Validated by <LayoutGridIcon className="w-8 h-8 opacity-20" />
           </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ tier, price, description, features, isElite = false }: any) {
  return (
    <div className={`p-12 rounded-[3.5rem] border-2 transition-all flex flex-col ${
      isElite ? 'bg-black text-white border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-4 ring-neon/20' : 'bg-white border-paper-lines'
    }`}>
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-2xl font-display font-bold uppercase italic mb-2">{tier}</h3>
          <p className={`text-sm ${isElite ? 'text-white/60' : 'text-muted-foreground'}`}>{description}</p>
        </div>
        {isElite && <Crown className="w-8 h-8 text-neon" />}
      </div>

      <div className="mb-12 flex items-baseline gap-2">
        <span className="text-7xl font-display font-black tracking-tighter">${price}</span>
        <span className={`text-sm ${isElite ? 'text-white/40' : 'text-muted-foreground'}`}>/ MO</span>
      </div>

      <ul className="space-y-4 mb-16 flex-1">
        {features.map((f: string) => (
          <li key={f} className="flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 className={`w-4 h-4 ${isElite ? 'text-neon' : 'text-black'}`} />
            {f}
          </li>
        ))}
      </ul>

      <Button className={`h-16 rounded-[2rem] font-display font-bold text-lg uppercase tracking-widest ${
        isElite ? 'bg-neon text-black hover:scale-105 transition-transform' : 'bg-black text-white hover:bg-muted-foreground'
      }`}>
        {isElite ? 'Become Elite' : 'Select standard'}
      </Button>
    </div>
  );
}

function LayoutGridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
