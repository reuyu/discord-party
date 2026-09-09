// client/src/components/AdBanner.tsx
import React, { useEffect, useRef } from 'react';

// AdSense 퍼블리셔 ID (ca-pub-xxxxxxxx)
const AD_CLIENT = 'ca-pub-6602940684312548';

interface AdBannerProps {
  // 애드센스 광고 단위 슬롯 ID
  // 애드센스 콘솔 → 광고 → 광고 단위 기준 → 디스플레이 광고 → 저장 및 코드 가져오기 에서 확인
  // 예: slotId="1234567890"
  slotId?: string;
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
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // slotId가 없거나 숫자 형식이 아니면 광고 로드 안 함
    if (!slotId || !/^\d+$/.test(slotId)) return;
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // 개발 환경 무시
    }
  }, [slotId]);

  // 실제 슬롯 ID가 없으면 렌더링 안 함
  if (!slotId || !/^\d+$/.test(slotId)) {
    return null;
  }

  return (
    <div
      className={`ad-banner-slot ${className}`}
      style={{ textAlign: 'center', overflow: 'hidden', ...style }}
    >
      <span className="ad-label">ADVERTISEMENT</span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          height: height ? `${height}px` : undefined,
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
