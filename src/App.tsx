/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Home, Bot, Users, SlidersHorizontal, Clock, PlayCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AIQA from './components/AIQA';
import Workforce from './components/Workforce';
import WhatIf from './components/WhatIf';
import Timeline from './components/Timeline';

type Tab = 'dashboard' | 'ai' | 'workforce' | 'whatif' | 'timeline';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [demoMode, setDemoMode] = useState(false);

  // Demo mode auto-play
  useEffect(() => {
    if (!demoMode) return;
    const tabs: Tab[] = ['dashboard', 'ai', 'workforce', 'whatif', 'timeline'];
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [demoMode]);

  return (
    <div className="flex flex-col h-screen h-[100dvh] bg-[#e2e8f0] relative sm:p-4 md:p-8 w-full justify-center items-center">
      
      {/* Mobile Frame Constraint for Desktop */}
      <div className="w-full h-full max-w-[420px] bg-[#F8FAFC] shadow-2xl relative overflow-hidden sm:rounded-[2rem] sm:border-8 border-gray-900 mx-auto flex flex-col">
        
        {/* Toggle Demo Mode (Float top right) */}
        <button 
          onClick={() => setDemoMode(!demoMode)}
          className={`absolute top-4 right-4 z-50 p-1.5 rounded-full shadow-md transition-colors flex items-center ${
            demoMode ? 'bg-[#FFC857] text-[#003B73]' : 'bg-white text-gray-400 border border-gray-200'
          }`}
          title="Auto-play demo"
        >
          <PlayCircle size={16} className={demoMode ? "animate-pulse" : ""} />
        </button>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'ai' && <AIQA />}
          {activeTab === 'workforce' && <Workforce />}
          {activeTab === 'whatif' && <WhatIf />}
          {activeTab === 'timeline' && <Timeline />}
        </div>
        
        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex justify-around items-center px-2 z-40 pb-safe">
          <NavItem 
            icon={<Home size={20} />} 
            label="Home" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<Bot size={20} />} 
            label="Ask AI" 
            isActive={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')} 
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Workforce" 
            isActive={activeTab === 'workforce'} 
            onClick={() => setActiveTab('workforce')} 
          />
          <NavItem 
            icon={<SlidersHorizontal size={20} />} 
            label="What-if" 
            isActive={activeTab === 'whatif'} 
            onClick={() => setActiveTab('whatif')} 
          />
          <NavItem 
            icon={<Clock size={20} />} 
            label="Timeline" 
            isActive={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
          />
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
        isActive ? 'text-[#003B73]' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <div className={`transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-medium transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 absolute'}`}>
        {label}
      </span>
      {isActive && (
        <div className="absolute top-1 w-1 h-1 bg-[#FFC857] rounded-full" />
      )}
    </button>
  );
}
