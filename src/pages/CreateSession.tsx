import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Zap, 
  Info,
  ShieldAlert
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { SportType, SkillLevel } from '../types';
import { MOCK_VENUES } from '../constants';

interface CreateSessionProps {
  onBack: () => void;
  onCreate: (session: any) => void;
}

export function CreateSessionPage({ onBack, onCreate }: CreateSessionProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    sport: 'Badminton' as SportType,
    level: 'Intermediate' as SkillLevel,
    venueId: '',
    date: '',
    time: '',
    totalPlayers: 4,
    costPerHead: 10,
    description: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="flex-1 min-h-screen bg-white h-screen flex flex-col">
      <header className="shrink-0 px-8 pt-8 md:pt-16 max-w-3xl w-full mx-auto mb-8 flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="w-12 h-12 p-0 rounded-2xl border-2 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-1.5 w-8 md:w-12 rounded-full transition-all duration-500 ${step >= i ? 'bg-black' : 'bg-paper-lines'}`} 
            />
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-8 pb-32">
        <div className="max-w-3xl mx-auto">
        {step === 1 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase italic">Phase I: Basics</h1>
              <p className="text-xl text-muted-foreground">Select your discipline and core protocol parameters.</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                {['Badminton', 'Tennis', 'Squash'].map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setFormData({ ...formData, sport: sport as SportType })}
                    className={`h-24 rounded-3xl font-display font-bold uppercase tracking-widest text-[10px] border-2 transition-all ${
                      formData.sport === sport ? 'bg-black text-white border-black shadow-2xl' : 'border-paper-lines hover:border-black'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <p className="font-display font-bold text-xs uppercase tracking-widest opacity-40">Session Title</p>
                <input 
                  type="text" 
                  placeholder="e.g. Saturday Smashers"
                  className="w-full h-16 px-8 bg-muted/30 border-2 border-transparent focus:border-black focus:bg-white rounded-3xl outline-none font-display font-bold text-xl transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                 <p className="font-display font-bold text-xs uppercase tracking-widest opacity-40">Target Skill Level</p>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Beginner', 'Intermediate', 'Advanced', 'Pro'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setFormData({ ...formData, level: lvl as SkillLevel })}
                        className={`h-12 rounded-xl font-display font-bold text-[9px] uppercase tracking-widest border-2 transition-all ${
                          formData.level === lvl ? 'bg-neon text-black border-neon' : 'border-paper-lines hover:border-black'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <Button 
              onClick={nextStep}
              disabled={!formData.title}
              className="w-full h-16 bg-black text-white rounded-2xl font-display font-black text-lg group"
            >
              Continue to Logistics
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <button onClick={prevStep} className="text-xs font-display font-bold uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2">
                <ArrowLeft className="w-3 h-3" /> Back to Phase I
              </button>
              <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase italic">Phase II: Detail</h1>
              <p className="text-xl text-muted-foreground">Coordinates and timing for the elite unit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <p className="font-display font-bold text-xs uppercase tracking-widest opacity-40">Target Venue</p>
                 <select 
                  className="w-full h-16 px-8 bg-muted/30 border-2 border-transparent focus:border-black focus:bg-white rounded-3xl outline-none font-display font-bold text-lg transition-all appearance-none"
                  value={formData.venueId}
                  onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
                 >
                   <option value="">Select a Sanctuary</option>
                   {MOCK_VENUES.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                 </select>
               </div>
               <div className="space-y-4">
                 <p className="font-display font-bold text-xs uppercase tracking-widest opacity-40">Protocol Date</p>
                 <input 
                  type="date" 
                  className="w-full h-16 px-8 bg-muted/30 border-2 border-transparent focus:border-black focus:bg-white rounded-3xl outline-none font-display font-bold text-lg transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                 />
               </div>
            </div>

            <div className="space-y-8">
               <div className="p-8 border border-paper-lines rounded-[2.5rem] bg-paper-bg flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                       <Users className="w-4 h-4" />
                       <span className="font-display font-bold text-xs uppercase tracking-widest">Squad Capacity</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                       <button onClick={() => setFormData(f => ({ ...f, totalPlayers: Math.max(2, f.totalPlayers - 1) }))} className="w-10 h-10 rounded-full border-2 border-black font-bold text-xl flex items-center justify-center">-</button>
                       <span className="text-5xl font-display font-black tracking-tighter">{formData.totalPlayers}</span>
                       <button onClick={() => setFormData(f => ({ ...f, totalPlayers: Math.min(10, f.totalPlayers + 1) }))} className="w-10 h-10 rounded-full border-2 border-black font-bold text-xl flex items-center justify-center">+</button>
                    </div>
                 </div>
                 <div className="w-[1px] h-24 bg-paper-lines hidden md:block" />
                 <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                       <Zap className="w-4 h-4 text-neon" />
                       <span className="font-display font-bold text-xs uppercase tracking-widest">Contribution Fee ($)</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                       <button onClick={() => setFormData(f => ({ ...f, costPerHead: Math.max(0, f.costPerHead - 1) }))} className="w-10 h-10 rounded-full border-2 border-black font-bold text-xl flex items-center justify-center">-</button>
                       <span className="text-5xl font-display font-black tracking-tighter">{formData.costPerHead}</span>
                       <button onClick={() => setFormData(f => ({ ...f, costPerHead: f.costPerHead + 1 }))} className="w-10 h-10 rounded-full border-2 border-black font-bold text-xl flex items-center justify-center">+</button>
                    </div>
                 </div>
               </div>
            </div>

            <Button 
              onClick={nextStep}
              disabled={!formData.venueId || !formData.date}
              className="w-full h-16 bg-black text-white rounded-2xl font-display font-black text-lg group"
            >
              Final Review
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12">
            <div className="space-y-4">
              <button onClick={prevStep} className="text-xs font-display font-bold uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2">
                <ArrowLeft className="w-3 h-3" /> Back to Phase II
              </button>
              <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase italic">Phase III: Finalize</h1>
              <p className="text-xl text-muted-foreground">Confirm your protocol before transmission.</p>
            </div>

            <div className="p-10 border-4 border-black rounded-[3rem] space-y-8 bg-paper-bg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  <ShieldAlert className="w-64 h-64" />
               </div>

               <div className="space-y-2 relative z-10">
                  <Badge className="bg-neon text-black">{formData.sport}</Badge>
                  <h3 className="text-4xl font-display font-bold">{formData.title}</h3>
               </div>

               <div className="grid grid-cols-2 gap-8 relative z-10">
                  <SummaryItem label="Logistical Hub" value={MOCK_VENUES.find(v => v.id === formData.venueId)?.name || 'Unknown'} />
                  <SummaryItem label="Execution Date" value={formData.date} />
                  <SummaryItem label="Unit Size" value={`${formData.totalPlayers} Players`} />
                  <SummaryItem label="Contribution" value={`$${formData.costPerHead} USD`} />
               </div>

               <div className="pt-8 border-t border-paper-lines relative z-10">
                  <p className="text-xs font-medium opacity-60 italic">"By initiating this protocol, you agree to the reliability agreement. Any ghosting will result in immediate rating reduction."</p>
               </div>
            </div>

            <Button 
              onClick={() => onCreate(formData)}
              className="w-full h-16 bg-black text-white rounded-2xl font-display font-black text-lg shadow-2xl shadow-neon/10"
            >
              Inaugurate Session
            </Button>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-display font-bold uppercase tracking-widest opacity-40">{label}</p>
      <p className="font-display font-bold text-lg">{value}</p>
    </div>
  );
}

