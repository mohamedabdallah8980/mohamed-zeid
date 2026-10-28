import React from 'react';
import { useFootball } from '../../context/FootballContext';
import { Calendar } from 'lucide-react';

export const DateStrip: React.FC = () => {
  const { selectedDate, setSelectedDate, language, t } = useFootball();

  // Create date options: 2 days before, yesterday, today, tomorrow, 2 days ahead
  const dates = [
    { label: language === 'ar' ? '26 أكتوبر' : '26 Oct', sub: language === 'ar' ? 'الإثنين' : 'Mon', value: '2026-10-26' },
    { label: t('yesterday'), sub: language === 'ar' ? '27 أكتوبر' : '27 Oct', value: '2026-10-27' },
    { label: t('today'), sub: language === 'ar' ? '28 أكتوبر' : '28 Oct', value: '2026-10-28', isToday: true },
    { label: t('tomorrow'), sub: language === 'ar' ? '29 أكتوبر' : '29 Oct', value: '2026-10-29' },
    { label: language === 'ar' ? '30 أكتوبر' : '30 Oct', sub: language === 'ar' ? 'الجمعة' : 'Fri', value: '2026-10-30' },
  ];

  return (
    <div className="bg-[#121212] border-b border-[#222222] py-2 px-3 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        {dates.map((d) => {
          const isSelected = selectedDate === d.value;
          return (
            <button
              key={d.value}
              onClick={() => setSelectedDate(d.value)}
              className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#1E1E1E] text-[#00FF87] border border-[#00FF87]/50 shadow-[0_0_12px_rgba(0,255,135,0.15)]'
                  : 'bg-[#161616] text-neutral-400 hover:text-neutral-200 border border-[#262626]'
              }`}
            >
              <span className={`text-[11px] ${isSelected ? 'font-bold' : 'font-medium'}`}>{d.label}</span>
              <span className="text-[10px] text-neutral-400 opacity-90">{d.sub}</span>
            </button>
          );
        })}

        {/* Date picker button */}
        <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#161616] border border-[#262626] text-neutral-300 hover:text-white cursor-pointer transition-colors text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#00FF87]" />
          <span className="text-[11px]">{t('pick_date')}</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
};
