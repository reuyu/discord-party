import React from 'react';
import { Megaphone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ format = 'horizontal', className = '' }) => {
  const { language } = useLanguage();
  return (
    <div className={`ad-banner-slot ${className}`}>
      <span className="ad-label">ADVERTISEMENT</span>
      <div className="ad-placeholder" style={{ height: format === 'rectangle' ? '250px' : '90px' }}>
        <Megaphone size={18} color="#64748B" />
        <span>
          {language === 'ko'
            ? 'PartyHub 스폰서 & 광고 배너 영역 (AdSense 슬롯)'
            : 'PartyHub Sponsor & Advertisement Banner (AdSense)'}
        </span>
      </div>
    </div>
  );
};
