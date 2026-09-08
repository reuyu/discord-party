// client/src/components/Footer.tsx
import React, { useState } from 'react';
import { ShieldCheck, FileText, HelpCircle, Mail, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'about' | 'contact' | null>(null);
  const { t } = useLanguage();

  return (
    <footer style={{
      marginTop: '40px',
      borderTop: '1px solid var(--border-glass)',
      padding: '28px 20px',
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(10px)',
      color: 'var(--text-secondary)',
      fontSize: '0.85rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* 상단 링크 메뉴 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🎮</span>
            <strong style={{ color: '#FFF', fontSize: '1rem', letterSpacing: '-0.3px' }}>PartyHub</strong>
            <span style={{ fontSize: '0.78rem', color: '#A5B4FC', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 8px', borderRadius: '12px' }}>
              Discord Party & Casual Games
            </span>
          </div>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontWeight: 600 }}>
            <button
              onClick={() => setActiveModal('about')}
              style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}
            >
              PartyHub
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}
            >
              {t('privacyPolicy')}
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}
            >
              {t('termsOfService')}
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}
            >
              {t('contact')}
            </button>
          </div>
        </div>

        {/* 하단 고지사항 및 카피라이트 */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.78rem',
          color: '#64748B'
        }}>
          <div>
            {t('footerDesc')}
            <br />
            Disclaimer: PartyHub is not affiliated with, endorsed, or sponsored by Discord Inc.
          </div>
          <div>{t('copyright')}</div>
        </div>
      </div>

      {/* 모달 팝업 */}
      {activeModal && (
        <div
          className="modal-overlay"
          onClick={() => setActiveModal(null)}
          style={{ zIndex: 1000 }}
        >
          <div
            className="modal-content glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '680px',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '24px',
              lineHeight: 1.6
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {activeModal === 'privacy' && <><ShieldCheck size={20} color="#10B981" /> 개인정보처리방침 (Privacy Policy)</>}
                {activeModal === 'terms' && <><FileText size={20} color="#6366F1" /> 서비스 이용약관 (Terms of Service)</>}
                {activeModal === 'about' && <><HelpCircle size={20} color="#F59E0B" /> PartyHub 서비스 소개</>}
                {activeModal === 'contact' && <><Mail size={20} color="#EC4899" /> 고객 문의 및 버그 제보</>}
              </h3>
              <button
                className="btn-close"
                onClick={() => setActiveModal(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '0.88rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeModal === 'privacy' && (
                <>
                  <p><strong>1. 수집하는 개인정보 항목</strong></p>
                  <p>PartyHub는 별도의 회원가입 없이 플레이할 수 있으며, 방 입장 시 사용자가 임의로 입력하는 닉네임과 선택한 프로필 이모지만을 일시적인 인게임 식별용으로 사용합니다. 게임 종료 또는 연결 해제 시 개인 식별 정보는 저장되지 않고 파기됩니다.</p>
                  <p><strong>2. 쿠키(Cookie) 및 웹 스토리지 이용</strong></p>
                  <p>서비스 이용 편의를 위해 브라우저 LocalStorage에 마지막으로 사용한 닉네임, 게임별 누적 플레이 카운트 설정이 보관될 수 있습니다. 사용자는 언제든지 브라우저 캐시 삭제를 통해 이를 초기화할 수 있습니다.</p>
                  <p><strong>3. 제3자 광고 사업자(Google AdSense 등) 안내</strong></p>
                  <p>본 사이트는 서비스 운영 및 유지를 위해 제3자 광고 사업자(Google LLC 등)의 광고를 게재할 수 있습니다. Google은 이용자의 본 웹사이트 및 다른 웹사이트 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(DART 쿠키 등)를 사용할 수 있습니다. 이용자는 Google 광고 및 콘텐츠 네트워크 개인정보 보호정책 페이지를 방문하여 맞춤형 광고용 쿠키 사용을 선택 해제할 수 있습니다.</p>
                  <p><strong>4. 개인정보 보호책임자</strong></p>
                  <p>문의: partyhub.service@gmail.com</p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p><strong>제1조 (목적)</strong></p>
                  <p>본 약관은 PartyHub(이하 "서비스")가 제공하는 실시간 파티게임 및 부가 서비스의 이용 조건 및 제반 사항을 규정함을 목적으로 합니다.</p>
                  <p><strong>제2조 (이용자의 의무)</strong></p>
                  <p>이용자는 다음 각 호의 행위를 하여서는 안 됩니다:
                    <br />- 타인에게 불쾌감을 주는 음란, 폭력, 비방 목적의 닉네임 사용
                    <br />- 봇 또는 불법 매크로를 이용한 비정상적인 게임 패킷 조작 및 서버 부하 유발 행위
                    <br />- 악의적인 채팅 도배 및 타인의 게임 진행 고의 방해
                  </p>
                  <p><strong>제3조 (서비스의 변경 및 중단)</strong></p>
                  <p>서비스는 무료로 제공되며, 서버 점검, 인프라 이전, 불가항력적 사유 발생 시 사전 공지 후 서비스의 일부 또는 전부를 일시적으로 변경하거나 중단할 수 있습니다.</p>
                  <p><strong>제4조 (면책 조항)</strong></p>
                  <p>이용자 간의 언어적 분쟁, 디스코드 음성 채널 상의 분쟁에 대해 서비스는 책임을 지지 않습니다.</p>
                </>
              )}

              {activeModal === 'about' && (
                <>
                  <p>PartyHub는 <strong>"설치 없이, 링크 하나로 친구들과 즉시 모여 웃고 떠드는 파티 공간"</strong>을 모토로 제작된 웹 기반 캐주얼 미니게임 플랫폼입니다.</p>
                  <p>💡 <strong>주요 특징:</strong></p>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li><strong>무설치 & 즉시 참여:</strong> 방장이 방을 만들고 URL 초대 링크를 복사해 디스코드에 붙여넣으면 누구나 즉시 입장 가능합니다.</li>
                    <li><strong>다채로운 20여 종 게임:</strong> 심리 추리(라이어 게임, 마피아), 피지컬 배틀(서부의 결투, 꼬리잡기, 스피드 연타), 퀴즈 및 예능 토론까지 완벽 지원합니다.</li>
                    <li><strong>무한 커스텀 팩:</strong> 유저가 직접 단어, 이미지, 질문 팩을 제작해 업로드하고 친구들과 함께 플레이할 수 있습니다.</li>
                  </ul>
                </>
              )}

              {activeModal === 'contact' && (
                <>
                  <p>PartyHub를 플레이해주셔서 감사합니다! 서비스 개선 아이디어, 새로운 게임 규칙 제안, 버그 제보, 또는 스트리머/기업 제휴 문의는 언제든지 환영합니다.</p>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', marginTop: '10px' }}>
                    <p>📧 <strong>공식 문의 이메일:</strong> partyhub.service@gmail.com</p>
                    <p>💬 <strong>피드백 접수:</strong> 게임 내 버그나 불편 사항 제보 시 사용 중이신 브라우저 종류(크롬/엣지/웨일 등)를 함께 적어주시면 빠른 조치가 가능합니다.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
