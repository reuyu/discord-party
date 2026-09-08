import React, { useState, useEffect, useRef } from 'react';
import { Room } from '../../../../shared/types';
import { socket } from '../../socket';
import { sounds } from '../../utils/audio';
import { Mic, ArrowRight, ThumbsUp, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  room: Room;
  myPlayerId: string;
}

export const VoiceBattleView: React.FC<Props> = ({ room, myPlayerId }) => {
  const { t } = useLanguage();
  const state = room.gameState;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 라운드가 바뀌거나 미션이 바뀔 때 음성 즉시 정지
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [state?.roundIndex, state?.currentMission?.line]);

  if (!state) return null;

  const isHost = room.hostId === myPlayerId;
  const playerA = room.players.find(p => p.id === state.playerAId);
  const playerB = room.players.find(p => p.id === state.playerBId);
  const isPlayerA = state.playerAId === myPlayerId;
  const isPlayerB = state.playerBId === myPlayerId;
  const isMyTurn = (state.currentTurn === 'A' && isPlayerA) || (state.currentTurn === 'B' && isPlayerB);
  const myVote = state.votes?.[myPlayerId];

  // 실제 대사 음성 재생 (실제 원본 오디오 파일 + Web Speech API TTS 폴백)
  const handlePlayVoice = () => {
    if (!state.currentMission) return;
    sounds.playClick();

    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    // 1. 실제 오디오 URL이 있는 경우 (원본 음성 파일 직접 재생)
    if (state.currentMission.audioUrl) {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(state.currentMission.audioUrl);
      audioRef.current = audio;
      setIsPlayingAudio(true);
      audio.onended = () => {
        setIsPlayingAudio(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        audioRef.current = null;
        speakTTS();
      };
      audio.play().catch(() => {
        audioRef.current = null;
        speakTTS();
      });
      return;
    }

    // 2. Web Speech API (TTS) 발화
    speakTTS();
  };

  const speakTTS = () => {
    if (!('speechSynthesis' in window)) {
      alert('브라우저가 음성 합성을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel();
    const cleanLine = (state.currentMission?.line || '').replace(/\(.*?\)|\/.*?\//g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanLine);
    utterance.lang = 'ko-KR';
    utterance.pitch = state.currentMission?.pitch || 1.0;
    utterance.rate = state.currentMission?.rate || 0.95;

    // 한국어 음성 찾기
    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(v => v.lang.startsWith('ko'));
    if (koreanVoice) utterance.voice = koreanVoice;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleFinishVoice = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'finish_voice' });
  };

  const handleVote = (choice: 'A' | 'B') => {
    sounds.playClick();
    socket.emit('game:action', {
      type: 'vote_voice',
      payload: { choice }
    });
  };

  const handleNextMatch = () => {
    sounds.playClick();
    socket.emit('game:action', { type: 'next_match' });
  };

  return (
    <div className="game-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      {/* 상단 라운드 정보 */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge-pill" style={{ background: '#6366F1', color: '#FFF' }}>
            {t('inGameMatch', { current: state.roundIndex + 1, total: state.totalRounds })}
          </span>
          <h3 style={{ marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>🎙️ {t('voiceBattle') || 'Voice Battle'}</h3>
        </div>

        <div style={{ color: '#FBBF24', fontWeight: 800 }}>
          {t('inGameScore', { score: state.scores?.[myPlayerId] || 0 })}
        </div>
      </div>

      {/* 재승부 알림 */}
      {state.rematchNotice && (
        <div style={{ background: 'rgba(245, 158, 11, 0.25)', border: '1px solid #F59E0B', padding: '12px 20px', borderRadius: '12px', marginBottom: '16px', color: '#FDE68A', fontWeight: 800 }}>
          {state.rematchNotice}
        </div>
      )}

      {/* 미션 대사 카드 */}
      <div className="glass-panel" style={{ padding: '36px 20px', marginBottom: '24px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(18,16,38,0.95) 80%)' }}>
        <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.3)', color: '#A5B4FC', fontSize: '0.9rem', padding: '6px 14px' }}>
          🎯 {state.currentMission?.character}
        </span>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFF', margin: '20px 0' }}>
          "{state.currentMission?.line}"
        </h1>

        {state.currentMission?.hint && (
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {t('hintLabel', { hint: state.currentMission.hint })}
          </div>
        )}

        {/* 🔊 실제 대사 음성 재생 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePlayVoice}
            style={{
              background: isPlayingAudio ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.1)',
              borderColor: isPlayingAudio ? '#6366F1' : 'var(--border-glass)',
              color: isPlayingAudio ? '#A5B4FC' : '#FFF',
              padding: '10px 22px',
              fontSize: '0.95rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '30px',
              boxShadow: isPlayingAudio ? '0 0 16px rgba(99, 102, 241, 0.6)' : 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            {isPlayingAudio ? <VolumeX size={18} color="#EF4444" /> : <Volume2 size={18} color="#6EE7B7" />}
            <span>{isPlayingAudio ? '⏹️ Stop Voice' : '🔊 Play Original Voice'}</span>
          </button>
        </div>
      </div>

      {/* 투표 진행 안내 배너 (선수 화면에는 심사 중 안내 표출) */}
      {state.phase === 'voting' && (
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', background: 'rgba(245, 158, 11, 0.15)', borderColor: '#F59E0B' }}>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#FDE68A', marginBottom: '4px' }}>
            🗳️ {t('inGameVote')}
          </h4>
          <p style={{ color: '#FFF', fontSize: '0.95rem' }}>
            {(isPlayerA || isPlayerB)
              ? t('inGameWaiting')
              : t('inGameVote')}
          </p>
        </div>
      )}

      {/* 1:1 대진 현황 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* 참가자 A */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: '16px',
            border: state.currentTurn === 'A' && state.phase === 'battle' ? '2px solid #6366F1' : '1px solid var(--border-glass)',
            background: state.currentTurn === 'A' && state.phase === 'battle' ? 'rgba(99, 102, 241, 0.25)' : 'var(--bg-surface)'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{playerA?.avatar}</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{playerA?.name} {isPlayerA && t('inGameMe')}</h3>
          {state.currentTurn === 'A' && state.phase === 'battle' && (
            <span className="badge-pill" style={{ background: '#6366F1', color: '#FFF', marginTop: '8px' }}>
              {t('inGameSpeaking')}
            </span>
          )}

          {state.phase === 'voting' && !isPlayerA && !isPlayerB && (
            <button
              className="btn btn-primary"
              onClick={() => handleVote('A')}
              style={{ width: '100%', marginTop: '16px', background: myVote === 'A' ? '#10B981' : '#6366F1' }}
            >
              <ThumbsUp size={16} />
              <span>{playerA?.name} ({t('inGameVote')})</span>
            </button>
          )}
          {state.phase === 'voting' && isPlayerA && (
            <div style={{ marginTop: '16px', padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#A5B4FC', fontSize: '0.85rem', fontWeight: 700 }}>
              {t('inGameSpectating')}
            </div>
          )}
        </div>

        {/* 참가자 B */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: '16px',
            border: state.currentTurn === 'B' && state.phase === 'battle' ? '2px solid #EC4899' : '1px solid var(--border-glass)',
            background: state.currentTurn === 'B' && state.phase === 'battle' ? 'rgba(236, 72, 153, 0.25)' : 'var(--bg-surface)'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{playerB?.avatar}</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{playerB?.name} {isPlayerB && t('inGameMe')}</h3>
          {state.currentTurn === 'B' && state.phase === 'battle' && (
            <span className="badge-pill" style={{ background: '#EC4899', color: '#FFF', marginTop: '8px' }}>
              {t('inGameSpeaking')}
            </span>
          )}

          {state.phase === 'voting' && !isPlayerA && !isPlayerB && (
            <button
              className="btn btn-primary"
              onClick={() => handleVote('B')}
              style={{ width: '100%', marginTop: '16px', background: myVote === 'B' ? '#10B981' : '#EC4899' }}
            >
              <ThumbsUp size={16} />
              <span>{playerB?.name} ({t('inGameVote')})</span>
            </button>
          )}
          {state.phase === 'voting' && isPlayerB && (
            <div style={{ marginTop: '16px', padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', color: '#A5B4FC', fontSize: '0.85rem', fontWeight: 700 }}>
              {t('inGameSpectating')}
            </div>
          )}
        </div>
      </div>

      {/* 발언 완료 버튼 (오직 현재 발언 턴인 플레이어 본인만 노출) */}
      {state.phase === 'battle' && isMyTurn && (
        <button className="btn btn-primary" onClick={handleFinishVoice} style={{ padding: '14px 36px', fontSize: '1.05rem', background: '#6366F1' }}>
          <Mic size={18} />
          <span>{t('inGameSubmit')}</span>
        </button>
      )}

      {/* 결과 배너 */}
      {state.phase === 'result' && (
        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.2)', borderColor: '#10B981' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#6EE7B7', marginBottom: '16px' }}>
            {t('winnerPraise', { name: room.players.find(p => p.id === state.winnerId)?.name || '' })} (+100)
          </h2>
          {isHost && (
            <button className="btn btn-primary" onClick={handleNextMatch} style={{ padding: '12px 28px' }}>
              <span>{t('inGameNext')}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
