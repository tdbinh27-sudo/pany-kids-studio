'use client';

/**
 * @file components/STEMTab.tsx
 * @description STEM Lab — 6 subjects · PhET interactive simulations curated theo tuổi.
 * D-038 candidate (2026-05-19). LIGHT theme matching Kids Studio palette.
 */

import { useState } from 'react';

type STEMSubject = {
  id: string;
  emoji: string;
  title_vi: string;
  title_en: string;
  age_recommend: 'K' | 'P' | 'T' | 'P+T';
  pillar_match: string;
  career_intro_vi: string;
  career_intro_en: string;
  simulations: { name_vi: string; name_en: string; phet_slug: string; age: 'K' | 'P' | 'T'; }[];
};

const SUBJECTS: STEMSubject[] = [
  {
    id: 'math', emoji: '🔢', title_vi: 'Toán học', title_en: 'Math',
    age_recommend: 'P+T', pillar_match: 'Tư duy + Tài chính',
    career_intro_vi: 'Toán là ngôn ngữ của tự nhiên · nghề: Data Analyst, Actuary, Quant, Researcher',
    career_intro_en: 'Math is the language of nature · Data Analyst, Actuary, Quant, Researcher',
    simulations: [
      { name_vi: 'Trò chơi phân số', name_en: 'Fractions Intro', phet_slug: 'fractions-intro', age: 'P' },
      { name_vi: 'Đồ thị đường thẳng', name_en: 'Graphing Lines', phet_slug: 'graphing-lines', age: 'T' },
      { name_vi: 'Trò chơi diện tích', name_en: 'Area Builder', phet_slug: 'area-builder', age: 'P' },
    ],
  },
  {
    id: 'physics', emoji: '⚛️', title_vi: 'Vật lý', title_en: 'Physics',
    age_recommend: 'P+T', pillar_match: 'Phần cứng + Tư duy',
    career_intro_vi: 'Hiểu cách thế giới vận hành · nghề: Engineer, Astronaut, Researcher, Game Physics Dev',
    career_intro_en: 'Understand how the world works · Engineer, Astronaut, Researcher, Game Physics Dev',
    simulations: [
      { name_vi: 'Lực và chuyển động', name_en: 'Forces and Motion: Basics', phet_slug: 'forces-and-motion-basics', age: 'P' },
      { name_vi: 'Năng lượng skate park', name_en: 'Energy Skate Park', phet_slug: 'energy-skate-park-basics', age: 'P' },
      { name_vi: 'Tĩnh điện chà xát', name_en: 'Balloons and Static Electricity', phet_slug: 'balloons-and-static-electricity', age: 'K' },
    ],
  },
  {
    id: 'chemistry', emoji: '🧪', title_vi: 'Hóa học', title_en: 'Chemistry',
    age_recommend: 'P+T', pillar_match: 'Sáng tạo + Tư duy',
    career_intro_vi: 'Thế giới phân tử · nghề: Chemist, Pharmacist, Food Scientist, Material Engineer',
    career_intro_en: 'World of molecules · Chemist, Pharmacist, Food Scientist, Material Engineer',
    simulations: [
      { name_vi: 'Cân bằng phương trình', name_en: 'Balancing Chemical Equations', phet_slug: 'balancing-chemical-equations', age: 'T' },
      { name_vi: 'Xây dựng phân tử', name_en: 'Build a Molecule', phet_slug: 'build-a-molecule', age: 'P' },
      { name_vi: 'Trạng thái vật chất', name_en: 'States of Matter: Basics', phet_slug: 'states-of-matter-basics', age: 'P' },
    ],
  },
  {
    id: 'biology', emoji: '🧬', title_vi: 'Sinh học', title_en: 'Biology',
    age_recommend: 'P+T', pillar_match: 'Vận động + Sáng tạo',
    career_intro_vi: 'Sự sống và sức khỏe · nghề: Doctor, Nurse, Biotech, Wildlife Researcher',
    career_intro_en: 'Life and health · Doctor, Nurse, Biotech, Wildlife Researcher',
    simulations: [
      { name_vi: 'Lựa chọn tự nhiên', name_en: 'Natural Selection', phet_slug: 'natural-selection', age: 'T' },
      { name_vi: 'Biểu hiện gen', name_en: 'Gene Expression Essentials', phet_slug: 'gene-expression-essentials', age: 'T' },
      { name_vi: 'Thang pH', name_en: 'pH Scale Basics', phet_slug: 'ph-scale-basics', age: 'P' },
    ],
  },
  {
    id: 'earth', emoji: '🌍', title_vi: 'Khoa học Trái đất', title_en: 'Earth Science',
    age_recommend: 'P+T', pillar_match: 'Khám phá + Tư duy',
    career_intro_vi: 'Hành tinh chúng ta · nghề: Geologist, Climatologist, Oceanographer, Astronaut',
    career_intro_en: 'Our planet · Geologist, Climatologist, Oceanographer, Astronaut',
    simulations: [
      { name_vi: 'Hiệu ứng nhà kính', name_en: 'Greenhouse Effect', phet_slug: 'greenhouse-effect', age: 'T' },
      { name_vi: 'Mảng kiến tạo', name_en: 'Plate Tectonics', phet_slug: 'plate-tectonics', age: 'T' },
      { name_vi: 'Hệ Mặt Trời', name_en: 'My Solar System', phet_slug: 'my-solar-system', age: 'P' },
    ],
  },
  {
    id: 'engineering', emoji: '🛠️', title_vi: 'Kỹ thuật', title_en: 'Engineering',
    age_recommend: 'P+T', pillar_match: 'Phần cứng + Sáng tạo',
    career_intro_vi: 'Giải quyết bài toán thật · nghề: Civil/Mech/Electrical Engineer, Robotics, Game Dev',
    career_intro_en: 'Solve real problems · Civil/Mech/Electrical Engineer, Robotics, Game Dev',
    simulations: [
      { name_vi: 'Mạch điện', name_en: 'Circuit Construction Kit', phet_slug: 'circuit-construction-kit-dc', age: 'T' },
      { name_vi: 'Khúc xạ ánh sáng', name_en: 'Bending Light', phet_slug: 'bending-light', age: 'P' },
      { name_vi: 'Sóng giao thoa', name_en: 'Wave Interference', phet_slug: 'wave-interference', age: 'T' },
    ],
  },
];

const phetUrl = (slug: string, lang: 'vi' | 'en') =>
  `https://phet.colorado.edu/${lang}/simulations/${slug}`;

type Props = {
  lang: 'vi' | 'en';
  t?: Record<string, string>;
  L?: (vi: string, en: string) => string;
};

export default function STEMTab({ lang }: Props) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>('math');
  const L = (vi: string, en: string) => (lang === 'vi' ? vi : en);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #0891B2 0%, #1E40AF 50%, #4F46E5 100%)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🔬</span>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {L('Phòng thí nghiệm STEM', 'STEM Lab')}
            </h1>
            <p className="text-sm text-white/90 mt-1">
              {L('125+ thí nghiệm tương tác · 6 môn (Toán/Lý/Hóa/Sinh/Trái đất/Kỹ thuật) · ✅ tiếng Việt',
                '125+ interactive simulations · 6 subjects · ✅ Vietnamese supported')}
            </p>
          </div>
        </div>
        <div className="text-sm text-amber-100 mt-2 font-semibold">
          💡 {L('PhET by University of Colorado Boulder · 25M+ users · CC-BY 3.0 free educational use',
            'PhET by University of Colorado Boulder · 25M+ users · CC-BY 3.0 free educational use')}
        </div>
      </div>

      {/* 6 subject cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBJECTS.map((subject) => {
          const isOpen = expandedSubject === subject.id;
          return (
            <div
              key={subject.id}
              className={`rounded-xl border-2 transition-all cursor-pointer bg-white ${
                isOpen
                  ? 'border-cyan-400 shadow-xl shadow-cyan-200/60 scale-[1.01]'
                  : 'border-cyan-200 hover:border-cyan-300 shadow-md hover:shadow-lg'
              }`}
              onClick={() => setExpandedSubject(isOpen ? null : subject.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{subject.emoji}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-600 text-white font-bold">
                    {subject.age_recommend}
                  </span>
                </div>
                <h3 className="text-xl text-slate-900 font-bold mb-1">{L(subject.title_vi, subject.title_en)}</h3>
                <div className="text-xs text-amber-700 font-bold mb-2 uppercase tracking-wide">
                  {L('Trụ cột:', 'Pillar:')} {subject.pillar_match}
                </div>
                <p className="text-xs text-slate-600 italic mb-3">
                  {L(subject.career_intro_vi, subject.career_intro_en)}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-semibold">
                    {subject.simulations.length} {L('thí nghiệm', 'sims')}
                  </span>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t-2 border-cyan-100 space-y-2">
                    {subject.simulations.map((sim) => (
                      <a
                        key={sim.phet_slug}
                        href={phetUrl(sim.phet_slug, lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-cyan-50 hover:bg-cyan-100 rounded-lg p-3 border border-cyan-200 hover:border-cyan-400 hover:shadow-md transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-900 font-semibold">{L(sim.name_vi, sim.name_en)}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                            {sim.age === 'K' ? L('5-6t', 'K') : sim.age === 'P' ? L('7-11t', 'P') : L('12-15t', 'T')}
                          </span>
                        </div>
                        <div className="text-xs text-cyan-700 mt-1 font-medium">🔗 PhET → mở tab mới</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pany curriculum mapping */}
      <div
        className="rounded-xl p-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)' }}
      >
        <h2 className="text-xl font-bold mb-3 text-white">
          📚 {L('Mapping với chương trình VN', 'VN curriculum mapping')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/95 rounded-lg p-3 shadow-sm">
            <div className="font-bold mb-1 text-orange-800">{L('Y 5t (Mầm non)', 'Y 5 (K)')}</div>
            <div className="text-xs text-slate-700">{L('Balloons static · Solar system intro · cùng bố/chị', 'Balloons static · Solar system intro · with parent')}</div>
          </div>
          <div className="bg-white/95 rounded-lg p-3 shadow-sm">
            <div className="font-bold mb-1 text-orange-800">{L('An 9t (Lớp 4)', 'An 9 (P)')}</div>
            <div className="text-xs text-slate-700">{L('Phân số · Lực-chuyển động · Phân tử · trùng chương trình SGK', 'Fractions · Forces · Molecules · matches VN textbook')}</div>
          </div>
          <div className="bg-white/95 rounded-lg p-3 shadow-sm">
            <div className="font-bold mb-1 text-orange-800">{L('Phúc 11t (Lớp 6)', 'Phúc 11 (P+)')}</div>
            <div className="text-xs text-slate-700">{L('Mạch điện · Đại số đồ thị · Cân bằng phương trình · pre-Lý/Hóa lớp 8-9', 'Circuits · Graphs · Equations · pre-Physics/Chem grade 8-9')}</div>
          </div>
          <div className="bg-white/95 rounded-lg p-3 shadow-sm">
            <div className="font-bold mb-1 text-orange-800">{L('Tương lai (12-15t)', 'Future (12-15)')}</div>
            <div className="text-xs text-slate-700">{L('Lựa chọn tự nhiên · Mảng kiến tạo · Hiệu ứng nhà kính', 'Natural selection · Plate tectonics · Greenhouse')}</div>
          </div>
        </div>
      </div>

      {/* Career paths */}
      <div
        className="rounded-xl p-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #10B981 0%, #0891B2 100%)' }}
      >
        <h2 className="text-xl font-bold mb-3 text-white">
          🎯 {L('Nghề STEM tại VN', 'STEM Careers in VN')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[
            { vi: '🏥 Bác sĩ · Dược sĩ', en: '🏥 Doctor · Pharmacist', salary: '30-100tr/m' },
            { vi: '⚡ Kỹ sư điện · điện tử', en: '⚡ Electrical Engineer', salary: '20-60tr/m' },
            { vi: '💻 Data Scientist · ML', en: '💻 Data Scientist · ML', salary: '30-150tr/m' },
            { vi: '🧬 Biotech · Sinh học', en: '🧬 Biotech · Biologist', salary: '15-40tr/m' },
            { vi: '🚀 Kỹ sư hàng không', en: '🚀 Aerospace Engineer', salary: '30-80tr/m' },
            { vi: '🤖 Robotics · IoT', en: '🤖 Robotics · IoT', salary: '25-70tr/m' },
          ].map((c) => (
            <div key={c.en} className="bg-white/95 rounded-lg p-2 shadow-sm">
              <div className="text-xs font-bold text-emerald-800">{L(c.vi, c.en)}</div>
              <div className="text-xs text-slate-600 font-medium">{c.salary}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/95 font-medium">
          🇻🇳 {L('Tuyển dụng VN:', 'VN employers:')} VinFast · Viettel R&D · FPT Software · Vinmec/Tâm Anh · ĐH Bách Khoa · Vingroup AI Lab
        </div>
      </div>

      {/* AI Agent companion box */}
      <div
        className="rounded-xl p-5 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
      >
        <h2 className="text-xl font-bold mb-3 text-white">
          🤖 {L('AI Agent đồng hành', 'AI Agent Companions')}
        </h2>
        <div className="space-y-2 text-sm text-white/95">
          <div>
            <span className="font-bold text-amber-200">AI Engineer</span> —{' '}
            {L('Cho Phúc khi muốn áp dụng AI vào dự án STEM (ML model, data analysis)',
              'For Phúc applying AI to STEM projects (ML, data analysis)')}
          </div>
          <div>
            <span className="font-bold text-amber-200">Civil Engineer</span> —{' '}
            {L('Bài toán kỹ thuật cầu/nhà/cấu trúc · áp dụng Lý + Toán thực tế',
              'Civil engineering problems · applied Physics + Math')}
          </div>
          <div>
            <span className="font-bold text-amber-200">Corporate Training Designer</span> —{' '}
            {L('Curriculum design · khi anh muốn build STEM curriculum riêng cho 3 con',
              'Curriculum design · when building custom STEM curriculum for 3 kids')}
          </div>
        </div>
        <div className="mt-3 text-xs text-white/80 italic">
          {L('Bố Bình route · Đại Ka chatbot trong Kids Studio answer questions từ kid (rate limit 20/day D-034)',
            'Parent routes · Đại Ka chatbot answers kid questions (20/day rate limit D-034)')}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 italic">
        D-038 · Decision Filter 5/5 PASS · PhET CC-BY 3.0 · Mid-Year Gate 2026-06-30
      </div>
    </div>
  );
}
