'use client';

/**
 * @file components/DrawStudioTab.tsx
 * @description Vẽ & Sáng Tạo (Draw Studio) — coloring + 3D-drawing corner.
 *              84 line-art coloring templates (6 categories) adapted from
 *              oh-namgyu/kids-coloring (MIT) + a 7th "Khối 3D" category authored
 *              in-house (ties into PracticeTab's GeoGebra 3D-geometry problems and
 *              the Space Explorer track). Two ways to use every template:
 *                1) Color it right in the browser (canvas brush + outline overlay).
 *                2) Print the blank outline on paper (own popup window, own print CSS —
 *                   doesn't depend on the host app's print layout).
 *              Plus a curated link-out section to official NASA space coloring pages
 *              (public domain, US government work) that ties to the Space Explorer track.
 *              Standalone tab: takes only `lang` (no per-kid progress), same shape as
 *              PracticeTab (D-043).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { DRAW_CATEGORIES, DRAW3D_HINTS, type DrawTemplate } from '@/lib/draw-templates';

type Lang = 'vi' | 'en';
type Props = { lang: Lang };

// Kid-friendly 24-color palette (same set as the upstream MIT project's config.ts)
const COLORS: string[] = [
  '#e53935', '#ff8a80', '#d81b60',
  '#f48fb1', '#fb8c00', '#ffb74d',
  '#fdd835', '#fff176', '#cddc39',
  '#43a047', '#2e7d32', '#aed581',
  '#00897b', '#26c6da', '#1e88e5',
  '#1565c0', '#5e35b1', '#b39ddb',
  '#ffcba4', '#e0ac69', '#8d6e63',
  '#000000', '#9e9e9e', '#ffffff',
];
const BRUSH_SIZES = [10, 20, 36];
const HISTORY_CAP = 10;
const CANVAS_PX = 640; // internal resolution — templates are all viewBox 0 0 100 100 (square)

function openPrintWindow(title: string, bodyHtml: string) {
  const w = window.open('', '_blank', 'width=820,height=920');
  if (!w) {
    alert('Trình duyệt đang chặn cửa sổ in. Vui lòng cho phép popup rồi thử lại. / Your browser blocked the print popup — please allow popups and try again.');
    return;
  }
  w.document.write(`<!doctype html><html><head><title>${title}</title><meta charset="utf-8"/>
    <style>
      @page { margin: 12mm; }
      * { box-sizing: border-box; }
      body { margin:0; display:flex; flex-direction:column; align-items:center; justify-content:flex-start;
             min-height:100vh; font-family: system-ui, sans-serif; padding: 16px; }
      h2 { margin: 4px 0 18px; color:#334155; font-size: 20px; }
      .art { width: 92vw; max-width: 620px; aspect-ratio: 1 / 1; }
      .art svg, .art img { width:100%; height:100%; display:block; }
      footer { margin-top: 14px; font-size: 11px; color:#94a3b8; }
    </style></head>
    <body>
      <h2>${title}</h2>
      <div class="art">${bodyHtml}</div>
      <footer>PANY Kids Studio · kids.panyvn.app</footer>
      <script>window.onload = function () { setTimeout(function () { window.print(); }, 120); };</script>
    </body></html>`);
  w.document.close();
}

/** One coloring template card (thumbnail → click to open the drawing workspace). */
function TemplateCard({ tpl, lang, onOpen }: { tpl: DrawTemplate; lang: Lang; onOpen: () => void }) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const hint = DRAW3D_HINTS[tpl.id];
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-sm hover:border-pink-300 hover:shadow-md transition flex flex-col">
      <button onClick={onOpen} className="aspect-square rounded-xl bg-slate-50 p-2 flex-1" title={L('Tô màu trong app', 'Color in the app')}>
        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: tpl.svg }} />
      </button>
      <div className="mt-2 text-center text-sm font-semibold text-slate-800">{L(tpl.name_vi, tpl.name_en)}</div>
      {hint && <div className="mt-1 text-[11px] text-amber-700 text-center leading-snug">💡 {L(hint.vi, hint.en)}</div>}
      <div className="mt-2 flex gap-2">
        <button onClick={onOpen} className="flex-1 text-xs font-semibold rounded-lg py-1.5 bg-pink-50 text-pink-700 hover:bg-pink-100">
          🖍️ {L('Tô trong app', 'Color here')}
        </button>
        <button
          onClick={() => openPrintWindow(L(tpl.name_vi, tpl.name_en), tpl.svg)}
          className="flex-1 text-xs font-semibold rounded-lg py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100"
        >
          🖨️ {L('In ra giấy', 'Print')}
        </button>
      </div>
    </div>
  );
}

/** Full drawing workspace: canvas brush layer + outline overlay + toolbar. */
function ColoringWorkspace({ tpl, lang, onClose }: { tpl: DrawTemplate; lang: Lang; onClose: () => void }) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(BRUSH_SIZES[1]);
  const [eraser, setEraser] = useState(false);
  const historyRef = useRef<string[]>([]);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = CANVAS_PX;
    c.height = CANVAS_PX;
    const ctx = c.getContext('2d');
    ctx?.clearRect(0, 0, c.width, c.height);
    historyRef.current = [];
  }, [tpl.id]);

  const pushHistory = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    historyRef.current.push(c.toDataURL());
    if (historyRef.current.length > HISTORY_CAP) historyRef.current.shift();
  }, []);

  const posFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const scaleX = c.width / r.width;
    const scaleY = c.height / r.height;
    return { x: (e.clientX - r.left) * scaleX, y: (e.clientY - r.top) * scaleY };
  };

  const strokeTo = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = (size / 100) * CANVAS_PX;
    if (eraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = true;
    pushHistory();
    const p = posFromEvent(e);
    lastRef.current = p;
    strokeTo({ x: p.x - 0.01, y: p.y }, p); // dot on a single tap
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !lastRef.current) return;
    const p = posFromEvent(e);
    strokeTo(lastRef.current, p);
    lastRef.current = p;
  };
  const onUp = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const handleUndo = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const prev = historyRef.current.pop();
    ctx.clearRect(0, 0, c.width, c.height);
    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, c.width, c.height);
      img.src = prev;
    }
  };

  const handleClear = () => {
    pushHistory();
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    ctx?.clearRect(0, 0, c!.width, c!.height);
  };

  const compositeDataUrl = (): string | null => {
    const c = canvasRef.current;
    if (!c) return null;
    const out = document.createElement('canvas');
    out.width = c.width;
    out.height = c.height;
    const octx = out.getContext('2d');
    if (!octx) return null;
    octx.fillStyle = '#ffffff';
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(c, 0, 0);
    // outline on top, same as the app view (paint sits under the black outline)
    return out.toDataURL('image/png'); // outline drawn separately below via SVG->canvas
  };

  const handleSavePng = () => {
    const c = canvasRef.current;
    if (!c) return;
    const out = document.createElement('canvas');
    out.width = c.width;
    out.height = c.height;
    const octx = out.getContext('2d');
    if (!octx) return;
    octx.fillStyle = '#ffffff';
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(c, 0, 0);
    const img = new Image();
    img.onload = () => {
      octx.drawImage(img, 0, 0, out.width, out.height);
      out.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `to-mau-${tpl.id}.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      }, 'image/png');
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(tpl.svg);
  };

  const handlePrintArt = () => {
    const c = canvasRef.current;
    if (!c) return;
    const out = document.createElement('canvas');
    out.width = c.width;
    out.height = c.height;
    const octx = out.getContext('2d');
    if (!octx) return;
    octx.fillStyle = '#ffffff';
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(c, 0, 0);
    const img = new Image();
    img.onload = () => {
      octx.drawImage(img, 0, 0, out.width, out.height);
      openPrintWindow(L(tpl.name_vi, tpl.name_en), `<img src="${out.toDataURL('image/png')}" />`);
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(tpl.svg);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">🖍️ {L(tpl.name_vi, tpl.name_en)}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl leading-none">✕</button>
        </div>

        <div className="p-4">
          <div className="relative mx-auto" style={{ width: '100%', maxWidth: 480, aspectRatio: '1 / 1' }}>
            <canvas
              ref={canvasRef}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className="absolute inset-0 w-full h-full rounded-xl border-2 border-slate-200 bg-white touch-none"
            />
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              dangerouslySetInnerHTML={{ __html: tpl.svg }}
            />
          </div>

          {/* Toolbar */}
          <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setEraser(false); }}
                className={`w-7 h-7 rounded-full border-2 ${!eraser && color === c ? 'border-slate-800 scale-110' : 'border-slate-200'} transition`}
                style={{ background: c }}
                aria-label={c}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              {BRUSH_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border-2 flex items-center justify-center ${size === s ? 'border-pink-500' : 'border-slate-200'}`}
                  style={{ width: 34, height: 34 }}
                >
                  <span className="rounded-full bg-slate-700" style={{ width: s / 3.2, height: s / 3.2 }} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setEraser((v) => !v)}
              className={`text-xs font-semibold rounded-lg px-3 py-2 ${eraser ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              🧼 {L('Tẩy', 'Eraser')}
            </button>
            <button onClick={handleUndo} className="text-xs font-semibold rounded-lg px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200">
              ↩️ {L('Hoàn tác', 'Undo')}
            </button>
            <button onClick={handleClear} className="text-xs font-semibold rounded-lg px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100">
              🗑️ {L('Xóa hết', 'Clear')}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <button onClick={handleSavePng} className="text-sm font-semibold rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700">
              💾 {L('Lưu ảnh', 'Save image')}
            </button>
            <button onClick={handlePrintArt} className="text-sm font-semibold rounded-lg px-4 py-2 bg-teal-600 text-white hover:bg-teal-700">
              🖨️ {L('In bài đã tô', 'Print my drawing')}
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            {L('Vẽ bằng ngón tay hoặc chuột. Nét vẽ nằm dưới đường viền đen (giống tô màu thật).',
               'Draw with your finger or mouse. Strokes sit under the black outline, just like real coloring.')}
          </p>
        </div>
      </div>
    </div>
  );
}

const NASA_LINKS = [
  { emoji: '🪐', label_vi: 'NASA Space Place — Tô màu vũ trụ', label_en: 'NASA Space Place — Coloring pages', href: 'https://spaceplace.nasa.gov/coloring-pages/en/', note_vi: 'Chính thức NASA · miễn phí công cộng (public domain)', note_en: 'Official NASA · free, public domain' },
  { emoji: '🔭', label_vi: 'NASA Astrobiology — Kính viễn vọng James Webb', label_en: 'NASA Astrobiology — James Webb Telescope', href: 'https://astrobiology.nasa.gov/resources/coloring/', note_vi: 'PDF/PNG tải về miễn phí', note_en: 'Free PDF/PNG downloads' },
  { emoji: '🌌', label_vi: 'NASA Science — Vũ trụ & các hành tinh', label_en: 'NASA Science — Universe coloring pages', href: 'https://science.nasa.gov/universe/fun-exploring-the-universe/universe-coloring-pages/', note_vi: 'Chính thức NASA', note_en: 'Official NASA' },
];

export default function DrawStudioTab({ lang }: Props) {
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);
  const [activeCat, setActiveCat] = useState(DRAW_CATEGORIES[0].id);
  const [openTpl, setOpenTpl] = useState<DrawTemplate | null>(null);
  const cat = DRAW_CATEGORIES.find((c) => c.id === activeCat) ?? DRAW_CATEGORIES[0];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: 'linear-gradient(135deg,#be185d 0%,#7c3aed 55%,#4338ca 100%)' }}>
        <div className="flex items-center gap-3">
          <span className="text-5xl">🎨</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{L('Vẽ & Sáng Tạo', 'Draw & Create')}</h1>
            <p className="text-sm text-white/90 mt-1">
              {L('84 hình có sẵn để tô màu + góc "Khối 3D" tự vẽ. Tô ngay trong app bằng ngón tay, hoặc in ra giấy để tô bằng bút màu/sáp.',
                 '84 ready-made outlines to color, plus a "3D Shapes" drawing corner. Color right in the app, or print on paper for crayons.')}
            </p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {DRAW_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm border-2 transition ${
              activeCat === c.id ? 'bg-pink-600 text-white border-pink-700 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300'
            }`}
          >
            {c.emoji} {L(c.label_vi, c.label_en)}
          </button>
        ))}
      </div>

      {cat.id === '3d' && (
        <div className="rounded-xl p-3 bg-indigo-50 border border-indigo-200 text-sm text-indigo-900">
          📐 {L('Góc này nối với bài Hình Học 3D ở tab "Góc Luyện Tập" — vẽ hình trước, rồi qua đó tính diện tích & thể tích!',
                 'This corner pairs with the 3D-Geometry problems in the "Practice Corner" tab — draw the shape here, then go solve the surface-area & volume problems there!')}
        </div>
      )}

      {/* Template grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cat.templates.map((tpl) => (
          <TemplateCard key={tpl.id} tpl={tpl} lang={lang} onOpen={() => setOpenTpl(tpl)} />
        ))}
      </div>

      {/* NASA space coloring link-out */}
      <div>
        <h2 className="text-xl font-bold text-teal-900 mb-3">🚀 {L('Tô Màu Vũ Trụ (NASA chính thức)', 'Official NASA Space Coloring')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {NASA_LINKS.map((lk) => (
            <a key={lk.href} href={lk.href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-3 shadow-sm hover:border-teal-300 hover:shadow-md transition">
              <span className="text-2xl flex-shrink-0">{lk.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900">{L(lk.label_vi, lk.label_en)}</div>
                <div className="text-xs text-slate-500">{L(lk.note_vi, lk.note_en)}</div>
              </div>
              <span className="text-teal-500 text-sm flex-shrink-0">↗</span>
            </a>
          ))}
        </div>
      </div>

      {openTpl && <ColoringWorkspace tpl={openTpl} lang={lang} onClose={() => setOpenTpl(null)} />}

      <div className="text-center text-xs text-slate-500 italic">
        {L('84 hình tô màu chuyển thể từ oh-namgyu/kids-coloring (MIT) · góc "Khối 3D" do PANY Kids Studio tự vẽ · link NASA thuộc phạm vi công cộng (public domain).',
           '84 coloring outlines adapted from oh-namgyu/kids-coloring (MIT) · "3D Shapes" corner authored by PANY Kids Studio · NASA links are U.S. government public domain works.')}
      </div>
    </div>
  );
}
