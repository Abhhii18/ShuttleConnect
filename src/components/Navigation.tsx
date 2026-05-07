import React from 'react';
import { 
  LayoutGrid, 
  Search, 
  PlusCircle, 
  Users, 
  Trophy, 
  User, 
  Bell,
  Map,
  History,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type View = 
  | 'Landing' 
  | 'Discover' 
  | 'SessionDetails' 
  | 'CreateSession' 
  | 'Squads' 
  | 'Profile' 
  | 'History' 
  | 'Leaderboard' 
  | 'Membership' 
  | 'Venues'
  | 'Settings';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
  className?: string;
}

const NAV_ITEMS = [
  { id: 'Discover', label: 'Discover', icon: Search },
  { id: 'CreateSession', label: 'Initiate', icon: PlusCircle },
  { id: 'Venues', label: 'Venues', icon: Map },
  { id: 'Squads', label: 'Squads', icon: Users },
  { id: 'Leaderboard', label: 'Elite', icon: Trophy },
  { id: 'History', label: 'History', icon: History },
  { id: 'Profile', label: 'Profile', icon: User },
];

export function Sidebar({ currentView, onNavigate, className }: NavigationProps) {
  return (
    <aside className={cn("hidden lg:flex flex-col w-72 h-screen border-r border-paper-lines sticky top-0 bg-white z-50", className)}>
      <div className="p-8 border-b border-paper-lines">
        <button 
          onClick={() => onNavigate('Landing')}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-neon rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-neon/20">
            <LayoutGrid className="w-5 h-5 text-black" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">SHUTTLE<span className="text-muted-foreground font-normal">CONNECT</span></span>
        </button>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] opacity-40 px-4 mb-4">Operations</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as View)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group",
              currentView === item.id 
                ? "bg-black text-white shadow-xl shadow-black/10" 
                : "hover:bg-accent/50 text-muted-foreground hover:text-black"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", currentView === item.id ? "text-neon" : "opacity-60")} />
            {item.label}
          </button>
        ))}

        <div className="pt-8 space-y-2">
          <p className="font-display text-[10px] uppercase tracking-[0.2em] opacity-40 px-4 mb-4">Account</p>
          <button
            onClick={() => onNavigate('Membership')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm border border-neon/30 bg-neon/5 hover:bg-neon/10",
              currentView === 'Membership' ? "ring-2 ring-neon" : ""
            )}
          >
            <CreditCard className="w-5 h-5 text-black" />
            Elite Membership
          </button>
        </div>
      </nav>

      <div className="p-6 border-t border-paper-lines">
        <div className="bg-muted p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-paper-ink/10 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" alt="User" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm truncate">Alex Chen</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Elite Tier</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function BottomNav({ currentView, onNavigate }: NavigationProps) {
  const items = NAV_ITEMS.slice(0, 5); // Just show top 5 for mobile

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass border-t border-paper-lines z-50 px-6 flex items-center justify-between">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id as View)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            currentView === item.id ? "text-black" : "text-muted-foreground"
          )}
        >
          <div className={cn(
            "p-2 rounded-full transition-all",
            currentView === item.id ? "bg-neon" : "hover:bg-muted"
          )}>
            <item.icon className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-display font-medium uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
