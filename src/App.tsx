/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Home, Bot, Users, SlidersHorizontal, Clock, PlayCircle, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AIQA from './components/AIQA';
import Workforce from './components/Workforce';
import WhatIf from './components/WhatIf';
import Timeline from './components/Timeline';

type Tab = 'dashboard' | 'ai' | 'workforce' | 'whatif' | 'timeline';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [demoMode, setDemoMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden w-full font-sans text-gray-800">
      
      {/* Sidebar for Desktop */}
      <aside 
        className={`hidden md:flex fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#003B73] text-white flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20 lg:w-64'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded bg-white text-[#003B73] flex items-center justify-center font-black text-sm shrink-0">
              BG
            </div>
            <span className={`font-bold text-lg whitespace-nowrap transition-opacity ${!isSidebarOpen ? 'md:opacity-0 lg:opacity-100' : ''}`}>
              BRAVO Group
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col space-y-1">
          <NavItem 
            icon={<Home size={20} />} 
            label="Trang chủ" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            isExpanded={isSidebarOpen}
          />
          <NavItem 
            icon={<Bot size={20} />} 
            label="Hỏi AI" 
            isActive={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')} 
            isExpanded={isSidebarOpen}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Nhân sự" 
            isActive={activeTab === 'workforce'} 
            onClick={() => setActiveTab('workforce')} 
            isExpanded={isSidebarOpen}
          />
          <NavItem 
            icon={<SlidersHorizontal size={20} />} 
            label="Giả định" 
            isActive={activeTab === 'whatif'} 
            onClick={() => setActiveTab('whatif')} 
            isExpanded={isSidebarOpen}
          />
          <NavItem 
            icon={<Clock size={20} />} 
            label="Tiến trình" 
            isActive={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
            isExpanded={isSidebarOpen}
          />
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={() => setDemoMode(!demoMode)}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
              demoMode ? 'bg-[#FFC857] text-[#003B73] font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <PlayCircle size={18} className={demoMode ? "animate-pulse" : ""} />
            <span className={`transition-opacity ${!isSidebarOpen ? 'md:hidden lg:inline' : 'inline'}`}>
              {demoMode ? 'Đang Auto-play' : 'Chạy Demo'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-16 md:pb-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center space-x-4">
             <h2 className="text-sm sm:text-lg font-bold text-[#003B73] capitalize">
                {activeTab === 'dashboard' ? 'Tổng quan' : 
                 activeTab === 'ai' ? 'Trợ lý AI' : 
                 activeTab === 'workforce' ? 'Nhân sự' : 
                 activeTab === 'whatif' ? 'Mô phỏng' : 
                 'Tiến trình'}
             </h2>
          </div>
          <div className="flex items-center space-x-3">
             <div className="text-right hidden xs:block">
               <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Chủ tịch</p>
               <p className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">Nguyễn Văn A</p>
             </div>
             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden shrink-0">
                <img src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=003B73&color=fff" alt="Avatar" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full relative">
          <div className="max-w-7xl mx-auto w-full h-full p-4 sm:p-6 lg:p-8">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'ai' && <AIQA />}
            {activeTab === 'workforce' && <Workforce />}
            {activeTab === 'whatif' && <WhatIf />}
            {activeTab === 'timeline' && <Timeline />}
          </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex justify-around items-center px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <MobileNavItem 
            icon={<Home size={20} />} 
            label="Tổng quan"
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <MobileNavItem 
            icon={<Bot size={20} />} 
            label="Hỏi AI"
            isActive={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')} 
          />
          <MobileNavItem 
            icon={<Users size={20} />} 
            label="Nhân sự"
            isActive={activeTab === 'workforce'} 
            onClick={() => setActiveTab('workforce')} 
          />
          <MobileNavItem 
            icon={<SlidersHorizontal size={20} />} 
            label="Giả định"
            isActive={activeTab === 'whatif'} 
            onClick={() => setActiveTab('whatif')} 
          />
          <MobileNavItem 
            icon={<Clock size={20} />} 
            label="Tiến trình"
            isActive={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
          />
        </div>
      </main>
    </div>
  );
}

function MobileNavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center justify-center space-y-1 w-12 transition-all ${
        isActive ? 'text-[#0077B6]' : 'text-gray-400'
      }`}
    >
      <div className={`transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-tight">{label}</span>
      {isActive && (
        <div className="absolute bottom-1 w-1 h-1 bg-[#FFC857] rounded-full" />
      )}
    </button>
  );
}

function NavItem({ icon, label, isActive, onClick, isExpanded }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, isExpanded: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${
        isActive ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
      title={label}
    >
      <div className={`shrink-0 ${isActive ? 'text-[#FFC857]' : ''}`}>
        {icon}
      </div>
      <span className={`whitespace-nowrap transition-opacity ${!isExpanded ? 'md:hidden lg:inline' : 'inline'}`}>
        {label}
      </span>
    </button>
  );
}
