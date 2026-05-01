"use client";

import React from "react";
import { ExternalLink, Search, Sparkles, MessageCircle, Brain } from "lucide-react";

type Lang = 'vi' | 'en';

const AI_ENGINES = [
  {
    id: 'perplexity',
    name: 'Perplexity',
    emoji: '🔍',
    color: '#1FB8CD',
    url: 'https://www.perplexity.ai',
    google_login: true,
    vi_tagline: 'Search engine có cite từng câu',
    en_tagline: 'Search engine that cites every sentence',
    vi_why: 'Câu trả lời kèm nguồn rõ ràng. Train kid kỹ năng verify thông tin. Có Google login miễn phí.',
    en_why: 'Answers with clear sources. Trains source verification. Free Google login.',
    vi_use: 'Dùng khi: cần research nhanh + verify nguồn cho bài thuyết trình',
    en_use: 'Use for: quick research + source verification for presentations',
    badge_vi: 'Khuyến nghị #1',
    badge_en: 'Top pick',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    emoji: '💬',
    color: '#10A37F',
    url: 'https://chat.openai.com',
    google_login: true,
    vi_tagline: 'AI conversation đầu tiên triệu user',
    en_tagline: 'The AI that started the million-user wave',
    vi_why: 'AI hội thoại của OpenAI. Tốt cho brainstorm, viết draft. Cần xác minh fact.',
    en_why: 'OpenAI conversational AI. Good for brainstorming, drafting. Verify facts separately.',
    vi_use: 'Dùng khi: brainstorm ý tưởng, viết draft, code đơn giản',
    en_use: 'Use for: brainstorming, drafting, simple code',
    badge_vi: 'Phổ biến',
    badge_en: 'Popular',
  },
  {
    id: 'claude',
    name: 'Claude.ai',
    emoji: '🧠',
    color: '#C97757',
    url: 'https://claude.ai',
    google_login: true,
    vi_tagline: 'AI thông minh + an toàn nhất hiện tại',
    en_tagline: 'Smartest + safest AI today',
    vi_why: 'AI của Anthropic. Tư duy tốt, viết hay, code khó. Lưu ý: yêu cầu user 18+.',
    en_why: 'Anthropic\'s AI. Strong reasoning, great writing, complex code. Note: 18+ user required.',
    vi_use: 'Dùng khi: bố ngồi cùng các bạn nhỏ — bố là người chat, các bạn nói ý tưởng',
    en_use: 'Use when: parent sits with kids — parent operates, kids share ideas',
    badge_vi: '18+',
    badge_en: '18+',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    emoji: '✨',
    color: '#4285F4',
    url: 'https://gemini.google.com',
    google_login: true,
    vi_tagline: 'AI của Google + tích hợp Gmail/Docs',
    en_tagline: 'Google\'s AI + Gmail/Docs integration',
    vi_why: 'Tích hợp deep với Google Workspace. Có version cho 13+ với Family Link.',
    en_why: 'Deep Google Workspace integration. 13+ version available via Family Link.',
    vi_use: 'Dùng khi: làm việc trong Google Docs/Sheets/Slides',
    en_use: 'Use when: working in Google Docs/Sheets/Slides',
    badge_vi: '13+',
    badge_en: '13+',
  },
];

const SAFETY_TIPS_VI = [
  '🛡️ Không bao giờ chia sẻ tên thật, địa chỉ, số điện thoại, ảnh cá nhân với AI.',
  '🤔 Mỗi câu trả lời của AI: hỏi "AI có thể sai không?" — luôn verify với 1-2 nguồn khác.',
  '✋ Nếu AI nói gì lạ, không thoải mái → đóng tab + nói với bố/mẹ ngay.',
  '📝 AI là cộng tác viên, không phải làm hộ. Em vẫn phải nghĩ trước khi hỏi.',
  '⏱️ Đặt timer 20 phút mỗi session AI. Đứng dậy nhìn xa, nghỉ mắt.',
];

const SAFETY_TIPS_EN = [
  '🛡️ Never share your real name, address, phone, or personal photos with AI.',
  '🤔 For every AI answer ask: "Could AI be wrong?" — always verify with 1-2 other sources.',
  '✋ If AI says anything strange or makes you uncomfortable → close tab + tell parent right away.',
  '📝 AI is a collaborator, not a replacement. You still have to think before asking.',
  '⏱️ Set a 20-min timer per AI session. Stand up, look far, rest your eyes.',
];

export default function AISearchTab({
  lang,
  L,
}: {
  lang: Lang;
  L: (vi: string, en: string) => string;
}) {
  const tips = lang === 'vi' ? SAFETY_TIPS_VI : SAFETY_TIPS_EN;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 className="display" style={{ fontSize: 36, fontWeight: 700, margin: 0, color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 40 }} className="float-anim">🔍</span>
          {L('Search AI', 'AI Search')}
        </h2>
        <div className="hand" style={{ fontSize: 22, color: '#845EC2', marginTop: 4 }}>
          {L('AI search engines an toàn — luôn xác minh nguồn', 'Safe AI search engines — always verify sources')}
        </div>
      </div>

      {/* Safety panel */}
      <div style={{ background: 'linear-gradient(135deg, #FFD43B, #FF8787)', color: '#fff', padding: 18, borderRadius: 20, marginBottom: 18 }}>
        <h3 className="display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          🛡️ {L('5 nguyên tắc an toàn khi dùng AI', '5 AI safety principles')}
        </h3>
        {tips.map((tip, i) => (
          <div key={i} className="body-f" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>
            {tip}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
        {AI_ENGINES.map(ai => (
          <div key={ai.id} className="card-hover" style={{
            background: '#fff', borderRadius: 20, padding: 20,
            border: `2px solid ${ai.color}40`, boxShadow: '0 4px 12px rgba(132,94,194,0.08)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 100, opacity: 0.05 }}>{ai.emoji}</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, position: 'relative' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `linear-gradient(135deg, ${ai.color}, ${ai.color}aa)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                boxShadow: `0 4px 12px ${ai.color}55`,
              }}>{ai.emoji}</div>
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 20, fontWeight: 700, color: ai.color, lineHeight: 1.2 }}>{ai.name}</div>
                <div className="body-f" style={{ fontSize: 12, color: '#9B8FB8', fontWeight: 600, marginTop: 2 }}>
                  {L(ai.vi_tagline, ai.en_tagline)}
                </div>
              </div>
              <span className="body-f" style={{
                background: `${ai.color}20`, color: ai.color, padding: '4px 10px', borderRadius: 999,
                fontSize: 10, fontWeight: 700, height: 'fit-content',
              }}>{L(ai.badge_vi, ai.badge_en)}</span>
            </div>

            <div className="body-f" style={{ fontSize: 13, color: '#6B5B95', lineHeight: 1.5, marginBottom: 10 }}>
              {L(ai.vi_why, ai.en_why)}
            </div>

            <div style={{ background: '#F8F4FF', borderRadius: 12, padding: 10, marginBottom: 14, borderLeft: `3px solid ${ai.color}` }}>
              <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: '#9B8FB8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                {L('Khi nào dùng', 'When to use')}
              </div>
              <div className="body-f" style={{ fontSize: 12, color: '#2D1B4E', fontStyle: 'italic' }}>
                {L(ai.vi_use, ai.en_use)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href={ai.url}
                target="_blank"
                rel="noreferrer"
                className="btn-bounce body-f"
                style={{
                  flex: 1,
                  background: `linear-gradient(135deg, ${ai.color}, ${ai.color}dd)`,
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  boxShadow: `0 4px 12px ${ai.color}40`,
                }}
              >
                {L('Mở', 'Open')} {ai.name} <ExternalLink size={14} />
              </a>
              {ai.google_login && (
                <span className="body-f" style={{
                  background: '#fff',
                  border: '1.5px solid #E5DBF0',
                  color: '#9B8FB8',
                  padding: '6px 10px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  🔑 Google login
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={{ marginTop: 20, padding: 16, background: '#F8F4FF', borderRadius: 16, borderLeft: '4px solid #845EC2' }}>
        <div className="body-f" style={{ fontSize: 13, color: '#2D1B4E', lineHeight: 1.6 }}>
          <strong>💡 {L('Lưu ý', 'Note')}:</strong> {L(
            'Đại Ka 🌸 (chatbot ở góc dưới phải) là AI mặc định cho các bạn — đã setup an toàn cho trẻ 6-16 tuổi. Các AI bên ngoài dùng khi cần research/tools chuyên dụng, có bố/mẹ giám sát.',
            'Đại Ka 🌸 (chatbot bottom-right) is the default AI for kids — pre-configured COPPA-safe for ages 6-16. External AIs are for specialized research/tools, with parental supervision.'
          )}
        </div>
      </div>
    </div>
  );
}
