// client/src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="navbar">
      <div className="nav-brand" onClick={onGoHome}>
        <div className="logo-badge">🎮</div>
        <div>
          <div className="brand-title">PartyHub</div>
          <div className="brand-subtitle">Discord Party Games</div>
        </div>
      </div>
    </header>
  );
};
