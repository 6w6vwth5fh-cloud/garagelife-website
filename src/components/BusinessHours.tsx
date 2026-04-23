import { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

type Language = 'en' | 'ja';

interface BusinessHoursProps {
  lang: Language;
}

const BUSINESS_HOURS = {
  lunch: { start: 11.5, end: 15 }, // 11:30 - 15:00
  dinner: { start: 19, end: 27 } // 19:00 - 03:00 (next day)
};

const CLOSED_DAY = 4; // Thursday (0 = Sunday, 4 = Thursday)

export const BusinessHours = ({ lang }: BusinessHoursProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const day = currentTime.getDay();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const timeInHours = hours + minutes / 60;

    // Check if closed day
    if (day === CLOSED_DAY) {
      setIsOpen(false);
      return;
    }

    // Check lunch hours
    if (timeInHours >= BUSINESS_HOURS.lunch.start && timeInHours < BUSINESS_HOURS.lunch.end) {
      setIsOpen(true);
      return;
    }

    // Check dinner hours
    if (timeInHours >= BUSINESS_HOURS.dinner.start) {
      setIsOpen(true);
      return;
    }

    // Check if dinner from previous day (00:00 - 03:00)
    if (timeInHours < 3) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [currentTime]);

  const dayName = lang === 'en' ?
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentTime.getDay()] :
    ['日', '月', '火', '水', '木', '金', '土'][currentTime.getDay()];

  const timeStr = currentTime.toLocaleTimeString(lang === 'en' ? 'en-US' : 'ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`flex items-center gap-3 p-4 rounded border-2 border-ink ${
      isOpen
        ? 'bg-green-50 border-green-600'
        : 'bg-red-50 border-red-600'
    }`}>
      <div>
        {isOpen ? (
          <CheckCircle className="w-6 h-6 text-green-600" />
        ) : (
          <AlertCircle className="w-6 h-6 text-red-600" />
        )}
      </div>
      <div className="flex-1">
        <p className={`font-bold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
          {lang === 'en' ? (isOpen ? 'Currently Open' : 'Currently Closed') : (isOpen ? '営業中です' : '営業時間外です')}
        </p>
        <p className="text-xs text-ink/60">
          {dayName} {timeStr}
        </p>
      </div>
    </div>
  );
};
