import React, { useState } from 'react';
import { Sidebar, BottomNav, type View } from './components/Navigation';
import { LandingPage } from './pages/Landing';
import { DiscoverPage } from './pages/Discover';
import { ProfilePage } from './pages/Profile';
import { VenuesPage } from './pages/Venues';
import { SquadsPage } from './pages/Squads';
import { SessionDetailsPage } from './pages/SessionDetails';
import { CreateSessionPage } from './pages/CreateSession';
import { HistoryPage } from './pages/History';
import { LeaderboardPage } from './pages/Leaderboard';
import { MembershipPage } from './pages/Membership';
import { AlertCircle, Settings as SettingsIcon } from 'lucide-react';
import { MOCK_SESSIONS, MOCK_PLAYERS } from './constants';
import { Session, Player } from './types';

export default function App() {
  const [view, setView] = useState<View>('Landing');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [currentUser, setCurrentUser] = useState<Player>(MOCK_PLAYERS[0]);

  const navigateToSession = (id: string) => {
    setSelectedSessionId(id);
    setView('SessionDetails');
  };

  const handleCreateSession = (data: any) => {
    const newSession: Session = {
      id: `s${sessions.length + 1}`,
      title: data.title,
      sport: data.sport,
      level: data.level,
      date: data.date,
      time: 'TBD', // This could be improved if time was part of the form
      venueId: data.venueId,
      organizerId: currentUser.id,
      totalPlayers: data.totalPlayers,
      joinedPlayers: [currentUser.id],
      costPerHead: data.costPerHead,
      isBoosted: false,
      reliabilityTier: 'A',
      description: 'Newly created protocol.'
    };
    setSessions([newSession, ...sessions]);
    setView('Discover');
  };

  const handleJoinSession = (id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id && !s.joinedPlayers.includes(currentUser.id) 
        ? { ...s, joinedPlayers: [...s.joinedPlayers, currentUser.id] }
        : s
    ));
    setView('Discover');
  };

  const handleLeaveSession = (id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id 
        ? { ...s, joinedPlayers: s.joinedPlayers.filter(pid => pid !== currentUser.id) }
        : s
    ));
    setView('Discover');
  };

  // Helper for rendering current view
  const renderView = () => {
    switch (view) {
      case 'Landing':
        return <LandingPage onNavigate={setView} />;
      case 'Discover':
        return (
          <DiscoverPage 
            sessions={sessions}
            onSelectSession={navigateToSession} 
            onCreateSession={() => setView('CreateSession')} 
          />
        );
      case 'Profile':
        return <ProfilePage user={currentUser} onUpdateUser={setCurrentUser} />;
      case 'Venues':
        return <VenuesPage />;
      case 'Squads':
        return <SquadsPage />;
      case 'SessionDetails':
        return (
          <SessionDetailsPage 
            sessionId={selectedSessionId || ''} 
            sessions={sessions}
            currentUserId={currentUser.id}
            onBack={() => setView('Discover')} 
            onJoin={handleJoinSession}
            onLeave={handleLeaveSession}
          />
        );
      case 'CreateSession':
        return (
          <CreateSessionPage 
            onBack={() => setView('Discover')} 
            onCreate={handleCreateSession} 
          />
        );
      case 'History':
        return <HistoryPage />;
      case 'Leaderboard':
        return <LeaderboardPage />;
      case 'Membership':
        return <MembershipPage />;
      case 'Settings':
        return (
          <div className="flex-1 min-h-screen bg-white p-8 lg:p-16 flex flex-col items-center justify-center space-y-8">
            <SettingsIcon className="w-20 h-20 opacity-10" />
            <h2 className="text-4xl font-display font-bold uppercase italic">Console Settings</h2>
            <p className="text-muted-foreground">Adjust your operational parameters.</p>
          </div>
        );
      default:
        return (
          <div className="flex-1 min-h-screen flex flex-col items-center justify-center p-8 bg-paper-bg">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-8">
              <AlertCircle className="w-10 h-10 opacity-20" />
            </div>
            <h2 className="text-4xl font-display font-black tracking-tighter uppercase mb-4">Under Construction</h2>
            <p className="text-muted-foreground font-medium mb-12 opacity-60">The {view} protocol unit is currently being established.</p>
            <button 
              onClick={() => setView('Discover')}
              className="px-8 h-14 bg-black text-white rounded-xl font-display font-bold uppercase tracking-widest text-[10px]"
            >
              Back to Operations
            </button>
          </div>
        );
    }
  };

  const showNav = view !== 'Landing';

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen w-full">
        {showNav && <Sidebar currentView={view} onNavigate={setView} />}
        
        <main className="flex-1 min-h-screen overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {showNav && <BottomNav currentView={view} onNavigate={setView} />}
    </div>
  );
}
