// client/src/components/AdBanner.tsx
import React, { useEffect, useRef } from 'react';

// ===== 애드센스 설정 =====
const AD_CLIENT = 'ca-pub-6602940684312548';
const AD_SLOT = '8598551995'; // 기본 슬롯 ID

interface AdBannerProps {
  slotId?: string;        // 특정 슬롯을 지정할 때만 사용, 기본값은 AD_SLOT
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
  height?: number;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId,
  format = 'auto',
  style,
  className = '',
  height,
}) => {
  const pushed = useRef(false);
  const resolvedSlot = slotId || AD_SLOT;

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // 개발 환경 무시
    }
  }, []);

  return (
    <div
      className={`ad-banner-slot ${className}`}
      style={{ textAlign: 'center', overflow: 'hidden', ...style }}
    >
      <span className="ad-label">ADVERTISEMENT</span>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          height: height ? `${height}px` : undefined,
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={resolvedSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
