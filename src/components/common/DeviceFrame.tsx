import React from 'react';
import { useFootball } from '../../context/FootballContext';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { isMobileFrame, toggleMobileFrame, language } = useFootball();

  if (!isMobileFrame) {
    return (
      <div className="w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col bg-[#0D0D0D] shadow-2xl min-h-screen border-x border-[#1C1C1C]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] py-4 sm:py-8 px-2 flex flex-col items-center justify-center">
      {/* Top Bar Hint */}
      <div className="mb-3 flex items-center gap-3 text-xs text-neutral-400">
        <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
          <Smartphone className="w-4 h-4 text-[#00FF87]" />
          {language === 'ar' ? 'معاينة شاشة الهاتف المحمول (365Scores / SofaScore)' : 'Mobile Phone Preview (365Scores / SofaScore)'}
        </span>
        <button
          onClick={toggleMobileFrame}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#161616] hover:bg-neutral-800 border border-[#2C2C2C] text-[#00FF87] font-semibold text-[11px] transition-colors"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'تكبير للشاشة الكاملة' : 'Full Screen'}</span>
        </button>
      </div>

      {/* Realistic Mobile Device Mockup Bezel */}
      <div className="relative w-full max-w-[420px] aspect-[9/19.5] max-h-[890px] h-[860px] bg-black rounded-[48px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,135,0.1)] border-[4px] border-[#2A2A2A] ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Phone Frame Outer Edge Buttons Simulation */}
        <div className="absolute -left-[7px] top-28 w-[3px] h-9 bg-neutral-700 rounded-l-sm" />
        <div className="absolute -left-[7px] top-42 w-[3px] h-14 bg-neutral-700 rounded-l-sm" />
        <div className="absolute -left-[7px] top-60 w-[3px] h-14 bg-neutral-700 rounded-l-sm" />
        <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-neutral-700 rounded-r-sm" />

        {/* Screen Bezel Container */}
        <div className="relative w-full h-full bg-[#0D0D0D] rounded-[40px] flex flex-col overflow-hidden border border-[#202020]">
          {/* Mobile Status Bar with Dynamic Island */}
          <div className="h-8 bg-[#0D0D0D] px-6 flex items-center justify-between text-neutral-300 text-[11px] font-semibold select-none z-40 border-b border-[#1A1A1A]/50">
            {/* Clock */}
            <span className="font-mono text-xs">19:45</span>

            {/* Dynamic Island Pill */}
            <div className="w-24 h-4 bg-black rounded-full border border-neutral-800 flex items-center justify-center px-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse"></span>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Signal className="w-3 h-3 text-neutral-300" />
              <Wifi className="w-3 h-3 text-neutral-300" />
              <BatteryMedium className="w-3.5 h-3.5 text-neutral-300" />
            </div>
          </div>

          {/* App Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto flex flex-col relative custom-scrollbar">
            {children}
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          <div className="h-4 bg-[#121212] flex items-center justify-center safe-bottom">
            <div className="w-28 h-1 bg-neutral-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
