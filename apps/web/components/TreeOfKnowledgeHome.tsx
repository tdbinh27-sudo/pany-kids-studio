'use client';

/**
 * @file components/TreeOfKnowledgeHome.tsx
 * @description Dashboard home screen — canonical Tree of Knowledge image as
 *              static cinematic backdrop with full 27-template nav grid below.
 *
 * D-035 Phase 3a (2026-05-15):
 *  - Expanded grid from 10 → 27 cards (all dashboard tabs accessible from home)
 *  - Drag-to-rearrange with HTML5 drag-and-drop + localStorage persist
 *  - Layout: 5 rows × ~6 cards each
 *    Row 1: Tổng quan / Quiz / Thư viện / Tiếng Anh / Trải nghiệm / Nhật ký
 *    Row 2: Lộ trình / Cây kỹ năng / Lịch tuần / Hướng nghiệp / Tự khám phá / Học viên
 *    Row 3: Sáng tạo / Vận động / Tài chính / Tư duy / Phần mềm / Phần cứng
 *    Row 4: Gia đình / Xuất bản / Báo cáo / Phần thưởng / AI Search / Huy hiệu
 *    Row 5: Portfolio / Bảng xếp hạng / Cài đặt
 *  - Footer "Made with ❤️ by {parentName}" — editable, persisted localStorage
 */

import { useEffect, useState } from 'react';

export type NavItem = {
  id: string;
  label: string;
  label_en?: string;
  tab: string;
  icon: string;
  glow: string;
};

const DEFAULT_NAV: NavItem[] = [
  // Row 1 — anh's specified order (2026-05-15)
  { id: 'overview',    label: 'Tổng quan',      label_en: 'Overview',    tab: 'overview',    icon: '📊', glow: '#4FB3E8' },
  { id: 'quiz',        label: 'Quiz',           label_en: 'Quiz',        tab: 'quiz',        icon: '❓', glow: '#00BFFF' },
  { id: 'library',     label: 'Thư viện',       label_en: 'Library',     tab: 'library',     icon: '📚', glow: '#845EC2' },
  { id: 'english',     label: 'Tiếng Anh',      label_en: 'English',     tab: 'english',     icon: '🇬🇧', glow: '#845EC2' },
  { id: 'experiences', label: 'Trải nghiệm',    label_en: 'Experiences', tab: 'experiences', icon: '🌍', glow: '#00D4AA' },
  { id: 'journal',     label: 'Nhật ký',        label_en: 'Journal',     tab: 'journal',     icon: '📔', glow: '#FFD43B' },
  // Row 2 — learning & navigation
  { id: 'roadmap',     label: 'Lộ trình',       label_en: 'Roadmap',     tab: 'roadmap',     icon: '📖', glow: '#FF6B9D' },
  { id: 'skilltree',   label: 'Cây kỹ năng',    label_en: 'Skill Tree',  tab: 'skilltree',   icon: '🎓', glow: '#FF6B9D' },
  { id: 'calendar',    label: 'Lịch tuần',      label_en: 'Calendar',    tab: 'calendar',    icon: '📅', glow: '#00BFFF' },
  { id: 'career',      label: 'Hướng nghiệp',   label_en: 'Career',      tab: 'career',      icon: '🚀', glow: '#00BFFF' },
  { id: 'discovery',   label: 'Tự khám phá',    label_en: 'Discovery',   tab: 'discovery',   icon: '🔍', glow: '#00D4AA' },
  { id: 'kids',        label: 'Học viên',       label_en: 'Kids',        tab: 'kids',        icon: '👤', glow: '#4FB3E8' },
  // Row 3 — pillars
  { id: 'creative',    label: 'Sáng tạo',       label_en: 'Creative',    tab: 'creative',    icon: '🎨', glow: '#FF6B9D' },
  { id: 'movement',    label: 'Vận động',       label_en: 'Movement',    tab: 'movement',    icon: '🏃', glow: '#FFD43B' },
  { id: 'finance',     label: 'Tài chính',      label_en: 'Finance',     tab: 'finance',     icon: '💰', glow: '#FFD43B' },
  { id: 'thinking',    label: 'Tư duy',         label_en: 'Thinking',    tab: 'thinking',    icon: '🧠', glow: '#845EC2' },
  { id: 'software',    label: 'Phần mềm',       label_en: 'Software',    tab: 'software',    icon: '💻', glow: '#4FB3E8' },
  { id: 'hardware',    label: 'Phần cứng',      label_en: 'Hardware',    tab: 'hardware',    icon: '🔧', glow: '#4FB3E8' },
  // Row 4 — family + tools
  { id: 'family',      label: 'Gia đình',       label_en: 'Family',      tab: 'family',      icon: '👨‍👩‍👧', glow: '#FF6B9D' },
  { id: 'publish',     label: 'Xuất bản',       label_en: 'Publish',     tab: 'publish',     icon: '📰', glow: '#00D4AA' },
  { id: 'report',      label: 'Báo cáo',        label_en: 'Report',      tab: 'report',      icon: '📊', glow: '#00BFFF' },
  { id: 'rewards',     label: 'Phần thưởng',    label_en: 'Rewards',     tab: 'rewards',     icon: '🎁', glow: '#FFD43B' },
  { id: 'aisearch',    label: 'AI Search',      label_en: 'AI Search',   tab: 'aisearch',    icon: '🔎', glow: '#845EC2' },
  { id: 'badges',      label: 'Huy hiệu',       label_en: 'Badges',      tab: 'badges',      icon: '🏆', glow: '#FFD43B' },
  // Row 5 — meta
  { id: 'portfolio',   label: 'Portfolio',      label_en: 'Portfolio',   tab: 'portfolio',   icon: '🖼️', glow: '#FF6B9D' },
  { id: 'leaderboard', label: 'Bảng xếp hạng',  label_en: 'Leaderboard', tab: 'leaderboard', icon: '📈', glow: '#FFD43B' },
  { id: 'settings',    label: 'Cài đặt',        label_en: 'Settings',    tab: 'settings',    icon: '⚙️', glow: '#7FB3D5' },
];

const ORDER_STORAGE_KEY = 'pks-nav-order-v1';
const PARENT_NAME_KEY = 'pks-parent-display-name';

type Props = {
  /** Invoked when user clicks a nav card */
  onNavigate: (tabId: string) => void;
  /** Display language */
  lang?: 'vi' | 'en';
  /** Optional override nav items */
  navItems?: NavItem[];
  /** Greeting children rendered above grid (e.g. HeroGreeting inline) */
  children?: React.ReactNode;
};

export default function TreeOfKnowledgeHome({
  onNavigate,
  lang = 'vi',
  navItems = DEFAULT_NAV,
  children,
}: Props) {
  // Persist order in localStorage; fall back to default if unset or stale
  const [order, setOrder] = useState<string[]>(() => navItems.map(n => n.id));
  const [mounted, setMounted] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [parentName, setParentName] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editDraft, setEditDraft] = useState('');

  // Load persisted order + parentName on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        // Sanitize: keep only valid ids, append new items not yet in saved order
        const validIds = new Set(navItems.map(n => n.id));
        const sanitized = parsed.filter(id => validIds.has(id));
        const missing = navItems.map(n => n.id).filter(id => !sanitized.includes(id));
        setOrder([...sanitized, ...missing]);
      }
      const savedName = localStorage.getItem(PARENT_NAME_KEY);
      if (savedName) setParentName(savedName);
    } catch {}
  }, [navItems]);

  // Build ordered list from id->item map
  const itemMap = new Map(navItems.map(item => [item.id, item]));
  const orderedItems = order.map(id => itemMap.get(id)).filter(Boolean) as NavItem[];

  const persistOrder = (newOrder: string[]) => {
    setOrder(newOrder);
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(newOrder));
    } catch {}
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox to recognize drag start
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== dragOverId) setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const newOrder = [...order];
    const fromIdx = newOrder.indexOf(draggedId);
    const toIdx = newOrder.indexOf(targetId);
    if (fromIdx === -1 || toIdx === -1) return;
    // Remove from old position, insert at new position
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, draggedId);
    persistOrder(newOrder);
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleResetOrder = () => {
    const defaultOrder = navItems.map(n => n.id);
    persistOrder(defaultOrder);
  };

  const handleSaveName = () => {
    const trimmed = editDraft.trim();
    setParentName(trimmed);
    try {
      if (trimmed) localStorage.setItem(PARENT_NAME_KEY, trimmed);
      else localStorage.removeItem(PARENT_NAME_KEY);
    } catch {}
    setIsEditingName(false);
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: '#0A1628',
        minHeight: 'calc(100vh - 100px)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
      aria-label="Pany Kids Studio — Tree of Knowledge dashboard"
    >
      {/* Background canonical image — static cinematic backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/tree-of-knowledge-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Subtle vignette focusing center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '24px 16px 24px',
        }}
      >
        {/* Greeting at top */}
        {children && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            {children}
          </div>
        )}

        {/* Tree image breathing room */}
        <div style={{ minHeight: 'min(48vh, 420px)' }} />

        {/* Drag hint + reset button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#7FB3D5',
            fontSize: 12,
          }}
        >
          <span aria-hidden="true">✋ Kéo và thả để sắp xếp lại</span>
          <button
            onClick={handleResetOrder}
            style={{
              background: 'transparent',
              border: `1px solid #7FB3D533`,
              borderRadius: 8,
              padding: '4px 10px',
              color: '#7FB3D5',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ↻ Khôi phục mặc định
          </button>
        </div>

        {/* Nav grid — 27 cards, 6 per row on wide screens */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 10,
          }}
        >
          {orderedItems.map((item) => {
            const labelText = lang === 'en' && item.label_en ? item.label_en : item.label;
            const isDragging = draggedId === item.id;
            const isDragOver = dragOverId === item.id && draggedId !== item.id;
            return (
              <button
                key={item.id}
                draggable={mounted}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => handleDrop(e, item.id)}
                onDragEnd={handleDragEnd}
                onClick={() => onNavigate(item.tab)}
                style={{
                  background: isDragOver
                    ? `rgba(15,34,64,0.95)`
                    : 'rgba(15,34,64,0.78)',
                  border: isDragOver
                    ? `2px dashed ${item.glow}`
                    : `1px solid ${item.glow}66`,
                  borderRadius: 14,
                  padding: '12px 12px',
                  color: '#E8F4FB',
                  cursor: isDragging ? 'grabbing' : 'pointer',
                  opacity: isDragging ? 0.4 : 1,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, opacity 0.15s ease',
                  textAlign: 'left',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  if (isDragging) return;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 22px ${item.glow}55`;
                  e.currentTarget.style.borderColor = `${item.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = isDragOver ? item.glow : `${item.glow}66`;
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true">
                  {item.icon}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {labelText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer: Made with ❤️ by {parentName} */}
        <footer
          style={{
            marginTop: 32,
            padding: '16px 12px',
            textAlign: 'center',
            color: '#7FB3D5',
            fontSize: 13,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderTop: '1px solid rgba(79,179,232,0.15)',
          }}
        >
          {isEditingName ? (
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              Made with <span aria-hidden="true">❤️</span> by{' '}
              <input
                autoFocus
                type="text"
                value={editDraft}
                onChange={(e) => setEditDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') setIsEditingName(false);
                }}
                placeholder="Tên cha mẹ"
                maxLength={40}
                style={{
                  background: 'rgba(15,34,64,0.7)',
                  border: '1px solid #4FB3E866',
                  borderRadius: 6,
                  padding: '4px 10px',
                  color: '#E8F4FB',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  width: 200,
                }}
              />
              <button
                onClick={handleSaveName}
                style={{
                  background: 'rgba(79,179,232,0.2)',
                  border: '1px solid #4FB3E8',
                  borderRadius: 6,
                  padding: '4px 10px',
                  color: '#4FB3E8',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Lưu
              </button>
              <button
                onClick={() => setIsEditingName(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid #7FB3D533',
                  borderRadius: 6,
                  padding: '4px 10px',
                  color: '#7FB3D5',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Hủy
              </button>
            </span>
          ) : (
            <>
              Made with <span aria-hidden="true">❤️</span> by{' '}
              <button
                onClick={() => {
                  setEditDraft(parentName);
                  setIsEditingName(true);
                }}
                title={parentName ? 'Chạm để đổi tên' : 'Chạm để thêm tên cha mẹ'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: parentName ? '#4FB3E8' : '#7FB3D5',
                  fontSize: 13,
                  fontWeight: parentName ? 700 : 400,
                  cursor: 'pointer',
                  textDecoration: parentName ? 'none' : 'underline dotted',
                  fontFamily: 'inherit',
                  padding: 0,
                }}
              >
                {parentName || '___'}
              </button>
              {' · '}
              <span style={{ opacity: 0.6 }}>PANY Vietnam · 2026</span>
            </>
          )}
        </footer>
      </div>
    </section>
  );
}
