// client/src/components/AdBanner.tsx
import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ format = 'horizontal', className = '' }) => {
  return (
    <div className={`ad-banner-slot ${className}`}>
      <span className="ad-label">ADVERTISEMENT</span>
      <div className="ad-placeholder" style={{ height: format === 'rectangle' ? '250px' : '90px' }}>
        <Megaphone size={18} color="#64748B" />
        <span>PartyHub 스폰서 & 광고 배너 영역 (AdSense 슬롯)</span>
      </div>
    </div>
  );
};
