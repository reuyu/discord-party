// client/src/components/common/CountdownTimer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';
import { sounds } from '../../utils/audio';
import { useLanguage } from '../../i18n/LanguageContext';

interface CountdownTimerProps {
  startedAt: number;
  durationSec: number;
  onTimeout?: () => void;
  playTick?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  startedAt,
  durationSec,
  onTimeout,
  playTick = true
}) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    return Math.max(0, durationSec - elapsed);
  });

  // onTimeout 참조를 useRef로 격리하여 상위 컴포넌트의 빈번한 리렌더링으로 인한 interval 리셋 방지
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const calledTimeoutRef = useRef(false);
  const lastTickSecondRef = useRef<number | null>(null);

  useEffect(() => {
    calledTimeoutRef.current = false;
    lastTickSecondRef.current = null;

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = Math.max(0, durationSec - elapsed);
      setTimeLeft(remaining);

      if (remaining > 0 && remaining <= 5 && playTick && lastTickSecondRef.current !== remaining) {
        lastTickSecondRef.current = remaining;
        sounds.playTick();
      }

      if (remaining === 0 && !calledTimeoutRef.current) {
        calledTimeoutRef.current = true;
        if (onTimeoutRef.current) {
          onTimeoutRef.current();
        }
      }
    };

    updateTimer();
    // 250ms 간격으로 고정 체크하여 지연 없이 정확한 초 계산
    const interval = setInterval(updateTimer, 250);

    return () => clearInterval(interval);
  }, [startedAt, durationSec, playTick]);

  const progress = Math.min(100, Math.max(0, (timeLeft / durationSec) * 100));

  let barColor = '#10B981'; // green
  if (progress < 30) barColor = '#EF4444'; // red
  else if (progress < 60) barColor = '#F59E0B'; // yellow

  return (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: barColor }}>
          <Timer size={16} />
          <span>{t('timeLeftLabel')}</span>
        </div>
        <span style={{ color: barColor, fontSize: '1.05rem', fontFamily: 'monospace' }}>
          {timeLeft}{t('secondsUnit')}
        </span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: barColor,
            transition: 'width 0.25s linear, background-color 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};
