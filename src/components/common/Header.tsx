import React, { useState } from 'react';
import { useFootball } from '../../context/FootballContext';
import { Play, Pause, Smartphone, Monitor, Sun, Moon, Globe, Bell } from 'lucide-react';
import { FlutterExportModal } from '../flutter-export/FlutterExportModal';

export const Header: React.FC = () => {
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    isSimulatorRunning,
    toggleSimulator,
    isMobileFrame,
    toggleMobileFrame,
    latestNotification,
    clearNotification,
    t,
  } = useFootball();

  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#222222] px-4 py-2.5 transition-colors">
      <div className="flex items-center justify-between max-w-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#161616] border border-[#2C2C2C] flex items-center justify-center shadow-inner">
            <span className="text-lg">⚽</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-base">
                Score<span className="text-[#00FF87]">Pulse</span>
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]"></span>
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium -mt-0.5">
              {language === 'ar' ? 'بث النتائج والإحصائيات المباشرة' : 'Live Football Center'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Flutter Code & ZIP Export Button */}
          <button
            onClick={() => setIsFlutterModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00FF87]/15 hover:bg-[#00FF87]/25 border border-[#00FF87]/50 text-xs font-bold text-[#00FF87] transition-all shadow-[0_0_10px_rgba(0,255,135,0.2)]"
            title="تحميل وعرض كود Flutter & Dart"
          >
            <span>📱</span>
            <span className="text-[11px] font-extrabold">Flutter & Dart</span>
          </button>

          {/* Live Simulator Play/Pause */}
          <button
            onClick={toggleSimulator}
            title={isSimulatorRunning ? 'Pause live simulation' : 'Resume live simulation'}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all border ${
              isSimulatorRunning
                ? 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/40 shadow-[0_0_10px_rgba(0,255,135,0.2)]'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700'
            }`}
          >
            {isSimulatorRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] hidden sm:inline">{language === 'ar' ? 'المحاكي نشط' : 'Live Clock'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] hidden sm:inline">{language === 'ar' ? 'تشغيل' : 'Paused'}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#161616] hover:bg-neutral-800 border border-[#2C2C2C] text-xs font-semibold text-neutral-200 transition-colors"
            title="Toggle Language / تبديل اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-[#00FF87]" />
            <span className="text-[11px] font-bold">{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Phone Frame Toggle */}
          <button
            onClick={toggleMobileFrame}
            className="p-1.5 rounded-md bg-[#161616] hover:bg-neutral-800 border border-[#2C2C2C] text-neutral-300 hover:text-white transition-colors"
            title={isMobileFrame ? t('full_view') : t('phone_frame')}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4 text-[#00FF87]" /> : <Smartphone className="w-4 h-4 text-[#00FF87]" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-md bg-[#161616] hover:bg-neutral-800 border border-[#2C2C2C] text-neutral-300 hover:text-white transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-400" />}
          </button>
        </div>
      </div>

      {/* Goal Notification Toast if triggered */}
      {latestNotification && (
        <div className="mt-2 py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#00FF87]/20 via-[#00FF87]/30 to-[#00FF87]/10 border border-[#00FF87]/50 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#00FF87] animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">{latestNotification}</span>
          </div>
          <button onClick={clearNotification} className="text-xs text-neutral-400 hover:text-white ml-2 px-1">
            ✕
          </button>
        </div>
      )}

      {/* Flutter Source Code & ZIP Export Modal */}
      <FlutterExportModal
        isOpen={isFlutterModalOpen}
        onClose={() => setIsFlutterModalOpen(false)}
      />
    </header>
  );
};
