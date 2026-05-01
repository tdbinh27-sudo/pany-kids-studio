"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Lang = "vi" | "en";

type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatBotContext = {
  kidId?: string;
  kidName?: string;
  kidAge?: number;
  lang: Lang;
  currentTab?: string;
  overallPct?: number;
  streakDays?: number;
  pillarFocus?: string;
};

export default function ChatBot({ ctx }: { ctx: ChatBotContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Draggable position (right + bottom from viewport)
  const [pos, setPos] = useState({ right: 24, bottom: 24 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; right: number; bottom: number } | null>(null);
  const movedRef = useRef(false);

  // Load saved position
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('pks3-chatbot-pos');
      if (raw) setPos(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist position
  useEffect(() => {
    try { window.localStorage.setItem('pks3-chatbot-pos', JSON.stringify(pos)); } catch {}
  }, [pos]);

  // Mouse / touch move handlers
  useEffect(() => {
    if (!dragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!dragStartRef.current) return;
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
      const newRight = Math.max(8, Math.min(window.innerWidth - 72, dragStartRef.current.right - dx));
      const newBottom = Math.max(8, Math.min(window.innerHeight - 72, dragStartRef.current.bottom - dy));
      setPos({ right: newRight, bottom: newBottom });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onUp = () => {
      setDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  const startDrag = (clientX: number, clientY: number) => {
    movedRef.current = false;
    dragStartRef.current = { x: clientX, y: clientY, right: pos.right, bottom: pos.bottom };
    setDragging(true);
  };

  const storageKey = `pks3-chat-${ctx.kidId ?? "anon"}`;

  // Load history once per kid switch
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      setMessages(raw ? JSON.parse(raw) : []);
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      /* noop */
    }
  }, [messages, storageKey]);

  // Auto-scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const t = (vi: string, en: string) => (ctx.lang === "vi" ? vi : en);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    const next = [...messages, { role: "user" as const, content: msg }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ctx, history: messages, message: msg }),
      });
      const data = await res.json();
      const reply = data.reply ?? t("Đại Ka chưa trả lời được. Con thử lại nhé!", "Đại Ka couldn't reply. Try again, con!");
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: t("Mất kết nối rồi. Con thử lại sau nhé!", "Lost connection. Try again later, con!"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const greeting: ChatTurn = {
    role: "assistant",
    content: ctx.kidName
      ? t(
          `Chào con ${ctx.kidName}! Đại Ka đây — đại diện bố Bình 🌸 Hôm nay con muốn cùng Đại Ka khám phá gì nhỉ?`,
          `Chào con ${ctx.kidName}! Đại Ka here — representing Dad Bình 🌸 What does con want to explore today?`
        )
      : t(
          "Chào con! Đại Ka đây — đại diện AI của bố Bình. Bố bận thì có Đại Ka ngồi cùng con. Con cứ hỏi Đại Ka thoải mái nhé 🌸",
          "Chào con! Đại Ka here — Dad Bình's AI representative. When Dad's busy, Đại Ka sits with con. Ask anything 🌸"
        ),
  };

  const displayed = messages.length === 0 ? [greeting] : messages;

  return (
    <>
      {/* Floating button — draggable */}
      {!open && (
        <button
          onMouseDown={e => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
          onTouchStart={e => { if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
          onClick={e => {
            // Only open if didn't drag
            if (movedRef.current) {
              e.preventDefault();
              movedRef.current = false;
              return;
            }
            setOpen(true);
          }}
          aria-label="Open chat with Đại Ka (drag to move)"
          title={ctx.lang === 'vi' ? 'Click để mở · Kéo để di chuyển' : 'Click to open · Drag to move'}
          style={{
            position: "fixed",
            bottom: pos.bottom,
            right: pos.right,
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B9D 0%, #845EC2 50%, #4DABF7 100%)",
            border: "none",
            cursor: dragging ? "grabbing" : "grab",
            boxShadow: dragging ? "0 12px 32px rgba(132, 94, 194, 0.6)" : "0 8px 24px rgba(132, 94, 194, 0.4)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 28,
            transition: dragging ? "none" : "transform 0.2s, box-shadow 0.2s",
            touchAction: "none",
            userSelect: "none",
          }}
          onMouseEnter={e => { if (!dragging) e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          🌸
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 380,
            maxWidth: "calc(100vw - 32px)",
            height: 600,
            maxHeight: "calc(100vh - 48px)",
            background: "#FFFFFF",
            borderRadius: 24,
            boxShadow: "0 20px 60px rgba(132, 94, 194, 0.4)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "2px solid #F0E6FF",
            fontFamily: "Quicksand, system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #FF6B9D 0%, #845EC2 50%, #4DABF7 100%)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 28 }}>🌸</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "Fredoka, sans-serif" }}>
                Đại Ka
              </div>
              <div style={{ fontSize: 11, opacity: 0.9 }}>
                {t("đại diện bố Bình · luôn ở đây với con", "Dad Bình's AI · always here for con")}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              background: "linear-gradient(180deg, #FFE5F1 0%, #E5F3FF 100%)",
            }}
          >
            {displayed.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && <TypingIndicator />}
          </div>

          {/* Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              send();
            }}
            style={{
              display: "flex",
              gap: 8,
              padding: 12,
              background: "#fff",
              borderTop: "1px solid #F0E6FF",
            }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t("Hỏi Đại Ka...", "Ask Đại Ka...")}
              disabled={loading}
              maxLength={500}
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "2px solid #F0E6FF",
                borderRadius: 999,
                fontSize: 13,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background:
                  loading || !input.trim()
                    ? "#E5DBF0"
                    : "linear-gradient(135deg, #FF6B9D, #845EC2)",
                border: "none",
                color: "#fff",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
            </button>
          </form>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.8s linear infinite; }
          `}</style>
        </div>
      )}
    </>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "10px 14px",
          borderRadius: 18,
          background: isUser ? "linear-gradient(135deg, #FF6B9D, #845EC2)" : "#fff",
          color: isUser ? "#fff" : "#2D1B4E",
          fontSize: 13,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: "0 2px 6px rgba(132, 94, 194, 0.1)",
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
        }}
      >
        {content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: 18,
          background: "#fff",
          fontSize: 13,
          color: "#9B8FB8",
          boxShadow: "0 2px 6px rgba(132, 94, 194, 0.1)",
        }}
      >
        <span style={{ marginRight: 4 }}>🌸</span>
        Đại Ka đang nghĩ
        <span className="dot-pulse">...</span>
        <style>{`
          @keyframes dot-pulse { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }
          .dot-pulse { animation: dot-pulse 1.2s ease-in-out infinite; }
        `}</style>
      </div>
    </div>
  );
}
