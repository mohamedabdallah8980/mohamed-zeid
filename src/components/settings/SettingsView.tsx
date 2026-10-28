import React, { useState } from 'react';
import { useFootball } from '../../context/FootballContext';
import { footballApi } from '../../services/apiFootball';
import { Globe, Moon, Bell, Play, Key, CheckCircle, Info } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    isSimulatorRunning,
    toggleSimulator,
    refreshMatches,
    t,
  } = useFootball();

  const [inputApiKey, setInputApiKey] = useState(footballApi.getApiKey());
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = () => {
    footballApi.setApiKey(inputApiKey);
    setKeySaved(true);
    refreshMatches();
    setTimeout(() => setKeySaved(false), 3000);
  };

  const handleClearKey = () => {
    setInputApiKey('');
    footballApi.setApiKey('');
    refreshMatches();
  };

  return (
    <div className="p-3 sm:p-4 space-y-5 max-w-2xl mx-auto">
      {/* 1. Language Setting */}
      <div className="bg-[#141414] p-4 rounded-2xl border border-[#242424] space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#00FF87]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('language_label')}</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
              language === 'en'
                ? 'bg-[#1C1C1C] text-[#00FF87] border-[#00FF87]/40 shadow-sm'
                : 'bg-[#121212] text-neutral-400 border-[#222222] hover:text-white'
            }`}
          >
            <span>English (US)</span>
            {language === 'en' && <CheckCircle className="w-4 h-4 text-[#00FF87]" />}
          </button>

          <button
            onClick={() => setLanguage('ar')}
            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
              language === 'ar'
                ? 'bg-[#1C1C1C] text-[#00FF87] border-[#00FF87]/40 shadow-sm'
                : 'bg-[#121212] text-neutral-400 border-[#222222] hover:text-white'
            }`}
          >
            <span>العربية (RTL)</span>
            {language === 'ar' && <CheckCircle className="w-4 h-4 text-[#00FF87]" />}
          </button>
        </div>
      </div>

      {/* 2. Theme Setting */}
      <div className="bg-[#141414] p-4 rounded-2xl border border-[#242424] space-y-3">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#00FF87]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('appearance')}</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setTheme('dark')}
            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
              theme === 'dark'
                ? 'bg-[#1C1C1C] text-[#00FF87] border-[#00FF87]/40'
                : 'bg-[#121212] text-neutral-400 border-[#222222] hover:text-white'
            }`}
          >
            <span>{t('dark_mode')} (#0D0D0D)</span>
            {theme === 'dark' && <CheckCircle className="w-4 h-4 text-[#00FF87]" />}
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
              theme === 'light'
                ? 'bg-[#1C1C1C] text-[#00FF87] border-[#00FF87]/40'
                : 'bg-[#121212] text-neutral-400 border-[#222222] hover:text-white'
            }`}
          >
            <span>{t('light_mode')}</span>
            {theme === 'light' && <CheckCircle className="w-4 h-4 text-[#00FF87]" />}
          </button>
        </div>
      </div>

      {/* 3. Live Simulation & Notifications */}
      <div className="bg-[#141414] p-4 rounded-2xl border border-[#242424] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Play className="w-4 h-4 text-[#00FF87]" />
            <div>
              <span className="text-xs font-bold text-white block">{t('live_sim')}</span>
              <span className="text-[10px] text-neutral-400">
                {language === 'ar' ? 'تحديث عداد الدقائق والأهداف الحية تلقائياً' : 'Auto-advances live game clock and goals'}
              </span>
            </div>
          </div>
          <button
            onClick={toggleSimulator}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
              isSimulatorRunning ? 'bg-[#00FF87]' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-black transition-transform ${
                isSimulatorRunning ? (language === 'ar' ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#222222]">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#00FF87]" />
            <div>
              <span className="text-xs font-bold text-white block">{t('notifications')}</span>
              <span className="text-[10px] text-neutral-400">
                {language === 'ar' ? 'إشعارات وبانر فوري عند تسجيل أي هدف' : 'Banner popups when goals occur'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
              soundEnabled ? 'bg-[#00FF87]' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-black transition-transform ${
                soundEnabled ? (language === 'ar' ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. API-Football v3 Custom Key Setup */}
      <div className="bg-[#141414] p-4 rounded-2xl border border-[#242424] space-y-3">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-[#00FF87]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('api_key_title')}</h3>
        </div>

        <p className="text-[11px] text-neutral-400 leading-relaxed">
          {t('api_key_desc')}
        </p>

        <div className="flex items-center gap-2">
          <input
            type="password"
            value={inputApiKey}
            onChange={(e) => setInputApiKey(e.target.value)}
            placeholder="e.g. 8f6b219a12c4..."
            className="flex-1 bg-[#181818] border border-[#2C2C2C] focus:border-[#00FF87] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono outline-none"
          />
          <button
            onClick={handleSaveKey}
            className="px-4 py-2 bg-[#00FF87] text-black font-bold text-xs rounded-xl hover:bg-[#00df76] transition-colors"
          >
            {keySaved ? 'Saved! ✓' : t('save')}
          </button>
          {inputApiKey && (
            <button
              onClick={handleClearKey}
              className="px-3 py-2 bg-neutral-800 text-neutral-300 hover:text-white text-xs rounded-xl"
            >
              {t('clear')}
            </button>
          )}
        </div>
      </div>

      {/* 5. About & Architecture Info */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-[#202020] space-y-2 text-neutral-400 text-xs">
        <div className="flex items-center gap-2 text-neutral-300 font-semibold">
          <Info className="w-4 h-4 text-[#00FF87]" />
          <span>ScorePulse Architecture & Design</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Inspired by 365Scores, SofaScore, and OneFootball. Features high-contrast dark pitch styling (#0D0D0D & #00FF87), interactive tactical formations, live match minute engine, clean domain-driven architecture, and bidirectional localization (English & العربية RTL).
        </p>
      </div>
    </div>
  );
};
