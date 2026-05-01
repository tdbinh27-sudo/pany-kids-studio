"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Plus, X, Navigation, Camera } from "lucide-react";

type Pin = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  date: string;
  category: 'travel' | 'school' | 'family' | 'volunteer' | 'event';
  kidId?: string;
  photoUrl?: string;
};

type Kid = { id: string; name: string; emoji: string; color: string };

const CATEGORY_META = {
  travel:    { vi: 'Du lịch',     en: 'Travel',     emoji: '✈️', color: '#FF6B9D' },
  school:    { vi: 'Trường',      en: 'School',     emoji: '🏫', color: '#4DABF7' },
  family:    { vi: 'Gia đình',    en: 'Family',     emoji: '👨‍👩‍👧', color: '#FFD43B' },
  volunteer: { vi: 'Tình nguyện', en: 'Volunteer',  emoji: '🤝', color: '#51CF66' },
  event:     { vi: 'Sự kiện',     en: 'Event',      emoji: '🎉', color: '#845EC2' },
};

// Bounding box around Vietnam
const VN_CENTER: [number, number] = [16.0, 107.5];
const VN_ZOOM = 6;

export default function VietnamMap({
  kids,
  lang,
  L,
  t,
}: {
  kids: Kid[];
  lang: 'vi' | 'en';
  L: (vi: string, en: string) => string;
  t: (key: string, fallback?: string) => string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedKid, setSelectedKid] = useState<string | undefined>(kids[0]?.id);
  const [newPin, setNewPin] = useState<Partial<Pin>>({ category: 'travel', title: '', description: '', photoUrl: '' });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [leafletReady, setLeafletReady] = useState(false);

  // Load pins from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('pks3-vn-pins');
      if (raw) setPins(JSON.parse(raw));
    } catch {}
  }, []);

  // Save on change
  useEffect(() => {
    try {
      window.localStorage.setItem('pks3-vn-pins', JSON.stringify(pins));
    } catch {}
  }, [pins]);

  // Load Leaflet from CDN dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).L && (window as any).L.map) {
      setLeafletReady(true);
      return;
    }

    // Load CSS
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.setAttribute('data-leaflet', '1');
      document.head.appendChild(link);
    }

    // Load JS
    if (!document.querySelector('script[data-leaflet]')) {
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      s.setAttribute('data-leaflet', '1');
      s.onload = () => setLeafletReady(true);
      document.head.appendChild(s);
    } else {
      const tick = setInterval(() => {
        if ((window as any).L?.map) {
          setLeafletReady(true);
          clearInterval(tick);
        }
      }, 100);
      return () => clearInterval(tick);
    }
  }, []);

  // Init map
  useEffect(() => {
    if (!leafletReady || !mapRef.current || leafletMapRef.current) return;
    const Lmap = (window as any).L;
    const map = Lmap.map(mapRef.current).setView(VN_CENTER, VN_ZOOM);
    Lmap.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);
    leafletMapRef.current = map;
  }, [leafletReady]);

  // Render markers
  useEffect(() => {
    if (!leafletReady || !leafletMapRef.current) return;
    const Lmap = (window as any).L;
    markersRef.current.forEach(m => leafletMapRef.current.removeLayer(m));
    markersRef.current = [];
    pins.forEach(pin => {
      const cat = CATEGORY_META[pin.category];
      const kid = kids.find(k => k.id === pin.kidId);
      const icon = Lmap.divIcon({
        className: '',
        html: `<div style="font-size:28px;text-align:center;line-height:1;">${kid?.emoji || cat.emoji}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      const m = Lmap.marker([pin.lat, pin.lng], { icon }).addTo(leafletMapRef.current);
      const popupHtml = `
        <div style="font-family:Quicksand;min-width:180px">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:${cat.color}">${cat.emoji} ${pin.title}</div>
          ${kid ? `<div style="font-size:11px;color:#6B5B95">${kid.emoji} ${kid.name}</div>` : ''}
          <div style="font-size:11px;color:#9B8FB8">${pin.date}</div>
          ${pin.description ? `<div style="font-size:12px;margin-top:6px">${pin.description}</div>` : ''}
          ${pin.photoUrl ? `<img src="${pin.photoUrl}" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px;margin-top:6px" onerror="this.style.display='none'"/>` : ''}
        </div>
      `;
      m.bindPopup(popupHtml);
      markersRef.current.push(m);
    });
  }, [pins, leafletReady, kids]);

  const useGps = () => {
    if (!navigator.geolocation) {
      alert(L('Trình duyệt không hỗ trợ GPS', 'Browser does not support GPS'));
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setNewPin({ ...newPin, lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGpsLoading(false);
        if (leafletMapRef.current) {
          leafletMapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 13);
        }
      },
      err => {
        setGpsLoading(false);
        alert(L('Không lấy được vị trí: ', 'Could not get location: ') + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const submitPin = () => {
    if (!newPin.title || !newPin.lat || !newPin.lng) {
      alert(L('Cần tên + GPS', 'Title + GPS required'));
      return;
    }
    const pin: Pin = {
      id: `pin_${Date.now()}`,
      lat: newPin.lat!,
      lng: newPin.lng!,
      title: newPin.title!,
      description: newPin.description || '',
      date: new Date().toISOString().slice(0, 10),
      category: (newPin.category as Pin['category']) || 'travel',
      kidId: selectedKid,
      photoUrl: newPin.photoUrl,
    };
    setPins([...pins, pin]);
    setShowAdd(false);
    setNewPin({ category: 'travel', title: '', description: '', photoUrl: '' });
  };

  const removePin = (id: string) => setPins(pins.filter(p => p.id !== id));

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 className="display" style={{ fontSize: 36, fontWeight: 700, margin: 0, color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 40 }} className="float-anim">🗺️</span>
          {L('Bản đồ Việt Nam', 'Vietnam Map')}
        </h2>
        <div className="hand" style={{ fontSize: 22, color: '#845EC2', marginTop: 4 }}>
          {L('Đánh dấu mọi nơi đã đi · GPS thật', 'Pin every place you visit · real GPS')}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'linear-gradient(135deg, #FF6B9D, #845EC2)', color: '#fff', padding: 18, borderRadius: 20, marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="hand" style={{ fontSize: 22, marginBottom: -2 }}>{L('Tổng pin', 'Total pins')}</div>
          <div className="display" style={{ fontSize: 36, fontWeight: 700 }}>{pins.length}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(CATEGORY_META).map(([key, meta]) => {
            const count = pins.filter(p => p.category === key).length;
            return (
              <div key={key} style={{ background: 'rgba(255,255,255,0.18)', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                {meta.emoji} {count}
              </div>
            );
          })}
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-bounce body-f" style={{
          background: '#FFD43B', color: '#2D1B4E', border: 'none', padding: '10px 18px', borderRadius: 999,
          cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Plus size={16} /> {L('Thêm pin', 'Add pin')}
        </button>
      </div>

      {/* Add pin form */}
      {showAdd && (
        <div className="pop-in" style={{ background: '#fff', borderRadius: 20, padding: 18, marginBottom: 18, border: '2px dashed #FF6B9D' }}>
          <h4 className="display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 14px' }}>📍 {L('Pin mới', 'New pin')}</h4>

          {/* Kid selector */}
          {kids.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: '#9B8FB8', display: 'block', marginBottom: 4 }}>{L('Học viên', 'Student')}</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {kids.map(k => (
                  <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
                    background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
                    border: `2px solid ${k.color}`, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
                  }}>{k.emoji} {k.name}</button>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          <div style={{ marginBottom: 12 }}>
            <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: '#9B8FB8', display: 'block', marginBottom: 4 }}>{L('Loại', 'Category')}</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <button key={key} onClick={() => setNewPin({ ...newPin, category: key as Pin['category'] })} className="btn-bounce body-f" style={{
                  background: newPin.category === key ? meta.color : '#fff', color: newPin.category === key ? '#fff' : meta.color,
                  border: `2px solid ${meta.color}`, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
                }}>{meta.emoji} {L(meta.vi, meta.en)}</button>
              ))}
            </div>
          </div>

          {/* GPS */}
          <div style={{ marginBottom: 12 }}>
            <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: '#9B8FB8', display: 'block', marginBottom: 4 }}>{L('Toạ độ GPS', 'GPS coordinates')}</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input value={newPin.lat?.toString() || ''} onChange={e => setNewPin({ ...newPin, lat: parseFloat(e.target.value) })}
                placeholder="Lat (16.0)" style={{ padding: 10, border: '2px solid #F0E6FF', borderRadius: 12, fontSize: 13, width: 110, outline: 'none' }} />
              <input value={newPin.lng?.toString() || ''} onChange={e => setNewPin({ ...newPin, lng: parseFloat(e.target.value) })}
                placeholder="Lng (107.5)" style={{ padding: 10, border: '2px solid #F0E6FF', borderRadius: 12, fontSize: 13, width: 110, outline: 'none' }} />
              <button onClick={useGps} disabled={gpsLoading} className="btn-bounce body-f" style={{
                background: 'linear-gradient(135deg, #4DABF7, #845EC2)', color: '#fff', border: 'none',
                padding: '10px 14px', borderRadius: 12, cursor: gpsLoading ? 'wait' : 'pointer', fontWeight: 700, fontSize: 12,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <Navigation size={14} /> {gpsLoading ? '...' : L('Dùng GPS', 'Use GPS')}
              </button>
            </div>
          </div>

          {/* Title */}
          <input value={newPin.title || ''} onChange={e => setNewPin({ ...newPin, title: e.target.value })}
            placeholder={L('Tên địa điểm (VD: Hồ Hoàn Kiếm)', 'Place name (e.g. Hoan Kiem Lake)')}
            style={{ width: '100%', padding: 10, border: '2px solid #F0E6FF', borderRadius: 12, fontSize: 14, marginBottom: 10, outline: 'none' }} />

          <textarea value={newPin.description || ''} onChange={e => setNewPin({ ...newPin, description: e.target.value })}
            placeholder={L('Em đã làm gì ở đây?', 'What did you do here?')}
            style={{ width: '100%', padding: 10, border: '2px solid #F0E6FF', borderRadius: 12, fontSize: 13, minHeight: 60, resize: 'vertical', marginBottom: 10, outline: 'none', fontFamily: 'inherit' }} />

          <input value={newPin.photoUrl || ''} onChange={e => setNewPin({ ...newPin, photoUrl: e.target.value })}
            placeholder={L('URL ảnh (tuỳ chọn)', 'Photo URL (optional)')}
            style={{ width: '100%', padding: 10, border: '2px solid #F0E6FF', borderRadius: 12, fontSize: 13, marginBottom: 14, outline: 'none' }} />

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submitPin} className="btn-bounce body-f" style={{
              flex: 1, background: 'linear-gradient(135deg, #51CF66, #4DABF7)', color: '#fff',
              border: 'none', padding: '12px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 14,
            }}>📍 {L('Lưu pin', 'Save pin')}</button>
            <button onClick={() => setShowAdd(false)} className="btn-bounce body-f" style={{
              background: '#fff', color: '#9B8FB8', border: '2px solid #F0E6FF',
              padding: '12px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 14,
            }}>{L('Huỷ', 'Cancel')}</button>
          </div>
        </div>
      )}

      {/* Map */}
      <div ref={mapRef} style={{
        width: '100%', height: 500, borderRadius: 20,
        background: '#E5F3FF',
        border: '2px solid #F0E6FF',
        marginBottom: 18,
      }}>
        {!leafletReady && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9B8FB8' }}>
            <div className="float-anim" style={{ fontSize: 32, marginRight: 12 }}>🗺️</div>
            {L('Đang tải bản đồ...', 'Loading map...')}
          </div>
        )}
      </div>

      {/* Pin list */}
      {pins.length > 0 && (
        <div>
          <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 14 }}>📍 {L('Tất cả pin', 'All pins')} ({pins.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {pins.slice().sort((a, b) => b.date.localeCompare(a.date)).map(pin => {
              const cat = CATEGORY_META[pin.category];
              const kid = kids.find(k => k.id === pin.kidId);
              return (
                <div key={pin.id} className="card-hover" style={{
                  background: '#fff', borderRadius: 16, padding: 14,
                  border: `2px solid ${cat.color}30`, boxShadow: '0 4px 12px rgba(132,94,194,0.08)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span className="body-f" style={{ background: `${cat.color}20`, color: cat.color, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                        {cat.emoji} {L(cat.vi, cat.en)}
                      </span>
                      {kid && <span className="body-f" style={{ background: `${kid.color}20`, color: kid.color, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{kid.emoji} {kid.name}</span>}
                    </div>
                    <button onClick={() => removePin(pin.id)} className="btn-bounce" style={{ background: '#FFE5E5', border: 'none', padding: 4, borderRadius: 8, cursor: 'pointer' }}>
                      <X size={12} color="#FF8787" />
                    </button>
                  </div>
                  <div className="display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{pin.title}</div>
                  <div className="hand" style={{ fontSize: 14, color: '#845EC2', marginBottom: 6 }}>{pin.date}</div>
                  {pin.description && <div className="body-f" style={{ fontSize: 12, color: '#6B5B95', lineHeight: 1.5, marginBottom: 6 }}>{pin.description}</div>}
                  <div className="body-f" style={{ fontSize: 10, color: '#9B8FB8', fontFamily: 'monospace' }}>📌 {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
