// @ts-nocheck — converted from working JSX, types relaxed for v1 ship; revisit in v3.1
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, BookOpen, Code, Globe, DollarSign, Brain, Award, MapPin,
  Plus, Check, Star, TrendingUp, Calendar, ChevronRight, ChevronDown,
  Cpu, Lightbulb, Trophy, Heart, Edit3, Save, X, BarChart3, Users,
  Package, Wrench, Target, Zap, Coffee, Smile, Flame, Image, FileText,
  Briefcase, GraduationCap, Library, Puzzle, Download, Settings,
  Bell, Languages, Lock, Unlock, Camera, Send, RotateCw, Palette, Music
} from 'lucide-react';
import { storage } from '@/lib/storage';
import ChatBot from '@/components/ChatBot';
import VietnamMap from '@/components/VietnamMap';
import AISearchTab from '@/components/AISearch';
import HeroGreeting from '@/components/HeroGreeting';
import FamilyForest, { type FamilyKid } from '@/components/FamilyForest';
import TreeOfKnowledgeHome from '@/components/TreeOfKnowledgeHome';
import { CURATED_RESOURCES, LAST_REFRESHED, getResourcesFor } from '@/lib/curated';
import { QUIZ_BANK } from '@/lib/quiz';
import { RIASEC_TYPES, RIASEC_JUNIOR_8_12, RIASEC_JUNIOR_13_15, MOOD_OPTIONS, CREATIVE_PROMPTS, EXERCISE_CHALLENGES, scoreRiasec } from '@/lib/riasec-junior';
import type { RiasecType } from '@/lib/riasec-junior';
import { CAREERS, getCareerOfDay, getProjectForType, getCareersByType } from '@/lib/careers-v2';
import type { Career } from '@/lib/careers-v2';
import { ASK_PARENT_PROMPTS, WEEKLY_REVIEW_PROMPTS, SHOW_TELL_IDEAS, FAMILY_ACTIVITIES } from '@/lib/family-prompts';
import { LISTEN_WORDS, SPEAK_SENTENCES, READING_PASSAGES, WRITING_PROMPTS, getLevelForAge, pickRandomItems, pronunciationScore } from '@/lib/english-skills';
import type { CEFRLevel } from '@/lib/english-skills';
import { speak, stopSpeaking, listen, ttsSupported, asrSupported, loadVoices } from '@/lib/speech';
import { ALL_QUESTS, getQuestsByAge, getQuestsForDay } from '@/lib/quests';
import type { Quest, AgeGroup } from '@/lib/quests';
import { ALL_MATH_QUESTIONS, getQuestionsByLevel, getMathLevelForKid, getRandomMathQuiz } from '@/lib/math-quiz';
import type { MathQuestion, MathLevel } from '@/lib/math-quiz';
import { ALL_STORIES, getStoriesForKid, getStoriesByLevel } from '@/lib/bilingual-stories';
import type { Story } from '@/lib/bilingual-stories';
import { SEED_QNA, getQnAStats, getQnAByTopic } from '@/lib/career-qna';
import type { CareerQnA, QnATopic } from '@/lib/career-qna';

// ============================================================
// PANY KIDS STUDIO v3 — ANIME/FUNNY · BILINGUAL · ALL TIERS
// 17 tabs · 5-year curriculum · gamified · career paths
// ============================================================

const I18N = {
  vi: {
    appTitle: 'Pany Kids Studio', appSubtitle: 'Hệ thống học tập gia đình 5 năm · Cho trẻ 6-16 tuổi · 2026—2031',
    estLine: 'thành lập 2026 · cho các bạn nhỏ nhà Pany',
    students: 'học viên', activeLearners: 'đang học',
    overview: 'Tổng quan', roadmap: 'Lộ trình 5 năm', calendar: 'Lịch tuần',
    skillTree: 'Cây kỹ năng', career: 'Hướng nghiệp', kidsTab: 'Học viên',
    badges: 'Huy hiệu', journal: 'Nhật ký', portfolio: 'Portfolio',
    leaderboard: 'Bảng xếp hạng', hardware: 'Phần cứng', software: 'Phần mềm',
    english: 'Tiếng Anh', finance: 'Tài chính', thinking: 'Tư duy',
    rewards: 'Phần thưởng', experiences: 'Trải nghiệm', publish: 'Xuất bản',
    library: 'Thư viện', aiSearch: 'Search AI', quiz: 'Quiz', report: 'Báo cáo', settings: 'Cài đặt',
    progress: 'Tiến độ', objectives: 'Mục tiêu', skills: 'Kỹ năng',
    evaluate: 'Đánh giá', edit: 'Sửa', save: 'Lưu', cancel: 'Hủy',
    add: 'Thêm', remove: 'Xóa', name: 'Tên', age: 'Tuổi', notes: 'Ghi chú',
    rating: 'Đánh giá sao', completed: 'Hoàn thành', total: 'tổng',
    streak: 'Chuỗi ngày', days: 'ngày', today: 'Hôm nay',
    checkIn: 'Điểm danh', checkedIn: 'Đã điểm danh',
    week: 'Tuần', month: 'Tháng', quarter: 'Quý', year: 'Năm',
    addStudent: 'Thêm học viên', addNewStudent: 'Thêm học viên mới',
    avgProgress: 'Tiến độ trung bình', topPerformer: 'Đang dẫn đầu',
    longestStreak: 'Streak dài nhất', totalBadges: 'Tổng huy hiệu',
    coreValues: 'Triết lý cốt lõi', sevenPillars: '7 Trụ cột phát triển',
    notice: 'Lưu ý', philosophy: 'Studio gia đình — bố và các con cùng làm thật, học thật, sai thật, sửa thật. AI là cộng tác viên, không phải thầy giáo.',
    weeklyTasks: 'Nhiệm vụ tuần này', addTask: 'Thêm task',
    journalEntry: 'Nhật ký hôm nay', writeJournal: 'Viết nhật ký...',
    learned: 'Hôm nay học gì?', hard: 'Phần khó nhất?', happy: 'Điều vui nhất?',
    addPortfolio: 'Thêm sản phẩm', portfolioTitle: 'Tên sản phẩm',
    portfolioUrl: 'URL ảnh/video', portfolioDesc: 'Mô tả',
    careerExplore: 'Khám phá nghề nghiệp tương lai',
    quizGenerator: 'Tạo Quiz tự động', startQuiz: 'Bắt đầu',
    correct: 'Đúng rồi! 🎉', wrong: 'Chưa đúng, thử lại nhé!',
    score: 'Điểm', exportPdf: 'Xuất PDF', printReport: 'In báo cáo',
    notifications: 'Thông báo', language: 'Ngôn ngữ',
    dataMgmt: 'Quản lý dữ liệu', exportData: 'Xuất dữ liệu',
    importData: 'Nhập dữ liệu', resetAll: 'Reset toàn bộ',
    selectKid: 'Chọn học viên', loginPin: 'Mã PIN', enterPin: 'Nhập PIN 4 số',
    parentMode: 'Bố/Mẹ', kidMode: 'Học viên',
    profileLabel: 'Hồ sơ', editProfile: 'Chỉnh sửa hồ sơ', avatar: 'Avatar (emoji)', birthday: 'Ngày sinh',
    school: 'Trường', hobbies: 'Sở thích', goals: 'Mục tiêu học tập', bio: 'Giới thiệu', favoriteSubject: 'Môn yêu thích',
    pinHintTitle: 'PIN mặc định', loginParent: 'Vào mode Bố/Mẹ',
    parentBadgeTip: 'Bố/Mẹ đang là mode mặc định — bố/mẹ edit thoải mái',
    yourBadges: 'Huy hiệu của bạn', locked: 'Chưa mở', unlocked: 'Đã mở',
    unlockedAt: 'Mở khoá', noEvalYet: 'Chưa có đánh giá',
    pillarRadar: 'Biểu đồ năng lực 6 trụ cột', progressOverTime: 'Tiến độ theo thời gian',
    compareKids: 'So sánh học viên', tabs: 'Tab',
    confetti: '🎉', loading: 'Đang tải Pany Kids Studio...',
    debate: 'Tranh luận', mentor: 'Cố vấn', resourceLib: 'Thư viện tài nguyên',
    books: 'Sách', videos: 'Video', tools: 'Công cụ', websites: 'Website',
    weekFocus: 'Tâm điểm tuần', daily: 'Hằng ngày', weekly: 'Hằng tuần',
    studioCreative: 'Sáng tạo', bodyMovement: 'Vận động', selfDiscovery: 'Tự khám phá',
    careerCompass: 'La bàn nghề', familyBridge: 'Gia đình',
    englishSkills: 'English 4 kỹ năng',
  },
  en: {
    appTitle: 'Pany Kids Studio', appSubtitle: '5-Year Family Learning System · For kids 6-16 · 2026—2031',
    estLine: 'est. 2026 · for the children of Pany',
    students: 'students', activeLearners: 'active learners',
    overview: 'Overview', roadmap: '5-Year Roadmap', calendar: 'Weekly Calendar',
    skillTree: 'Skill Tree', career: 'Career Paths', kidsTab: 'Students',
    badges: 'Badges', journal: 'Journal', portfolio: 'Portfolio',
    leaderboard: 'Leaderboard', hardware: 'Hardware', software: 'Software',
    english: 'English', finance: 'Finance', thinking: 'Thinking',
    rewards: 'Rewards', experiences: 'Experiences', publish: 'Publishing',
    library: 'Library', aiSearch: 'AI Search', quiz: 'Quiz', report: 'Report', settings: 'Settings',
    progress: 'Progress', objectives: 'Goals', skills: 'Skills',
    evaluate: 'Review', edit: 'Edit', save: 'Save', cancel: 'Cancel',
    add: 'Add', remove: 'Remove', name: 'Name', age: 'Age', notes: 'Notes',
    rating: 'Star rating', completed: 'Done', total: 'total',
    streak: 'Streak', days: 'days', today: 'Today',
    checkIn: 'Check in', checkedIn: 'Checked in',
    week: 'Week', month: 'Month', quarter: 'Quarter', year: 'Year',
    addStudent: 'Add student', addNewStudent: 'Add a new student',
    avgProgress: 'Average progress', topPerformer: 'Top performer',
    longestStreak: 'Longest streak', totalBadges: 'Total badges',
    coreValues: 'Core philosophy', sevenPillars: '7 Pillars of growth',
    notice: 'Notice', philosophy: 'Family studio — dad and kids build real things, learn real things, fail real things, fix real things. AI is a collaborator, not a teacher.',
    weeklyTasks: 'This week\'s tasks', addTask: 'Add task',
    journalEntry: 'Today\'s journal', writeJournal: 'Write your journal...',
    learned: 'What did you learn today?', hard: 'Hardest part?', happy: 'Best moment?',
    addPortfolio: 'Add a project', portfolioTitle: 'Project title',
    portfolioUrl: 'Image/video URL', portfolioDesc: 'Description',
    careerExplore: 'Explore future careers',
    quizGenerator: 'Auto Quiz Generator', startQuiz: 'Start',
    correct: 'Correct! 🎉', wrong: 'Not quite, try again!',
    score: 'Score', exportPdf: 'Export PDF', printReport: 'Print report',
    notifications: 'Notifications', language: 'Language',
    dataMgmt: 'Data management', exportData: 'Export data',
    importData: 'Import data', resetAll: 'Reset everything',
    selectKid: 'Select a student', loginPin: 'PIN code', enterPin: 'Enter 4-digit PIN',
    parentMode: 'Parent', kidMode: 'Student',
    profileLabel: 'Profile', editProfile: 'Edit profile', avatar: 'Avatar (emoji)', birthday: 'Birthday',
    school: 'School', hobbies: 'Hobbies', goals: 'Learning goals', bio: 'Bio', favoriteSubject: 'Favorite subject',
    pinHintTitle: 'Default PIN', loginParent: 'Switch to Parent mode',
    parentBadgeTip: 'Parent mode is default — edit anything freely',
    yourBadges: 'Your badges', locked: 'Locked', unlocked: 'Unlocked',
    unlockedAt: 'Unlocked', noEvalYet: 'No reviews yet',
    pillarRadar: '6-Pillar competency chart', progressOverTime: 'Progress over time',
    compareKids: 'Compare students', tabs: 'Tab',
    confetti: '🎉', loading: 'Loading Pany Kids Studio...',
    debate: 'Debate', mentor: 'Mentor', resourceLib: 'Resource library',
    books: 'Books', videos: 'Videos', tools: 'Tools', websites: 'Websites',
    weekFocus: 'Week focus', daily: 'Daily', weekly: 'Weekly',
    studioCreative: 'Creative Studio', bodyMovement: 'Body & Movement', selfDiscovery: 'Self Discovery',
    careerCompass: 'Career Compass', familyBridge: 'Family Bridge',
    englishSkills: 'English 4 skills',
  },
};

const DEFAULT_KIDS = [
  { id: 'kid_1', name: 'Phúc',  age: 11, color: '#FF6B9D', emoji: '🌟', pin: '1111', pinHint: '', birthday: '2015-06-26', school: 'Lên lớp 6 (9/2026)',     hobbies: '', goals: '', bio: 'Trần Hạnh Phúc',  favoriteSubject: '' },
  { id: 'kid_2', name: 'An',    age: 9,  color: '#4DABF7', emoji: '🚀', pin: '2222', pinHint: '', birthday: '2017-08-30', school: 'Lên lớp 4 (9/2026)',     hobbies: '', goals: '', bio: 'Trần Bình An',    favoriteSubject: '' },
  { id: 'kid_3', name: 'Y',     age: 5,  color: '#51CF66', emoji: '🎨', pin: '3333', pinHint: '', birthday: '2020-02-28', school: 'Vào lớp lá (9/2026)',    hobbies: '', goals: '', bio: 'Trần Như Ý',      favoriteSubject: '' },
];

const PILLARS = [
  { id: 'tech',     vi: 'Công nghệ & AI',   en: 'Tech & AI',         icon: Cpu,        color: '#4DABF7' },
  { id: 'english',  vi: 'Tiếng Anh',         en: 'English',           icon: Globe,      color: '#FF6B9D' },
  { id: 'finance',  vi: 'Tài chính',         en: 'Finance',           icon: DollarSign, color: '#51CF66' },
  { id: 'thinking', vi: 'Tư duy phản biện',  en: 'Critical Thinking', icon: Brain,      color: '#845EC2' },
  { id: 'business', vi: 'Kinh doanh',        en: 'Business',          icon: TrendingUp, color: '#FFD43B' },
  { id: 'life',     vi: 'Trải nghiệm thực',  en: 'Life Experience',   icon: MapPin,     color: '#FF8787' },
];

const YEAR_PLANS = [
  {
    year: 1, vi_title: 'Năm 1 — Khởi động', en_title: 'Year 1 — Foundations',
    vi_subtitle: 'Khởi đầu', en_subtitle: 'Foundations & Curiosity',
    age_focus: '6-12', emoji: '🌱',
    quarters: [
      { vi_name: 'Q1: Làm quen AI & Tiếng Anh', en_name: 'Q1: AI & English Intro', weeks: '1-12',
        vi_obj: ['Hiểu AI là công cụ', 'Học 200 từ vựng qua truyện', 'Hoàn thành 3 dự án Story Cards'],
        en_obj: ['Understand AI as a tool', 'Learn 200 words via storytelling', 'Complete 3 Story Card projects'],
        skills: ['english_basic', 'ai_literacy', 'storytelling'], pillar: 'english' },
      { vi_name: 'Q2: Lập trình Scratch', en_name: 'Q2: Scratch Coding', weeks: '13-24',
        vi_obj: ['Build 1 game đơn giản', 'Hiểu if-then, loop, variable', 'Demo cho gia đình'],
        en_obj: ['Build a simple game', 'Understand if-then, loop, variable', 'Demo to family'],
        skills: ['scratch', 'logic', 'demo'], pillar: 'tech' },
      { vi_name: 'Q3: Khoa học nhà bếp', en_name: 'Q3: Kitchen Science', weeks: '25-36',
        vi_obj: ['6 thí nghiệm tại nhà', 'Viết lab notebook', 'Học method khoa học'],
        en_obj: ['6 home experiments', 'Write lab notebook', 'Learn scientific method'],
        skills: ['scientific_method', 'observation'], pillar: 'thinking' },
      { vi_name: 'Q4: Kinh doanh nhỏ #1', en_name: 'Q4: First Mini-Business', weeks: '37-48',
        vi_obj: ['Bán sản phẩm đầu tiên', 'Hiểu lãi-lỗ', 'Thiết kế logo + tờ rơi'],
        en_obj: ['First product sale', 'Understand profit/loss', 'Design logo + flyer'],
        skills: ['basic_finance', 'design', 'first_sale'], pillar: 'business' },
    ],
  },
  {
    year: 2, vi_title: 'Năm 2 — Mở rộng', en_title: 'Year 2 — Expanding',
    vi_subtitle: 'Mở rộng kỹ năng', en_subtitle: 'Skills Deepen',
    age_focus: '7-13', emoji: '🌿',
    quarters: [
      { vi_name: 'Q1: Tiếng Anh giao tiếp', en_name: 'Q1: English Communication', weeks: '49-60',
        vi_obj: ['Kể chuyện 5 phút bằng tiếng Anh', 'Đọc sách thiếu nhi tiếng Anh', '500 từ vựng tích lũy'],
        en_obj: ['5-min story in English', 'Read children\'s books in English', 'Cumulative 500 words'],
        skills: ['speaking', 'reading'], pillar: 'english' },
      { vi_name: 'Q2: MIT App Inventor', en_name: 'Q2: MIT App Inventor', weeks: '61-72',
        vi_obj: ['Build app Android đầu tiên', 'Giải vấn đề thật của gia đình', 'Cài & chia sẻ'],
        en_obj: ['Build first Android app', 'Solve a real family problem', 'Install & share'],
        skills: ['app_inventor', 'problem_solving'], pillar: 'tech' },
      { vi_name: 'Q3: Toán qua dự án', en_name: 'Q3: Math via Projects', weeks: '73-84',
        vi_obj: ['Đo đạc & vẽ floor plan', 'Statistics đơn giản', 'Excel/Sheets'],
        en_obj: ['Measure & draw floor plan', 'Simple stats', 'Excel/Sheets'],
        skills: ['math', 'spreadsheets'], pillar: 'thinking' },
      { vi_name: 'Q4: Kinh doanh online', en_name: 'Q4: Online Mini-Business', weeks: '85-96',
        vi_obj: ['Bán qua Zalo/FB', 'Chụp ảnh + caption song ngữ', 'Vẽ chart doanh thu'],
        en_obj: ['Sell on Zalo/FB', 'Photos + bilingual caption', 'Revenue chart'],
        skills: ['marketing', 'content'], pillar: 'business' },
    ],
  },
  {
    year: 3, vi_title: 'Năm 3 — Sáng tạo', en_title: 'Year 3 — Creative ID',
    vi_subtitle: 'Sáng tạo & Cá tính', en_subtitle: 'Creative Identity',
    age_focus: '8-14', emoji: '🌳',
    quarters: [
      { vi_name: 'Q1: Web Development', en_name: 'Q1: Web Development', weeks: '97-108',
        vi_obj: ['Trang web cá nhân (HTML/CSS)', 'Deploy GitHub Pages/Vercel', 'Portfolio 2 năm qua'],
        en_obj: ['Personal site (HTML/CSS)', 'Deploy GitHub Pages/Vercel', 'Portfolio of past 2 years'],
        skills: ['html_css', 'git', 'portfolio'], pillar: 'tech' },
      { vi_name: 'Q2: Tiếng Anh học thuật', en_name: 'Q2: Academic English', weeks: '109-120',
        vi_obj: ['Essay 200 từ', 'TED-Ed không phụ đề', 'Cambridge Movers/Flyers'],
        en_obj: ['200-word essay', 'TED-Ed no subs', 'Cambridge Movers/Flyers'],
        skills: ['writing', 'listening'], pillar: 'english' },
      { vi_name: 'Q3: Khoa học chuyên sâu', en_name: 'Q3: Deep Science', weeks: '121-132',
        vi_obj: ['Chọn 1 chủ đề', 'Dự án nghiên cứu mini 12 tuần', 'Family Science Fair'],
        en_obj: ['Pick a topic', '12-week mini research', 'Family Science Fair'],
        skills: ['research', 'presentation'], pillar: 'thinking' },
      { vi_name: 'Q4: Startup gia đình', en_name: 'Q4: Family Startup', weeks: '133-144',
        vi_obj: ['3 bạn build dự án chung', 'Phân vai CEO/Designer/Marketer', 'Bán cho cộng đồng'],
        en_obj: ['3 kids build together', 'CEO/Designer/Marketer roles', 'Sell to community'],
        skills: ['team', 'real_product'], pillar: 'business' },
    ],
  },
  {
    year: 4, vi_title: 'Năm 4 — Tư duy hệ thống', en_title: 'Year 4 — Systems',
    vi_subtitle: 'Tư duy hệ thống', en_subtitle: 'Systems Thinking',
    age_focus: '9-15', emoji: '🌲',
    quarters: [
      { vi_name: 'Q1: Python + AI', en_name: 'Q1: Python + AI', weeks: '145-156',
        vi_obj: ['Python cơ bản', 'Chatbot với Anthropic API', 'Prompt engineering'],
        en_obj: ['Python basics', 'Chatbot with Anthropic API', 'Prompt engineering'],
        skills: ['python', 'api', 'prompt_eng'], pillar: 'tech' },
      { vi_name: 'Q2: Tài chính nâng cao', en_name: 'Q2: Advanced Finance', weeks: '157-168',
        vi_obj: ['App quản lý tiền', 'Lãi suất, lạm phát, đầu tư', 'Budget tháng'],
        en_obj: ['Money tracking app', 'Interest, inflation, investing', 'Monthly budget'],
        skills: ['finance', 'budgeting'], pillar: 'finance' },
      { vi_name: 'Q3: Phản biện & Logic', en_name: 'Q3: Critical & Logic', weeks: '169-180',
        vi_obj: ['1 bài báo/tuần', 'Logical fallacies', 'Debate Club'],
        en_obj: ['1 article/week', 'Logical fallacies', 'Debate Club'],
        skills: ['critical_reading', 'debate'], pillar: 'thinking' },
      { vi_name: 'Q4: Public Project', en_name: 'Q4: Public Project', weeks: '181-192',
        vi_obj: ['1 channel (YT/blog/IG)', 'Đăng đều 12 tuần', 'Analytics & audience'],
        en_obj: ['1 channel (YT/blog/IG)', 'Post for 12 weeks', 'Analytics & audience'],
        skills: ['public_creation', 'consistency'], pillar: 'business' },
    ],
  },
  {
    year: 5, vi_title: 'Năm 5 — Tự lập', en_title: 'Year 5 — Independence',
    vi_subtitle: 'Tự lập & Chuyển giao', en_subtitle: 'Independence & Mastery',
    age_focus: '10-16', emoji: '🌟',
    quarters: [
      { vi_name: 'Q1: Chọn chuyên ngành', en_name: 'Q1: Pick Specialty', weeks: '193-204',
        vi_obj: ['Chọn 1 hướng sâu', 'Tự lập learning plan 12 tuần', 'Bố là cố vấn'],
        en_obj: ['Pick a deep direction', 'Self-led 12-week plan', 'Dad as advisor'],
        skills: ['self_directed', 'specialization'], pillar: 'thinking' },
      { vi_name: 'Q2: Thi chứng chỉ', en_name: 'Q2: Certifications', weeks: '205-216',
        vi_obj: ['Cambridge KET/PET', 'Hoặc cert lập trình', 'Bằng chứng quốc tế'],
        en_obj: ['Cambridge KET/PET', 'Or coding cert', 'International proof'],
        skills: ['certification'], pillar: 'english' },
      { vi_name: 'Q3: Kinh doanh độc lập', en_name: 'Q3: Independent Business', weeks: '217-228',
        vi_obj: ['Vận hành 1 mini-business riêng', 'Tự tính P&L', 'Bố đầu tư seed như VC'],
        en_obj: ['Run own mini-business', 'Self-calc P&L', 'Dad invests as VC'],
        skills: ['independence', 'pnl', 'pitching'], pillar: 'business' },
      { vi_name: 'Q4: Mentor đàn em', en_name: 'Q4: Mentor Younger Ones', weeks: '229-240',
        vi_obj: ['Dạy lại 1 kỹ năng', 'Video tutorial', 'Mastery qua dạy lại'],
        en_obj: ['Teach a skill back', 'Tutorial video', 'Mastery through teaching'],
        skills: ['teaching', 'mentoring'], pillar: 'life' },
    ],
  },
];

// === BADGES (Tier 1) ===
const BADGES = [
  { id: 'first_step',     vi: 'Bước đầu tiên',     en: 'First Step',       emoji: '🐣', desc_vi: 'Hoàn thành mục tiêu đầu tiên', desc_en: 'Complete your first goal',          rule: { type: 'objectives', count: 1 } },
  { id: 'streak_7',       vi: 'Chiến binh 7 ngày', en: '7-Day Warrior',    emoji: '🔥', desc_vi: 'Học 7 ngày liên tục',          desc_en: 'Learn 7 days in a row',             rule: { type: 'streak', count: 7 } },
  { id: 'streak_30',      vi: 'Tháng vàng',        en: 'Golden Month',     emoji: '💎', desc_vi: '30 ngày streak',                desc_en: '30-day streak',                      rule: { type: 'streak', count: 30 } },
  { id: 'q1_complete',    vi: 'Hoàn thành Q1',     en: 'Q1 Champion',      emoji: '🏆', desc_vi: 'Xong toàn bộ Q1 năm 1',         desc_en: 'Finish all of Year 1 Q1',           rule: { type: 'quarter', year: 1, q: 0 } },
  { id: 'year_1',         vi: 'Hoàn thành Năm 1',  en: 'Year 1 Done',      emoji: '🎓', desc_vi: 'Xong toàn bộ năm 1',            desc_en: 'Finish all of Year 1',              rule: { type: 'year', year: 1 } },
  { id: 'polyglot',       vi: 'Người đa ngôn ngữ', en: 'Polyglot',          emoji: '🌍', desc_vi: 'Hoàn thành 5 mục tiêu English', desc_en: 'Complete 5 English goals',          rule: { type: 'pillar', pillar: 'english', count: 5 } },
  { id: 'coder',          vi: 'Lập trình viên nhí', en: 'Junior Coder',    emoji: '👨‍💻', desc_vi: 'Hoàn thành 5 mục tiêu Tech',    desc_en: 'Complete 5 Tech goals',             rule: { type: 'pillar', pillar: 'tech', count: 5 } },
  { id: 'entrepreneur',   vi: 'Doanh nhân nhí',    en: 'Junior CEO',        emoji: '💼', desc_vi: 'Hoàn thành 5 mục tiêu Business', desc_en: 'Complete 5 Business goals',         rule: { type: 'pillar', pillar: 'business', count: 5 } },
  { id: 'thinker',        vi: 'Triết gia nhí',     en: 'Junior Thinker',   emoji: '🧠', desc_vi: 'Hoàn thành 5 mục tiêu Thinking',desc_en: 'Complete 5 Thinking goals',         rule: { type: 'pillar', pillar: 'thinking', count: 5 } },
  { id: 'money_master',   vi: 'Quản lý tiền',      en: 'Money Master',      emoji: '💰', desc_vi: 'Hoàn thành 5 mục tiêu Finance', desc_en: 'Complete 5 Finance goals',          rule: { type: 'pillar', pillar: 'finance', count: 5 } },
  { id: 'explorer',       vi: 'Nhà thám hiểm',     en: 'Explorer',          emoji: '🗺️', desc_vi: 'Hoàn thành 5 mục tiêu Life',    desc_en: 'Complete 5 Life goals',             rule: { type: 'pillar', pillar: 'life', count: 5 } },
  { id: 'journal_10',     vi: 'Nhà văn',           en: 'Writer',            emoji: '📓', desc_vi: 'Viết 10 nhật ký',               desc_en: 'Write 10 journal entries',          rule: { type: 'journal', count: 10 } },
  { id: 'portfolio_5',    vi: 'Nghệ sĩ',           en: 'Artist',            emoji: '🎨', desc_vi: 'Tạo 5 sản phẩm portfolio',      desc_en: 'Create 5 portfolio items',          rule: { type: 'portfolio', count: 5 } },
  { id: 'all_pillars',    vi: 'Đa năng',           en: 'All-Rounder',       emoji: '⭐', desc_vi: 'Có ít nhất 1 mục tiêu mỗi trụ', desc_en: '1+ goal in every pillar',           rule: { type: 'all_pillars' } },
  { id: 'half_way',       vi: 'Nửa chặng đường',   en: 'Halfway Hero',      emoji: '🚀', desc_vi: '50% tiến độ 5 năm',             desc_en: '50% of 5-year progress',            rule: { type: 'overall', pct: 50 } },
  { id: 'graduate',       vi: 'Tốt nghiệp Studio', en: 'Studio Graduate',   emoji: '👑', desc_vi: 'Hoàn thành 5 năm',              desc_en: 'Complete all 5 years',              rule: { type: 'overall', pct: 100 } },
];

// === CAREER PATHS (Tier 3 — hướng nghiệp) ===
const CAREER_PATHS = [
  { id: 'ai_engineer',    emoji: '🤖', vi: 'Kỹ sư AI',           en: 'AI Engineer',
    vi_desc: 'Xây dựng hệ thống AI, train model, ứng dụng AI vào sản phẩm thật.',
    en_desc: 'Build AI systems, train models, apply AI to real products.',
    pillars: ['tech', 'thinking'], skills: ['python', 'api', 'prompt_eng', 'research'],
    vi_path: '8-10: Scratch → 11-13: Python → 14-16: ML cơ bản + Anthropic API + Kaggle',
    en_path: '8-10: Scratch → 11-13: Python → 14-16: Basic ML + Anthropic API + Kaggle',
    vi_salary: '20-100tr/tháng entry-level VN, $150k+ ở Mỹ', en_salary: '$30-150k+ globally',
    icon: Cpu, color: '#4DABF7' },
  { id: 'creator',        emoji: '🎬', vi: 'Sáng tạo nội dung',  en: 'Content Creator',
    vi_desc: 'Build kênh YouTube/TikTok/Blog, kiếm tiền qua sáng tạo.',
    en_desc: 'Build YouTube/TikTok/Blog channel, monetize creativity.',
    pillars: ['business', 'english'], skills: ['public_creation', 'consistency'],
    vi_path: '8-10: Story Cards → 11-13: Đăng video gia đình → 14-16: Channel thật + analytics',
    en_path: '8-10: Story Cards → 11-13: Family videos → 14-16: Real channel + analytics',
    vi_salary: 'Bằng 0 → vô hạn, phụ thuộc audience', en_salary: '$0 → unlimited',
    icon: Camera, color: '#FF6B9D' },
  { id: 'entrepreneur',   emoji: '💼', vi: 'Khởi nghiệp',         en: 'Entrepreneur',
    vi_desc: 'Build và vận hành business riêng, từ tiệm cookies đến tech startup.',
    en_desc: 'Build and run own business, from cookie shop to tech startup.',
    pillars: ['business', 'finance', 'thinking'], skills: ['first_sale', 'pnl', 'team'],
    vi_path: '8-10: Bán đồ tự làm → 11-13: Online shop → 14-16: Real startup + VC seed từ bố',
    en_path: '8-10: Sell crafts → 11-13: Online shop → 14-16: Real startup + VC seed from dad',
    vi_salary: 'Cao và bất ổn, đỉnh cao $1B+', en_salary: 'High variance, up to billions',
    icon: Briefcase, color: '#FFD43B' },
  { id: 'designer',       emoji: '🎨', vi: 'Designer',            en: 'Designer',
    vi_desc: 'Thiết kế sản phẩm số, UX/UI, brand, illustration, animation.',
    en_desc: 'Design digital products, UX/UI, brand, illustration, animation.',
    pillars: ['tech', 'business'], skills: ['design', 'html_css', 'portfolio'],
    vi_path: '8-10: Vẽ tay + Canva → 11-13: Figma → 14-16: Portfolio thật + Behance/Dribbble',
    en_path: '8-10: Drawing + Canva → 11-13: Figma → 14-16: Real portfolio + Behance/Dribbble',
    vi_salary: '15-50tr/tháng VN, $60-150k toàn cầu', en_salary: '$30-150k globally',
    icon: Palette, color: '#845EC2' },
  { id: 'researcher',     emoji: '🔬', vi: 'Nhà nghiên cứu',      en: 'Researcher',
    vi_desc: 'Khoa học gia, học thuật, tìm hiểu sâu 1 lĩnh vực và đẩy biên giới tri thức.',
    en_desc: 'Scientist, academic — go deep into a field and push knowledge frontiers.',
    pillars: ['thinking', 'english'], skills: ['research', 'critical_reading', 'writing'],
    vi_path: '8-10: Khoa học nhà bếp → 11-13: Mini research → 14-16: Đề tài chuyên sâu + ISEF',
    en_path: '8-10: Kitchen science → 11-13: Mini research → 14-16: Deep topic + ISEF',
    vi_salary: 'Stable, $60-200k với PhD ở nước ngoài', en_salary: '$60-200k+ with PhD',
    icon: BookOpen, color: '#51CF66' },
  { id: 'fullstack_dev',  emoji: '💻', vi: 'Lập trình Full-stack', en: 'Full-stack Dev',
    vi_desc: 'Build web app từ frontend đến backend, deploy lên cloud.',
    en_desc: 'Build web apps end-to-end, deploy to cloud.',
    pillars: ['tech'], skills: ['html_css', 'python', 'git', 'api'],
    vi_path: '8-10: Scratch → 11-13: HTML/CSS/JS → 14-16: React + Node + Vercel',
    en_path: '8-10: Scratch → 11-13: HTML/CSS/JS → 14-16: React + Node + Vercel',
    vi_salary: '15-80tr/tháng VN, $80-200k toàn cầu', en_salary: '$60-200k globally',
    icon: Code, color: '#4DABF7' },
  { id: 'investor',       emoji: '📈', vi: 'Nhà đầu tư',          en: 'Investor',
    vi_desc: 'Quản lý tiền, đầu tư cổ phiếu, BĐS, startup. Kiếm tiền bằng tiền.',
    en_desc: 'Manage money, invest in stocks, real estate, startups. Money makes money.',
    pillars: ['finance', 'thinking'], skills: ['finance', 'budgeting', 'research'],
    vi_path: '8-10: 3 hũ → 11-13: Mock investing → 14-16: Real portfolio nhỏ + lãi kép',
    en_path: '8-10: 3 jars → 11-13: Mock investing → 14-16: Small real portfolio + compound',
    vi_salary: 'Phụ thuộc vốn và kỹ năng', en_salary: 'Capital + skill dependent',
    icon: TrendingUp, color: '#51CF66' },
  { id: 'educator',       emoji: '👩‍🏫', vi: 'Giáo viên / Mentor',  en: 'Educator/Mentor',
    vi_desc: 'Dạy lại điều mình biết — coach, tutor, online course creator.',
    en_desc: 'Teach back what you know — coach, tutor, online course creator.',
    pillars: ['english', 'thinking', 'life'], skills: ['teaching', 'mentoring', 'speaking'],
    vi_path: '8-10: Demo cho gia đình → 11-13: Dạy em → 14-16: Tutorial videos + course nhỏ',
    en_path: '8-10: Family demos → 11-13: Teach younger → 14-16: Tutorial videos + mini course',
    vi_salary: 'Stable VN 12-30tr, online unlimited', en_salary: '$30-100k+ online unlimited',
    icon: GraduationCap, color: '#FF8787' },
  { id: 'maker',          emoji: '🔧', vi: 'Maker / Hardware',    en: 'Maker / Hardware',
    vi_desc: 'Build phần cứng, robot, IoT, sản phẩm vật lý kết hợp code.',
    en_desc: 'Build hardware, robots, IoT, physical products with code.',
    pillars: ['tech', 'thinking'], skills: ['scratch', 'python', 'problem_solving'],
    vi_path: '8-10: Lego → 11-13: Raspberry Pi → 14-16: Arduino + 3D printing + IoT thật',
    en_path: '8-10: Lego → 11-13: Raspberry Pi → 14-16: Arduino + 3D print + real IoT',
    vi_salary: '15-60tr/tháng VN, niche specialty', en_salary: '$50-150k niche',
    icon: Wrench, color: '#FFD43B' },
  { id: 'multipotential', emoji: '🌈', vi: 'Đa năng (như bố)',    en: 'Multi-potential',
    vi_desc: 'Kết hợp nhiều kỹ năng — không cần chọn 1. Ví dụ: tech + business + content.',
    en_desc: 'Combine many skills — no need to pick one. e.g. tech + business + content.',
    pillars: ['tech', 'business', 'english', 'finance', 'thinking', 'life'], skills: [],
    vi_path: 'Cả 5 năm theo curriculum này — sau đó tự kết hợp',
    en_path: 'All 5 years of curriculum — then combine on your own',
    vi_salary: 'Tùy combo, thường rất tốt', en_salary: 'Combo-dependent, usually high',
    icon: Sparkles, color: '#FF6B9D' },
];

// === RESOURCE LIBRARY (Tier 3) ===
const RESOURCES = [
  { type: 'books', age: '8-10', vi_title: 'Hello Ruby Adventures', en_title: 'Hello Ruby Adventures', author: 'Linda Liukas', vi_why: 'Truyện tranh dạy lập trình', en_why: 'Comic teaching coding', url: 'https://www.helloruby.com/' },
  { type: 'books', age: '8-10', vi_title: 'My First Coding Book', en_title: 'My First Coding Book', author: 'DK', vi_why: 'Sách lật mở dạy logic', en_why: 'Lift-the-flap logic book', url: 'https://www.dk.com' },
  { type: 'books', age: '11-13', vi_title: 'Python Crash Course', en_title: 'Python Crash Course', author: 'No Starch', vi_why: 'Python chuẩn cho teen', en_why: 'Python textbook for teens', url: 'https://nostarch.com/pythoncrashcourse2e' },
  { type: 'books', age: '11-13', vi_title: 'Rich Dad Poor Dad for Teens', en_title: 'Rich Dad Poor Dad for Teens', author: 'Robert Kiyosaki', vi_why: 'Tài chính từ sớm', en_why: 'Early financial mindset', url: '' },
  { type: 'books', age: '14-16', vi_title: 'Thinking Fast and Slow', en_title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', vi_why: 'Tư duy phản biện đỉnh cao', en_why: 'Top-tier critical thinking', url: '' },
  { type: 'books', age: '14-16', vi_title: 'The Lean Startup', en_title: 'The Lean Startup', author: 'Eric Ries', vi_why: 'Build sản phẩm có khách', en_why: 'Build products that sell', url: '' },
  { type: 'videos', age: 'all', vi_title: 'TED-Ed', en_title: 'TED-Ed', author: 'TED', vi_why: 'Video giáo dục 5-10 phút', en_why: '5-10 min education videos', url: 'https://ed.ted.com' },
  { type: 'videos', age: '8-10', vi_title: 'Khan Academy Kids', en_title: 'Khan Academy Kids', author: 'Khan', vi_why: 'Học miễn phí cho trẻ nhỏ', en_why: 'Free learning for young kids', url: 'https://www.khanacademy.org/kids' },
  { type: 'videos', age: '11-16', vi_title: 'CS50 (Harvard)', en_title: 'CS50 (Harvard)', author: 'Harvard', vi_why: 'Nhập môn CS huyền thoại', en_why: 'Legendary intro to CS', url: 'https://cs50.harvard.edu' },
  { type: 'tools', age: '8-10', vi_title: 'Scratch', en_title: 'Scratch', author: 'MIT', vi_why: 'Lập trình kéo thả', en_why: 'Drag-drop coding', url: 'https://scratch.mit.edu' },
  { type: 'tools', age: '8-10', vi_title: 'Code.org', en_title: 'Code.org', author: 'Code.org', vi_why: 'Bài học code cấu trúc', en_why: 'Structured coding lessons', url: 'https://code.org' },
  { type: 'tools', age: '11-13', vi_title: 'MIT App Inventor', en_title: 'MIT App Inventor', author: 'MIT', vi_why: 'Build app Android kéo thả', en_why: 'Drag-drop Android apps', url: 'https://appinventor.mit.edu' },
  { type: 'tools', age: '11-13', vi_title: 'Replit', en_title: 'Replit', author: 'Replit', vi_why: 'Code online ngay browser', en_why: 'Code online in browser', url: 'https://replit.com' },
  { type: 'tools', age: '14-16', vi_title: 'GitHub', en_title: 'GitHub', author: 'GitHub', vi_why: 'Lưu code chuyên nghiệp', en_why: 'Pro code hosting', url: 'https://github.com' },
  { type: 'tools', age: 'all', vi_title: 'Canva for Education', en_title: 'Canva for Education', author: 'Canva', vi_why: 'Design free cho học sinh', en_why: 'Free design for students', url: 'https://www.canva.com/education' },
  { type: 'tools', age: 'all', vi_title: 'Figma', en_title: 'Figma', author: 'Figma', vi_why: 'Pro UI/UX design', en_why: 'Pro UI/UX design', url: 'https://figma.com' },
  { type: 'websites', age: 'all', vi_title: 'Duolingo', en_title: 'Duolingo', author: 'Duolingo', vi_why: 'Tiếng Anh game-based', en_why: 'Gamified English', url: 'https://duolingo.com' },
  { type: 'websites', age: '11-16', vi_title: 'freeCodeCamp', en_title: 'freeCodeCamp', author: 'fCC', vi_why: 'Code free + cert', en_why: 'Free coding + cert', url: 'https://freecodecamp.org' },
  { type: 'websites', age: '14-16', vi_title: 'Coursera (audit free)', en_title: 'Coursera (audit free)', author: 'Coursera', vi_why: 'Course đại học free audit', en_why: 'Free audit university courses', url: 'https://coursera.org' },
];

// QUIZ_BANK now imported from @/lib/quiz (60+ questions, expanded 2026-04-30)

// === HARDWARE / SOFTWARE / FINANCE / EXPERIENCES / etc (giữ lại từ v2 + bilingual nhẹ) ===
const HARDWARE_BY_AGE = [
  { vi_range: '6-8 tuổi · Khám phá', en_range: 'Age 6-8 · Discover', emoji: '🎈',
    items: [
      { vi_cat: 'Máy tính', en_cat: 'Computer', vi_name: 'Tablet Android cũ / iPad Gen 9 cũ', en_name: 'Used Android tablet / iPad Gen 9', cost: '3-5tr', vi_why: 'Touch-first, Lingokids, Khan Kids', en_why: 'Touch-first, Lingokids, Khan Kids' },
      { vi_cat: 'Sách', en_cat: 'Book', vi_name: 'Hello Ruby Adventures', en_name: 'Hello Ruby Adventures', cost: '300k', vi_why: 'Truyện tranh dạy code', en_why: 'Comic teaching code' },
      { vi_cat: 'Linh kiện', en_cat: 'Kit', vi_name: 'Lego Duplo Coding Express', en_name: 'Lego Duplo Coding Express', cost: '2-3tr', vi_why: 'Code bằng xếp gạch', en_why: 'Code by stacking bricks' },
      { vi_cat: 'Linh kiện', en_cat: 'Kit', vi_name: 'Bee-Bot / Code-a-pillar', en_name: 'Bee-Bot / Code-a-pillar', cost: '1.5tr', vi_why: 'Robot lập trình bằng nút', en_why: 'Button-coded robot' },
      { vi_cat: 'Sổ', en_cat: 'Notebook', vi_name: 'Sổ A4 + bút màu', en_name: 'A4 sketchbook + crayons', cost: '300k', vi_why: 'Vẽ ý tưởng', en_why: 'Sketch ideas' },
      { vi_cat: 'Tài chính', en_cat: 'Finance', vi_name: '3 hũ tiết kiệm trong suốt', en_name: '3 transparent jars', cost: '200k', vi_why: 'Học 3 hũ vật lý', en_why: 'Physical 3-jar system' },
    ],
  },
  { vi_range: '8-10 tuổi · Làm quen', en_range: 'Age 8-10 · Familiar', emoji: '🧩',
    items: [
      { vi_cat: 'Máy tính', en_cat: 'Computer', vi_name: 'Laptop refurbished i5/8GB', en_name: 'Refurbished laptop i5/8GB', cost: '5-8tr', vi_why: 'Đủ Scratch, web nhẹ', en_why: 'Enough for Scratch, light web' },
      { vi_cat: 'Sách', en_cat: 'Book', vi_name: 'Coding Games in Scratch (DK)', en_name: 'Coding Games in Scratch (DK)', cost: '400k', vi_why: 'Dự án có hình minh họa', en_why: 'Illustrated projects' },
      { vi_cat: 'Linh kiện', en_cat: 'Kit', vi_name: 'Lego Boost / Spike Essential', en_name: 'Lego Boost / Spike Essential', cost: '3-5tr', vi_why: 'Code + cơ khí', en_why: 'Code + mechanics' },
      { vi_cat: 'Sổ', en_cat: 'Notebook', vi_name: '3 sổ Idea Notebook', en_name: '3 Idea Notebooks', cost: '500k', vi_why: 'Vẽ ý tưởng trước khi code', en_why: 'Sketch before code' },
    ],
  },
  { vi_range: '11-13 tuổi · Mở rộng', en_range: 'Age 11-13 · Expand', emoji: '🚀',
    items: [
      { vi_cat: 'Máy tính', en_cat: 'Computer', vi_name: 'Laptop i5/Ryzen 5 16GB', en_name: 'Laptop i5/Ryzen 5 16GB', cost: '12-15tr', vi_why: 'IDE + edit video nhẹ', en_why: 'IDE + light video edit' },
      { vi_cat: 'Linh kiện', en_cat: 'Kit', vi_name: 'Raspberry Pi 5 + sensor', en_name: 'Raspberry Pi 5 + sensors', cost: '3-4tr', vi_why: 'IoT cho nhà', en_why: 'Home IoT' },
      { vi_cat: 'Sách', en_cat: 'Book', vi_name: 'Python Crash Course', en_name: 'Python Crash Course', cost: '500k', vi_why: 'Python cho teen', en_why: 'Python for teens' },
      { vi_cat: 'Phụ kiện', en_cat: 'Accessory', vi_name: 'Wacom One', en_name: 'Wacom One', cost: '3tr', vi_why: 'Design, sketch UI', en_why: 'Design, sketch UI' },
    ],
  },
  { vi_range: '14-16 tuổi · Chuyên sâu', en_range: 'Age 14-16 · Deep', emoji: '🎓',
    items: [
      { vi_cat: 'Máy tính', en_cat: 'Computer', vi_name: 'MacBook Air M-series', en_name: 'MacBook Air M-series', cost: '20-25tr', vi_why: 'AI/ML local, dev pro', en_why: 'Local AI/ML, pro dev' },
      { vi_cat: 'Linh kiện', en_cat: 'Kit', vi_name: 'Arduino + sensors', en_name: 'Arduino + sensors', cost: '5tr', vi_why: 'Hardware nâng cao', en_why: 'Advanced hardware' },
      { vi_cat: 'Sách', en_cat: 'Book', vi_name: 'Thinking Fast and Slow', en_name: 'Thinking, Fast and Slow', cost: '400k', vi_why: 'Tư duy phản biện', en_why: 'Critical thinking' },
      { vi_cat: 'Subscription', en_cat: 'Subscription', vi_name: 'GitHub/Notion/Figma Student', en_name: 'GitHub/Notion/Figma Student', cost: 'Free', vi_why: 'Toolset chuyên nghiệp', en_why: 'Pro toolset' },
    ],
  },
];

const FINANCIAL_SKILLS = [
  { age: '6-7', vi_skills: ['Đếm tiền xu/tờ tiền', 'Phân biệt mệnh giá', '3 hũ vật lý (nhìn thấy)'], en_skills: ['Count coins/bills', 'Recognize denominations', 'Physical 3 jars (visible)'], vi_milestone: 'Bỏ tiền vào 3 hũ tự phân chia', en_milestone: 'Drop coins into 3 jars by self' },
  { age: '8-10', vi_skills: ['Cần vs muốn', 'Tiết kiệm 3 hũ', 'Cộng trừ tiền'], en_skills: ['Need vs want', '3-jar saving', 'Add/subtract money'], vi_milestone: 'Để dành mua món yêu thích', en_milestone: 'Save for a favorite item' },
  { age: '11-13', vi_skills: ['Lãi-lỗ', 'Chi phí cố định/biến đổi', 'Đọc hóa đơn'], en_skills: ['Profit-loss', 'Fixed/variable cost', 'Read receipts'], vi_milestone: 'Vận hành tiệm có lãi', en_milestone: 'Run a profitable shop' },
  { age: '14-16', vi_skills: ['Lãi suất kép', 'Stock vs bond', 'Tax', 'Budget tháng'], en_skills: ['Compound interest', 'Stock vs bond', 'Tax', 'Monthly budget'], vi_milestone: 'Quản lý 100% tiền + tiết kiệm dài hạn', en_milestone: 'Manage 100% money + long-term saving' },
];

const CRITICAL_THINKING = [
  { vi: 'The 3-Why Game', en: 'The 3-Why Game', vi_desc: 'Hỏi "tại sao?" 3 lần để đào sâu', en_desc: 'Ask "why?" 3 times to dig deep' },
  { vi: 'Steel-manning', en: 'Steel-manning', vi_desc: 'Trình bày quan điểm đối lập tốt hơn cả người ủng hộ nó', en_desc: 'State the opposing view better than its supporters' },
  { vi: 'Logical Fallacies', en: 'Logical Fallacies', vi_desc: 'Mỗi tuần 1 quảng cáo, tìm fallacy', en_desc: 'Spot fallacies in 1 ad/week' },
  { vi: 'Source Triangulation', en: 'Source Triangulation', vi_desc: 'Mỗi fact: kiểm 3 nguồn', en_desc: 'Verify each fact across 3 sources' },
  { vi: 'Family Debate Night', en: 'Family Debate Night', vi_desc: '1 chủ đề/tháng có cấu trúc', en_desc: '1 structured topic/month' },
  { vi: 'Question Before Search', en: 'Question Before Search', vi_desc: 'Viết giả thuyết trước khi hỏi AI', en_desc: 'Write hypothesis before asking AI' },
];

const REWARDS = [
  { tier: 'week',    vi_tier: 'Tuần',  en_tier: 'Week',    vi_crit: 'Hoàn thành 80%+ task tuần', en_crit: '80%+ weekly tasks',     vi_reward: 'Chọn món tối thứ 7 / movie night', en_reward: 'Pick Saturday dinner / movie night' },
  { tier: 'month',   vi_tier: 'Tháng', en_tier: 'Month',   vi_crit: 'Đạt mọi milestone tháng',     en_crit: 'All monthly milestones', vi_reward: 'Trip 1 ngày / 1 cuốn sách',         en_reward: '1-day trip / 1 book' },
  { tier: 'quarter', vi_tier: 'Quý',   en_tier: 'Quarter', vi_crit: 'Hoàn thành Demo Day quý',     en_crit: 'Quarterly Demo Day done', vi_reward: 'Đồ chơi lớn / workshop',           en_reward: 'Big toy / workshop' },
  { tier: 'year',    vi_tier: 'Năm',   en_tier: 'Year',    vi_crit: 'Hoàn thành Year Review',      en_crit: 'Year Review complete',    vi_reward: 'Trip xa / công cụ pro',             en_reward: 'Big trip / pro tool' },
  { tier: 'bonus',   vi_tier: 'Bonus', en_tier: 'Bonus',   vi_crit: 'Sản phẩm bán được tiền thật', en_crit: 'Product sells real money', vi_reward: '50% lợi nhuận giữ + match',        en_reward: '50% profit kept + dad matches' },
];

const EXPERIENCES = [
  { vi_when: 'Mỗi quý',    en_when: 'Every quarter', vi_acts: ['Trip 1 ngày: bảo tàng/nhà máy/làng nghề', 'Demo Day gia đình'], en_acts: ['1-day trip: museum/factory/craft village', 'Family Demo Day'] },
  { vi_when: 'Mỗi 6 tháng', en_when: 'Every 6 months', vi_acts: ['Camping 2 ngày — không điện thoại', 'Visit công ty người quen'],   en_acts: ['2-day camping — no phones', 'Visit a real workplace'] },
  { vi_when: 'Mỗi năm',     en_when: 'Every year',     vi_acts: ['Trip 5-7 ngày — bạn tự budget', 'Volunteer trại trẻ/dưỡng lão', 'Sự kiện công nghệ/kinh doanh'], en_acts: ['5-7 day trip — kids budget', 'Volunteer at orphanage/elderly home', 'Tech/business event'] },
];

const PUBLISHING = [
  { vi_stage: 'Internal (gia đình)',   en_stage: 'Internal (family)', vi_when: 'Năm 1-2', en_when: 'Year 1-2', platforms: ['Demo Day gia đình', 'Group Zalo', 'Tủ sách triển lãm'] },
  { vi_stage: 'Bán công khai',         en_stage: 'Semi-public',       vi_when: 'Năm 2-3', en_when: 'Year 2-3', platforms: ['Scratch Community', 'GitHub Pages', 'YouTube unlisted'] },
  { vi_stage: 'Công khai',              en_stage: 'Public',            vi_when: 'Năm 3-4', en_when: 'Year 3-4', platforms: ['Vercel/Netlify', 'YouTube channel', 'Instagram', 'Devpost'] },
  { vi_stage: 'Chuyên nghiệp',          en_stage: 'Professional',      vi_when: 'Năm 4-5', en_when: 'Year 4-5', platforms: ['ProductHunt', 'GitHub repos', 'Personal domain', 'Coolest Projects, ISEF'] },
];

const SOFTWARE_STACK = [
  { vi_pillar: 'AI & Lập trình', en_pillar: 'AI & Coding',
    items: [
      { age: '6-7', tools: ['Bee-Bot', 'ScratchJr', 'Code-a-pillar'], vi_note: 'Code không màn hình — robot/đồ chơi', en_note: 'Screenless coding — robots/toys' },
      { age: '8-10', tools: ['Scratch', 'Code.org', 'Tynker'], vi_note: 'Kéo thả', en_note: 'Drag-drop' },
      { age: '11-13', tools: ['MIT App Inventor', 'Python (Thonny)', 'Replit Kids'], vi_note: 'Bắt đầu gõ code', en_note: 'Start typing code' },
      { age: '14-16', tools: ['VSCode', 'Claude Code (cùng bố)', 'GitHub', 'Cursor'], vi_note: 'Dev tools chuẩn', en_note: 'Pro dev tools' },
    ],
  },
  { vi_pillar: 'AI Assistant', en_pillar: 'AI Assistant',
    items: [
      { age: 'all', tools: ['Claude (qua bố)', 'Khanmigo', 'Duolingo Max'], vi_note: 'AI an toàn cho trẻ — Khanmigo và Duolingo có moderation chuẩn COPPA', en_note: 'COPPA-compliant child-safe AI' },
    ],
  },
  { vi_pillar: 'Tiếng Anh', en_pillar: 'English',
    items: [
      { age: '6-7', tools: ['Lingokids', 'CocoMelon', 'Super Simple Songs'], vi_note: 'Nghe + hát theo, không đọc viết', en_note: 'Listen + sing along, no reading/writing' },
      { age: '8-10', tools: ['Duolingo Kids', 'Khan Academy Kids', 'Lingokids'], vi_note: 'Game-based', en_note: 'Game-based' },
      { age: '11-13', tools: ['Duolingo', 'Cambridge One', 'BBC Learning English'], vi_note: 'Có cấu trúc', en_note: 'Structured' },
      { age: '14-16', tools: ['Cambridge prep', 'TED-Ed', 'YouGlish'], vi_note: 'Học thuật', en_note: 'Academic' },
    ],
  },
  { vi_pillar: 'Sáng tạo', en_pillar: 'Creative',
    items: [
      { age: 'all', tools: ['Canva for Education', 'Figma', 'CapCut'], vi_note: 'Design + video', en_note: 'Design + video' },
    ],
  },
  { vi_pillar: 'Tài chính', en_pillar: 'Finance',
    items: [
      { age: '6-7', tools: ['3 hũ trong suốt', 'Đồng xu thật'], vi_note: 'Cầm nắm tiền vật lý — chưa cần app', en_note: 'Hands-on physical money — no app yet' },
      { age: '8-10', tools: ['Sổ giấy', 'GoHenry'], vi_note: 'Vật lý trước', en_note: 'Physical first' },
      { age: '11-13', tools: ['Money Lover Kids', 'Excel/Sheets'], vi_note: 'Track tiền tiêu vặt', en_note: 'Track allowance' },
      { age: '14-16', tools: ['Vietcombank Junior', 'Investopedia sim'], vi_note: 'Đầu tư mô phỏng', en_note: 'Mock investing' },
    ],
  },
];

const ENGLISH_STAGES = [
  { stage_vi: '6-7 tuổi · Listening', stage_en: 'Age 6-7 · Listening', apps: ['Lingokids', 'Super Simple Songs', 'CocoMelon', 'Bài hát + truyện đêm bố kể bằng EN'], target_vi: '50 từ · nghe hiểu', target_en: '50 words · listening comprehension', method_vi: 'Hát theo + xem hoạt hình EN, không cần đọc viết', method_en: 'Sing-along + EN cartoons, no reading/writing yet' },
  { stage_vi: '8-10 tuổi · Foundation', stage_en: 'Age 8-10 · Foundation', apps: ['Duolingo Kids', 'Lingokids', 'Khan Academy Kids', 'Story Cards với bố'], target_vi: '200 từ · Hello-level', target_en: '200 words · Hello-level', method_vi: 'Game + storytelling, không grammar', method_en: 'Game + storytelling, no grammar' },
  { stage_vi: '11-13 tuổi · Communication', stage_en: 'Age 11-13 · Communication', apps: ['Duolingo', 'Cambridge One', 'BBC Learning English Kids', 'Speak App AI'], target_vi: '1000 từ · Cambridge Movers/Flyers', target_en: '1000 words · Cambridge Movers/Flyers', method_vi: 'Speaking-first, đọc sách thiếu nhi', method_en: 'Speaking-first, read kids books' },
  { stage_vi: '14-16 tuổi · Academic', stage_en: 'Age 14-16 · Academic', apps: ['Cambridge prep', 'TED-Ed', 'YouGlish', 'IELTS prep nhẹ'], target_vi: 'KET → PET → FCE', target_en: 'KET → PET → FCE', method_vi: 'Essay writing, listening academic', method_en: 'Essay writing, academic listening' },
];

// === DESIGN TOKENS — anime/funny pastel ===
const C = {
  bg: 'linear-gradient(135deg, #FFE5F1 0%, #E5F3FF 50%, #FFF9E5 100%)',
  paper: '#FFFFFF', soft: '#FAF7FF', cream: '#FFF9E5',
  ink: '#2D1B4E', sub: '#6B5B95', mute: '#9B8FB8',
  pink: '#FF6B9D', sky: '#4DABF7', sunny: '#FFD43B',
  mint: '#51CF66', purple: '#845EC2', coral: '#FF8787',
  gold: '#FFB800', shadow: '0 8px 24px rgba(132, 94, 194, 0.15)',
  shadowSoft: '0 4px 12px rgba(132, 94, 194, 0.08)',
  border: '#F0E6FF',
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function PanyKidsStudio() {
  const [lang, setLang] = useState('vi');
  const [activeTab, setActiveTab] = useState('overview');
  const [kids, setKids] = useState(DEFAULT_KIDS);
  const [progress, setProgress] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [streaks, setStreaks] = useState({}); // {kidId: {lastDate, count, longest, history: {date: true}}}
  const [journal, setJournal] = useState({}); // {kidId-date: {learned, hard, happy}}
  const [portfolio, setPortfolio] = useState({}); // {kidId: [{title, url, desc, date}]}
  const [weeklyTasks, setWeeklyTasks] = useState({}); // {kidId-week: [{text, done}]}
  const [unlockedBadges, setUnlockedBadges] = useState({}); // {kidId: {badgeId: dateISO}}
  const [activeKidId, setActiveKidId] = useState(null); // null = parent mode
  const [pinAttempt, setPinAttempt] = useState({ kidId: null, value: '' });
  const [parentPin, setParentPin] = useState('0000');
  const [parentLocked, setParentLocked] = useState(false);
  const [parentUnlocked, setParentUnlocked] = useState(true); // session-only, resets on reload if locked
  const [parentLoginAttempt, setParentLoginAttempt] = useState('');
  const [parentLoginError, setParentLoginError] = useState(false);
  const [expandedYear, setExpandedYear] = useState(1);
  const [editingKidId, setEditingKidId] = useState(null);
  const [editKidData, setEditKidData] = useState({ name: '', age: '', emoji: '', birthday: '', school: '', hobbies: '', goals: '', bio: '', favoriteSubject: '' });
  const [showAddKid, setShowAddKid] = useState(false);
  const [newKidName, setNewKidName] = useState('');
  const [newKidAge, setNewKidAge] = useState('');
  const [loading, setLoading] = useState(true);
  const [evalKid, setEvalKid] = useState(null);
  const [evalQuarter, setEvalQuarter] = useState(null);
  const [evalText, setEvalText] = useState('');
  const [evalRating, setEvalRating] = useState(0);
  const [confettiOn, setConfettiOn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar starts open on desktop, closed on mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);
  const [quizState, setQuizState] = useState({ kidId: null, qIdx: 0, score: 0, answered: null, pillar: null, age: null });
  const [showLogin, setShowLogin] = useState(false);

  // === New pillar states ===
  const [creativeWorks, setCreativeWorks] = useState({}); // {kidId: [{date, prompt, dataUrl}]}
  const [exerciseLog, setExerciseLog] = useState({}); // {kidId: [{date, exercise, duration, emoji}]}
  const [moodLog, setMoodLog] = useState({}); // {kidId-date: {mood, note}}
  const [riasecAnswers, setRiasecAnswers] = useState({}); // {kidId: {questionId: score}}
  const [riasecCompleted, setRiasecCompleted] = useState({}); // {kidId: {date, results}}
  const [savedCareers, setSavedCareers] = useState({}); // {kidId: [careerId]}
  const [familyJournal, setFamilyJournal] = useState([]); // [{date, author, kidId, content, type}]
  const [weeklyReviews, setWeeklyReviews] = useState({}); // {kidId-weekKey: {answers: [], date}}
  const [englishProgress, setEnglishProgress] = useState({}); // {kidId: {listen: {right, total}, speak: [{date, score, target, spoken}], read: {passageId: {score, date}}, write: [{date, score, prompt, text, feedback}]}}
  const [completedQuests, setCompletedQuests] = useState<Record<string, string[]>>({}); // {kidId: [questKey, ...]} — questKey = `${questPillar}-${dayOfWeek}-${date}`
  const [readStories, setReadStories] = useState<string[]>([]); // [storyId, ...]

  const t = (key, fallback) => (I18N[lang] && I18N[lang][key]) || fallback || key;
  const L = (vi, en) => (lang === 'vi' ? vi : en);

  // ============== STORAGE ==============
  useEffect(() => {
    const load = async () => {
      const keys = ['lang', 'kids', 'progress', 'evals', 'streaks', 'journal', 'portfolio', 'tasks', 'badges', 'parentPin', 'parentLocked', 'creativeWorks', 'exerciseLog', 'moodLog', 'riasecAnswers', 'riasecCompleted', 'savedCareers', 'familyJournal', 'weeklyReviews', 'englishProgress'];
      for (const k of keys) {
        try {
          const r = await storage.get(`pks3-${k}`);
          if (r?.value) {
            const v = JSON.parse(r.value);
            if (k === 'lang') setLang(v);
            if (k === 'kids') setKids(v);
            if (k === 'progress') setProgress(v);
            if (k === 'evals') setEvaluations(v);
            if (k === 'streaks') setStreaks(v);
            if (k === 'journal') setJournal(v);
            if (k === 'portfolio') setPortfolio(v);
            if (k === 'tasks') setWeeklyTasks(v);
            if (k === 'badges') setUnlockedBadges(v);
            if (k === 'parentPin') setParentPin(v);
            if (k === 'parentLocked') {
              setParentLocked(v);
              if (v) setParentUnlocked(false);
            }
            if (k === 'creativeWorks') setCreativeWorks(v);
            if (k === 'exerciseLog') setExerciseLog(v);
            if (k === 'moodLog') setMoodLog(v);
            if (k === 'riasecAnswers') setRiasecAnswers(v);
            if (k === 'riasecCompleted') setRiasecCompleted(v);
            if (k === 'savedCareers') setSavedCareers(v);
            if (k === 'familyJournal') setFamilyJournal(v);
            if (k === 'weeklyReviews') setWeeklyReviews(v);
            if (k === 'englishProgress') setEnglishProgress(v);
            if (k === 'completedQuests') setCompletedQuests(v);
            if (k === 'readStories') setReadStories(v);
          }
        } catch (e) {}
      }
      setLoading(false);
    };
    load();
  }, []);

  const persist = async (k, v) => { try { await storage.set(`pks3-${k}`, JSON.stringify(v)); } catch (e) {} };
  const setLangP = (v) => { setLang(v); persist('lang', v); };
  const setKidsP = (v) => { setKids(v); persist('kids', v); };
  const setProgP = (v) => { setProgress(v); persist('progress', v); };
  const setEvalsP = (v) => { setEvaluations(v); persist('evals', v); };
  const setStreaksP = (v) => { setStreaks(v); persist('streaks', v); };
  const setJournalP = (v) => { setJournal(v); persist('journal', v); };
  const setPortfolioP = (v) => { setPortfolio(v); persist('portfolio', v); };
  const setTasksP = (v) => { setWeeklyTasks(v); persist('tasks', v); };
  const setBadgesP = (v) => { setUnlockedBadges(v); persist('badges', v); };
  const setParentPinP = (v) => { setParentPin(v); persist('parentPin', v); };
  const setParentLockedP = (v) => { setParentLocked(v); persist('parentLocked', v); if (v && !activeKidId) setParentUnlocked(false); };
  const setCreativeP = (v) => { setCreativeWorks(v); persist('creativeWorks', v); };
  const setExerciseP = (v) => { setExerciseLog(v); persist('exerciseLog', v); };
  const setMoodP = (v) => { setMoodLog(v); persist('moodLog', v); };
  const setRiasecAnsP = (v) => { setRiasecAnswers(v); persist('riasecAnswers', v); };
  const setRiasecDoneP = (v) => { setRiasecCompleted(v); persist('riasecCompleted', v); };
  const setSavedCareersP = (v) => { setSavedCareers(v); persist('savedCareers', v); };
  const setFamilyJournalP = (v) => { setFamilyJournal(v); persist('familyJournal', v); };
  const setWeeklyReviewsP = (v) => { setWeeklyReviews(v); persist('weeklyReviews', v); };
  const setEnglishProgressP = (v) => { setEnglishProgress(v); persist('englishProgress', v); };
  const setCompletedQuestsP = (v) => { setCompletedQuests(v); persist('completedQuests', v); };
  const setReadStoriesP = (v) => { setReadStories(v); persist('readStories', v); };

  const tryParentLogin = (val) => {
    if (val === parentPin) {
      setParentUnlocked(true);
      setParentLoginAttempt('');
      setParentLoginError(false);
      return true;
    }
    setParentLoginError(true);
    setTimeout(() => setParentLoginError(false), 1500);
    setParentLoginAttempt('');
    return false;
  };

  // Parent has full access if (not in kid mode) AND (not locked OR unlocked)
  const isParentMode = !activeKidId;
  const isParentAuthed = isParentMode && (!parentLocked || parentUnlocked);

  // ============== HELPERS ==============
  const today = () => new Date().toISOString().slice(0, 10);
  const weekKey = (d = new Date()) => {
    const onejan = new Date(d.getFullYear(), 0, 1);
    const w = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${String(w).padStart(2, '0')}`;
  };

  const getQuarterProgress = (kid, year, qIdx) => {
    const q = YEAR_PLANS[year - 1].quarters[qIdx];
    const objs = lang === 'vi' ? q.vi_obj : q.en_obj;
    const total = objs.length;
    const done = objs.filter((_, oIdx) => progress[`${kid}-y${year}-q${qIdx}-o${oIdx}`]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };
  const getYearProgress = (kid, year) => {
    let d = 0, tot = 0;
    YEAR_PLANS[year - 1].quarters.forEach((q, qi) => {
      const objs = lang === 'vi' ? q.vi_obj : q.en_obj;
      tot += objs.length;
      objs.forEach((_, oi) => { if (progress[`${kid}-y${year}-q${qi}-o${oi}`]) d++; });
    });
    return { done: d, total: tot, pct: tot ? Math.round((d / tot) * 100) : 0 };
  };
  const getOverall = (kid) => {
    let d = 0, tot = 0;
    for (let y = 1; y <= 5; y++) { const yp = getYearProgress(kid, y); d += yp.done; tot += yp.total; }
    return { done: d, total: tot, pct: tot ? Math.round((d / tot) * 100) : 0 };
  };
  const getPillarProgress = (kid, pillar) => {
    let d = 0, tot = 0;
    YEAR_PLANS.forEach((y, yi) => {
      y.quarters.forEach((q, qi) => {
        if (q.pillar === pillar) {
          const objs = lang === 'vi' ? q.vi_obj : q.en_obj;
          tot += objs.length;
          objs.forEach((_, oi) => { if (progress[`${kid}-y${yi+1}-q${qi}-o${oi}`]) d++; });
        }
      });
    });
    return { done: d, total: tot, pct: tot ? Math.round((d / tot) * 100) : 0 };
  };

  const fireConfetti = () => { setConfettiOn(true); setTimeout(() => setConfettiOn(false), 2200); };

  // ============== ACTIONS ==============
  const toggleObjective = (kidId, year, qIdx, oIdx) => {
    const key = `${kidId}-y${year}-q${qIdx}-o${oIdx}`;
    const next = { ...progress, [key]: !progress[key] };
    setProgP(next);
    if (!progress[key]) { fireConfetti(); checkBadges(kidId, next); }
  };

  const checkInToday = (kidId) => {
    const td = today();
    const cur = streaks[kidId] || { count: 0, longest: 0, lastDate: null, history: {} };
    if (cur.history[td]) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newCount = cur.lastDate === yesterday ? cur.count + 1 : 1;
    const newLongest = Math.max(cur.longest, newCount);
    const newStreaks = { ...streaks, [kidId]: { count: newCount, longest: newLongest, lastDate: td, history: { ...cur.history, [td]: true } } };
    setStreaksP(newStreaks);
    fireConfetti();
    checkBadges(kidId, progress, newStreaks);
  };

  const checkBadges = (kidId, prog = progress, str = streaks) => {
    const cur = unlockedBadges[kidId] || {};
    const newU = { ...cur };
    let any = false;
    BADGES.forEach(b => {
      if (cur[b.id]) return;
      let unlock = false;
      const r = b.rule;
      if (r.type === 'objectives') { const c = Object.keys(prog).filter(k => k.startsWith(kidId) && prog[k]).length; if (c >= r.count) unlock = true; }
      if (r.type === 'streak') { const s = str[kidId]; if (s && s.longest >= r.count) unlock = true; }
      if (r.type === 'quarter') { const qp = getQuarterProgress(kidId, r.year, r.q); if (qp.pct === 100) unlock = true; }
      if (r.type === 'year') { const yp = getYearProgress(kidId, r.year); if (yp.pct === 100) unlock = true; }
      if (r.type === 'pillar') { const pp = getPillarProgress(kidId, r.pillar); if (pp.done >= r.count) unlock = true; }
      if (r.type === 'overall') { const op = getOverall(kidId); if (op.pct >= r.pct) unlock = true; }
      if (r.type === 'journal') { const c = Object.keys(journal).filter(k => k.startsWith(kidId)).length; if (c >= r.count) unlock = true; }
      if (r.type === 'portfolio') { const c = (portfolio[kidId] || []).length; if (c >= r.count) unlock = true; }
      if (r.type === 'all_pillars') { const ok = PILLARS.every(p => getPillarProgress(kidId, p.id).done > 0); if (ok) unlock = true; }
      if (unlock) { newU[b.id] = new Date().toISOString(); any = true; }
    });
    if (any) { setBadgesP({ ...unlockedBadges, [kidId]: newU }); fireConfetti(); }
  };

  const startEditKid = (kid) => {
    setEditingKidId(kid.id);
    setEditKidData({
      name: kid.name || '',
      age: String(kid.age || ''),
      emoji: kid.emoji || '🌟',
      birthday: kid.birthday || '',
      school: kid.school || '',
      hobbies: kid.hobbies || '',
      goals: kid.goals || '',
      bio: kid.bio || '',
      favoriteSubject: kid.favoriteSubject || '',
    });
  };
  const saveEditKid = () => {
    setKidsP(kids.map(k => k.id === editingKidId ? {
      ...k,
      name: editKidData.name || k.name,
      age: parseInt(editKidData.age) || k.age,
      emoji: editKidData.emoji || k.emoji,
      birthday: editKidData.birthday,
      school: editKidData.school,
      hobbies: editKidData.hobbies,
      goals: editKidData.goals,
      bio: editKidData.bio,
      favoriteSubject: editKidData.favoriteSubject,
    } : k));
    setEditingKidId(null);
  };
  const addNewKid = () => {
    if (!newKidName.trim()) return;
    const colors = ['#FF6B9D', '#4DABF7', '#51CF66', '#845EC2', '#FFD43B', '#FF8787'];
    const emojis = ['🌟', '🚀', '🎨', '🐯', '🦄', '🎯'];
    const i = kids.length;
    setKidsP([...kids, { id: `kid_${Date.now()}`, name: newKidName, age: parseInt(newKidAge) || 10, color: colors[i % 6], emoji: emojis[i % 6], pin: '0000' }]);
    setNewKidName(''); setNewKidAge(''); setShowAddKid(false);
  };
  const removeKid = (id) => { if (kids.length > 1) setKidsP(kids.filter(k => k.id !== id)); };

  const openEval = (kidId, year, qIdx) => {
    const ek = `${kidId}-y${year}-q${qIdx}`;
    setEvalKid(kidId); setEvalQuarter({ year, qIdx });
    setEvalText(evaluations[ek]?.notes || ''); setEvalRating(evaluations[ek]?.rating || 0);
  };
  const saveEval = () => {
    const ek = `${evalKid}-y${evalQuarter.year}-q${evalQuarter.qIdx}`;
    setEvalsP({ ...evaluations, [ek]: { notes: evalText, rating: evalRating, savedAt: new Date().toISOString() } });
    setEvalKid(null); setEvalQuarter(null);
  };

  const saveJournal = (kidId, fields) => {
    const k = `${kidId}-${today()}`;
    const newJ = { ...journal, [k]: { ...fields, savedAt: new Date().toISOString() } };
    setJournalP(newJ);
    fireConfetti();
    checkBadges(kidId);
  };

  const addPortfolioItem = (kidId, item) => {
    const list = portfolio[kidId] || [];
    setPortfolioP({ ...portfolio, [kidId]: [...list, { ...item, date: today() }] });
    fireConfetti();
    checkBadges(kidId);
  };

  const tryLogin = (kidId, pin) => {
    const k = kids.find(x => x.id === kidId);
    if (k && k.pin === pin) { setActiveKidId(kidId); setShowLogin(false); setPinAttempt({ kidId: null, value: '' }); return true; }
    return false;
  };

  // ============== EXPORT (Tier 2) ==============
  const exportReport = () => {
    let report = `# ${t('appTitle')} — ${t('report')}\n\n`;
    report += `Date: ${today()}\nLanguage: ${lang.toUpperCase()}\n\n`;
    kids.forEach(k => {
      const ov = getOverall(k.id);
      report += `## ${k.emoji} ${k.name} (${k.age}y)\n`;
      report += `- ${t('progress')}: ${ov.pct}% (${ov.done}/${ov.total})\n`;
      const s = streaks[k.id];
      if (s) report += `- ${t('streak')}: ${s.count} ${t('days')} (longest ${s.longest})\n`;
      const bd = Object.keys(unlockedBadges[k.id] || {}).length;
      report += `- ${t('totalBadges')}: ${bd}/${BADGES.length}\n`;
      PILLARS.forEach(p => { const pp = getPillarProgress(k.id, p.id); if (pp.total) report += `  - ${L(p.vi, p.en)}: ${pp.pct}%\n`; });
      report += `\n`;
    });
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `pany-kids-report-${today()}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportData = () => {
    const data = { lang, kids, progress, evaluations, streaks, journal, portfolio, weeklyTasks, unlockedBadges };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `pany-kids-backup-${today()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const ok = window.confirm(
          lang === 'vi'
            ? `Sẽ ghi đè dữ liệu hiện tại bằng:\n- ${data.kids?.length || 0} học viên\n- ${Object.keys(data.progress || {}).length} progress entries\n- ${Object.keys(data.journal || {}).length} journal entries\n\nTiếp tục?`
            : `Will overwrite current data with:\n- ${data.kids?.length || 0} students\n- ${Object.keys(data.progress || {}).length} progress entries\n- ${Object.keys(data.journal || {}).length} journal entries\n\nContinue?`
        );
        if (!ok) return;
        if (data.lang) setLangP(data.lang);
        if (data.kids) setKidsP(data.kids);
        if (data.progress) setProgP(data.progress);
        if (data.evaluations) setEvalsP(data.evaluations);
        if (data.streaks) setStreaksP(data.streaks);
        if (data.journal) setJournalP(data.journal);
        if (data.portfolio) setPortfolioP(data.portfolio);
        if (data.weeklyTasks) setTasksP(data.weeklyTasks);
        if (data.unlockedBadges) setBadgesP(data.unlockedBadges);
        alert(lang === 'vi' ? '✅ Import thành công! Reload trang nhé.' : '✅ Import successful! Reload the page.');
      } catch (err) {
        alert(lang === 'vi' ? '❌ File không hợp lệ.' : '❌ Invalid file.');
      }
    };
    reader.readAsText(file);
  };

  if (loading) return <LoadingScreen t={t} />;

  // ============== RENDER ==============
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: '"Quicksand", system-ui, sans-serif', color: C.ink }}>
      <GlobalStyles />
      {confettiOn && <ConfettiBurst />}

      <Header lang={lang} setLang={setLangP} t={t} kids={kids} activeKidId={activeKidId} setActiveKidId={setActiveKidId} setShowLogin={setShowLogin} parentLocked={parentLocked} parentUnlocked={parentUnlocked} setParentUnlocked={setParentUnlocked} L={L} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} L={L} />
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} t={t} />

      <main style={{ maxWidth: 1400, padding: '20px 16px 80px', marginLeft: sidebarOpen ? 240 : 0, transition: 'margin-left 0.25s ease-out' }} className="main-content">
        {/* D-035: Overview tab = Tree of Knowledge home + Family Forest (parent mode) */}
        {activeTab === 'overview'    && (() => {
          const currentKid = activeKidId ? kids.find((k: any) => k.id === activeKidId) : null;
          return (
            <>
              <TreeOfKnowledgeHome
                onNavigate={(tabId: string) => setActiveTab(tabId)}
                lang={lang}
              >
                <HeroGreeting
                  variant="hero"
                  mode={currentKid ? 'kid' : 'parent'}
                  displayName={currentKid ? currentKid.name : 'bố Bình'}
                  subtitle="Chạm vào điểm sáng trên cây để bắt đầu khám phá"
                />
              </TreeOfKnowledgeHome>
              {isParentMode && kids && kids.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <FamilyForest
                    kids={kids.map((k: any): FamilyKid => ({
                      id: String(k.id),
                      name: String(k.name ?? 'Con'),
                      age: Number(k.age ?? 5),
                      level: Math.round((getOverall(k) ?? 0)),
                      streakDays: streaks?.[k.id]?.count ?? 0,
                      photoDataUrl: k.photoDataUrl,
                    }))}
                    onSelectKid={(kid) => setActiveKidId(kid.id)}
                    onUpdateKidPhoto={(kidId, photoDataUrl) => {
                      const updated = kids.map((k: any) => k.id === kidId ? { ...k, photoDataUrl } : k);
                      setKidsP(updated);
                    }}
                    subtitle={`${kids.length} cây phát triển · Bố/mẹ là tia nắng — chạm 📷 để gắn ảnh thật của con`}
                  />
                </div>
              )}
            </>
          );
        })()}
        {activeTab === 'roadmap'     && <RoadmapTab      kids={kids} progress={progress} toggleObjective={toggleObjective} expandedYear={expandedYear} setExpandedYear={setExpandedYear} openEval={openEval} getQuarterProgress={getQuarterProgress} t={t} L={L} lang={lang} />}
        {activeTab === 'calendar'    && <CalendarTab     kids={kids} weeklyTasks={weeklyTasks} setTasksP={setTasksP} streaks={streaks} checkInToday={checkInToday} t={t} L={L} />}
        {activeTab === 'skilltree'   && <SkillTreeTab    kids={kids} getPillarProgress={getPillarProgress} t={t} L={L} />}
        {activeTab === 'career'      && <CareerTab       t={t} L={L} kids={kids} getPillarProgress={getPillarProgress} />}
        {activeTab === 'kids'        && <KidsTab         kids={kids} editingKidId={editingKidId} setEditingKidId={setEditingKidId} editKidData={editKidData} setEditKidData={setEditKidData} startEditKid={startEditKid} saveEditKid={saveEditKid} addNewKid={addNewKid} showAddKid={showAddKid} setShowAddKid={setShowAddKid} newKidName={newKidName} setNewKidName={setNewKidName} newKidAge={newKidAge} setNewKidAge={setNewKidAge} removeKid={removeKid} getYearProgress={getYearProgress} evaluations={evaluations} streaks={streaks} unlockedBadges={unlockedBadges} t={t} L={L} setKidsP={setKidsP} activeKidId={activeKidId} isParentAuthed={isParentAuthed} />}
        {activeTab === 'badges'      && <BadgesTab       kids={kids} unlockedBadges={unlockedBadges} t={t} L={L} />}
        {activeTab === 'journal'     && <JournalTab      kids={kids} journal={journal} saveJournal={saveJournal} t={t} L={L} activeKidId={activeKidId} isParentAuthed={isParentAuthed} />}
        {activeTab === 'portfolio'   && <PortfolioTab    kids={kids} portfolio={portfolio} addPortfolioItem={addPortfolioItem} setPortfolioP={setPortfolioP} t={t} L={L} activeKidId={activeKidId} isParentAuthed={isParentAuthed} />}
        {activeTab === 'leaderboard' && <LeaderboardTab  kids={kids} getOverall={getOverall} streaks={streaks} unlockedBadges={unlockedBadges} t={t} L={L} />}
        {activeTab === 'hardware'    && <HardwareTab     t={t} L={L} />}
        {activeTab === 'software'    && <SoftwareTab     t={t} L={L} />}
        {activeTab === 'english'     && <EnglishTab      t={t} L={L} />}
        {activeTab === 'finance'     && <FinanceTab      t={t} L={L} />}
        {activeTab === 'thinking'    && <ThinkingTab     t={t} L={L} />}
        {activeTab === 'rewards'     && <RewardsTab      t={t} L={L} />}
        {activeTab === 'experiences' && <ExperiencesTab  t={t} L={L} kids={kids} lang={lang} />}
        {activeTab === 'publish'     && <PublishTab      t={t} L={L} />}
        {activeTab === 'library'     && <LibraryTab      readStories={readStories} setReadStoriesP={setReadStoriesP} t={t} L={L} />}
        {activeTab === 'aisearch'    && <AISearchTab     lang={lang} L={L} />}
        {activeTab === 'quiz'        && <QuizTab         kids={kids} quizState={quizState} setQuizState={setQuizState} t={t} L={L} lang={lang} />}
        {activeTab === 'report'      && <ReportTab       kids={kids} getOverall={getOverall} streaks={streaks} unlockedBadges={unlockedBadges} getPillarProgress={getPillarProgress} exportReport={exportReport} exportData={exportData} t={t} L={L} />}
        {activeTab === 'settings'    && <SettingsTab     lang={lang} setLangP={setLangP} exportData={exportData} importData={importData} t={t} L={L} parentPin={parentPin} setParentPinP={setParentPinP} parentLocked={parentLocked} setParentLockedP={setParentLockedP} />}
        {activeTab === 'creative'    && <StudioCreativeTab kids={kids} creativeWorks={creativeWorks} setCreativeP={setCreativeP} activeKidId={activeKidId} t={t} L={L} lang={lang} />}
        {activeTab === 'movement'    && <BodyMovementTab   kids={kids} exerciseLog={exerciseLog} setExerciseP={setExerciseP} activeKidId={activeKidId} t={t} L={L} lang={lang} />}
        {activeTab === 'discovery'   && <SelfDiscoveryTab  kids={kids} moodLog={moodLog} setMoodP={setMoodP} riasecAnswers={riasecAnswers} setRiasecAnsP={setRiasecAnsP} riasecCompleted={riasecCompleted} setRiasecDoneP={setRiasecDoneP} activeKidId={activeKidId} t={t} L={L} lang={lang} fireConfetti={fireConfetti} />}
        {activeTab === 'career-v2'   && <CareerCompassTab  kids={kids} savedCareers={savedCareers} setSavedCareersP={setSavedCareersP} riasecCompleted={riasecCompleted} activeKidId={activeKidId} t={t} L={L} lang={lang} />}
        {activeTab === 'family'      && <FamilyBridgeTab    kids={kids} familyJournal={familyJournal} setFamilyJournalP={setFamilyJournalP} weeklyReviews={weeklyReviews} setWeeklyReviewsP={setWeeklyReviewsP} activeKidId={activeKidId} isParentAuthed={isParentAuthed} t={t} L={L} lang={lang} weekKey={weekKey} />}
        {activeTab === 'english-skills' && <EnglishSkillsTab kids={kids} englishProgress={englishProgress} setEnglishProgressP={setEnglishProgressP} activeKidId={activeKidId} t={t} L={L} lang={lang} />}
      </main>

      {evalKid && evalQuarter && (
        <EvalModal evalKid={evalKid} evalQuarter={evalQuarter} evalText={evalText} setEvalText={setEvalText} evalRating={evalRating} setEvalRating={setEvalRating} saveEval={saveEval} setEvalKid={setEvalKid} setEvalQuarter={setEvalQuarter} kids={kids} t={t} L={L} />
      )}

      {showLogin && <LoginModal kids={kids} pinAttempt={pinAttempt} setPinAttempt={setPinAttempt} tryLogin={tryLogin} setShowLogin={setShowLogin} setActiveKidId={setActiveKidId} t={t} L={L} parentLocked={parentLocked} parentUnlocked={parentUnlocked} tryParentLogin={tryParentLogin} parentLoginAttempt={parentLoginAttempt} setParentLoginAttempt={setParentLoginAttempt} parentLoginError={parentLoginError} />}

      {(() => {
        const chatKid = kids.find(k => k.id === activeKidId) || kids[0];
        return (
          <ChatBot
            ctx={{
              kidId: chatKid?.id,
              kidName: chatKid?.name,
              kidAge: chatKid?.age,
              lang,
              currentTab: activeTab,
              overallPct: chatKid ? getOverall(chatKid.id).pct : 0,
              streakDays: (chatKid && streaks[chatKid.id]?.count) || 0,
            }}
          />
        );
      })()}

      <Footer t={t} />
    </div>
  );
}

// ============================================================
// PRESENTATION COMPONENTS
// ============================================================

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; }
      .display { font-family: 'Fredoka', system-ui, sans-serif; }
      .body-f { font-family: 'Quicksand', system-ui, sans-serif; }
      .hand { font-family: 'Caveat', cursive; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pop { 0% { transform: scale(0.8); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes wiggle { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
      @keyframes confetti-fall { 0% { transform: translateY(-100vh) rotate(0); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,157,0.4); } 50% { box-shadow: 0 0 0 12px rgba(255,107,157,0); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      .fade-in { animation: fadeIn 0.4s ease-out; }
      .pop-in { animation: pop 0.4s ease-out; }
      .float-anim { animation: float 3s ease-in-out infinite; }
      .wiggle:hover { animation: wiggle 0.4s ease-in-out; }
      .glow { animation: pulse-glow 2s infinite; }
      .tab-btn { transition: all 0.2s; }
      .tab-btn:hover { transform: translateY(-2px); }
      .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
      .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(132,94,194,0.18); }
      .btn-bounce:hover { transform: scale(1.05); }
      .btn-bounce:active { transform: scale(0.95); }
      .btn-bounce { transition: transform 0.15s; }
      .badge-glow { background: linear-gradient(120deg, #FFD43B, #FF6B9D, #845EC2, #4DABF7, #51CF66, #FFD43B); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
      input, textarea, select { font-family: inherit; }
      .scrollx::-webkit-scrollbar { height: 6px; }
      .scrollx::-webkit-scrollbar-thumb { background: #FFD1E8; border-radius: 3px; }
      .scrolly::-webkit-scrollbar { width: 6px; }
      .scrolly::-webkit-scrollbar-thumb { background: #FFD1E8; border-radius: 3px; }
      @media (max-width: 1023px) {
        .main-content { margin-left: 0 !important; padding: 12px 12px 80px !important; }
        .sidebar-nav { width: 82vw !important; max-width: 280px; }
        .mobile-tab-bar { display: block !important; }
        .sidebar-toggle { display: flex !important; }
      }
      @media (min-width: 1024px) {
        .sidebar-close-btn { display: none; }
        .mobile-tab-bar { display: none !important; }
      }
      @media (max-width: 1023px) {
        .header-sidebar-toggle { display: none !important; }
      }
      .anime-bg { background-image: radial-gradient(circle at 20% 20%, rgba(255,107,157,0.06) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(77,171,247,0.06) 0, transparent 40%); }
    `}</style>
  );
}

function ConfettiBurst() {
  const items = ['🎉', '⭐', '✨', '🌟', '💖', '🎊', '🎈', '🦄', '🌈', '🎯'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${Math.random() * 100}%`, top: '-40px',
          fontSize: 20 + Math.random() * 16,
          animation: `confetti-fall ${1.5 + Math.random() * 1.2}s ease-in forwards`,
          animationDelay: `${Math.random() * 0.4}s`,
        }}>{items[i % items.length]}</div>
      ))}
    </div>
  );
}

function LoadingScreen({ t }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Quicksand, sans-serif' }}>
      <div style={{ textAlign: 'center', color: C.purple }}>
        <div style={{ fontSize: 64, marginBottom: 16 }} className="float-anim">🌸</div>
        <div className="display" style={{ fontSize: 24, fontWeight: 700 }}>{t('loading')}</div>
      </div>
    </div>
  );
}

function Header({ lang, setLang, t, kids, activeKidId, setActiveKidId, setShowLogin, parentLocked, parentUnlocked, setParentUnlocked, L, sidebarOpen, setSidebarOpen }) {
  const activeKid = kids.find(k => k.id === activeKidId);
  return (
    <header style={{
      background: 'linear-gradient(135deg, #FF6B9D 0%, #845EC2 50%, #4DABF7 100%)',
      color: '#fff', padding: '24px 32px 28px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -20, right: 40, fontSize: 80, opacity: 0.15 }} className="float-anim">🌸</div>
      <div style={{ position: 'absolute', bottom: -30, left: 60, fontSize: 90, opacity: 0.12 }}>⭐</div>
      <div style={{ position: 'absolute', top: 30, right: 200, fontSize: 50, opacity: 0.18 }} className="float-anim">🎈</div>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            className="header-sidebar-toggle"
            style={{
              background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none',
              width: 40, height: 40, borderRadius: 12, cursor: 'pointer',
              fontSize: 18, fontWeight: 700, display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              backdropFilter: 'blur(8px)',
            }}
          >☰</button>
          <div>
            <div className="hand" style={{ color: '#FFE5F1', fontSize: 22, marginBottom: -4 }}>{t('estLine')}</div>
          <h1 className="display" style={{ fontSize: 44, margin: '4px 0', fontWeight: 700, letterSpacing: -0.5, lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            🌸 Pany Kids <em style={{ color: '#FFD43B', fontStyle: 'normal' }}>Studio</em> ✨
          </h1>
          <div className="body-f" style={{ color: '#FFE5F1', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 8, fontWeight: 600 }}>
            {t('appSubtitle')}
          </div>
          {/* D-035 Tree of Knowledge — dynamic VN greeting (time-of-day + user mode) */}
          <div style={{ marginTop: 12 }}>
            <HeroGreeting
              variant="inline"
              mode={activeKid ? 'kid' : 'parent'}
              displayName={activeKid ? activeKid.name : 'bố Bình'}
            />
          </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Language toggle */}
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: 4, display: 'flex', gap: 2, backdropFilter: 'blur(8px)' }}>
            {['vi', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} className="btn-bounce body-f" style={{
                background: lang === l ? '#fff' : 'transparent', color: lang === l ? C.purple : '#fff',
                border: 'none', padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
              }}>{l === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</button>
            ))}
          </div>

          {/* User mode badge */}
          {activeKid ? (
            <button onClick={() => setActiveKidId(null)} className="btn-bounce body-f" style={{
              background: '#fff', color: activeKid.color, border: 'none', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 18 }}>{activeKid.emoji}</span> {activeKid.name}
              <Unlock size={14} />
            </button>
          ) : parentLocked && !parentUnlocked ? (
            <button onClick={() => setShowLogin(true)} className="btn-bounce body-f glow" style={{
              background: '#FFD43B', color: C.ink, border: 'none', padding: '8px 14px', borderRadius: 999,
              cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Lock size={14} /> {L('Đăng nhập Bố/Mẹ', 'Login Bố/Mẹ')}
            </button>
          ) : (
            <>
              <button onClick={() => parentLocked ? setParentUnlocked(false) : null} className="body-f btn-bounce" style={{
                background: 'rgba(255,255,255,0.25)', color: '#fff', padding: '8px 14px', borderRadius: 999,
                fontSize: 12, fontWeight: 700, backdropFilter: 'blur(8px)', border: 'none',
                cursor: parentLocked ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 6,
              }} title={parentLocked ? L('Click để khoá', 'Click to lock') : ''}>
                👨‍👩‍👧 {t('parentMode')} {parentLocked && <Unlock size={12} />}
              </button>
              <button onClick={() => setShowLogin(true)} className="btn-bounce body-f" style={{
                background: '#FFD43B', color: C.ink, border: 'none', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Lock size={12} /> {t('kidMode')}
              </button>
            </>
          )}

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 14px', borderRadius: 12, textAlign: 'center', backdropFilter: 'blur(8px)' }}>
            <div className="display" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{kids.length}</div>
            <div className="body-f" style={{ fontSize: 10, opacity: 0.9, letterSpacing: 1 }}>{t('students')}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Mobile-only horizontal scrollable tab bar (shown < 1024px via CSS)
function MobileTabBar({ activeTab, setActiveTab, t }) {
  const tabs = [
    { id: 'overview',    label: t('overview'),    em: '🏠' },
    { id: 'roadmap',     label: t('roadmap'),     em: '🗺️' },
    { id: 'calendar',    label: t('calendar'),    em: '📅' },
    { id: 'skilltree',   label: t('skillTree'),   em: '🌳' },
    { id: 'career',      label: t('career'),      em: '💼' },
    { id: 'kids',        label: t('kidsTab'),     em: '👥' },
    { id: 'badges',      label: t('badges'),      em: '🏆' },
    { id: 'journal',     label: t('journal'),     em: '📓' },
    { id: 'portfolio',   label: t('portfolio'),   em: '🖼️' },
    { id: 'leaderboard', label: t('leaderboard'), em: '📊' },
    { id: 'hardware',    label: t('hardware'),    em: '💻' },
    { id: 'software',    label: t('software'),    em: '🤖' },
    { id: 'english',     label: t('english'),     em: '🌍' },
    { id: 'english-skills', label: t('englishSkills'), em: '🎓' },
    { id: 'finance',     label: t('finance'),     em: '💰' },
    { id: 'thinking',    label: t('thinking'),    em: '🧠' },
    { id: 'creative',    label: t('studioCreative'), em: '🎨' },
    { id: 'movement',    label: t('bodyMovement'),   em: '🤸' },
    { id: 'discovery',   label: t('selfDiscovery'),  em: '🔮' },
    { id: 'career-v2',   label: t('careerCompass'),  em: '🧭' },
    { id: 'family',      label: t('familyBridge'),   em: '👨‍👩‍👧' },
    { id: 'rewards',     label: t('rewards'),     em: '🎁' },
    { id: 'experiences', label: t('experiences'), em: '🌳' },
    { id: 'publish',     label: t('publish'),     em: '📤' },
    { id: 'library',     label: t('library'),     em: '📚' },
    { id: 'aisearch',    label: t('aiSearch'),    em: '🔍' },
    { id: 'quiz',        label: t('quiz'),        em: '🧩' },
    { id: 'report',      label: t('report'),      em: '📋' },
    { id: 'settings',    label: t('settings'),    em: '⚙️' },
  ];
  return (
    <nav className="scrollx mobile-tab-bar" style={{
      background: '#fff', borderBottom: `1px solid ${C.border}`,
      position: 'sticky', top: 0, zIndex: 18, display: 'none',
      boxShadow: '0 2px 6px rgba(132,94,194,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '8px 12px', WebkitOverflowScrolling: 'touch' }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="body-f"
              style={{
                background: active ? `linear-gradient(135deg, ${C.pink}, ${C.purple})` : 'transparent',
                color: active ? '#fff' : C.sub,
                border: 'none', padding: '8px 12px', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
                whiteSpace: 'nowrap', borderRadius: 999, flexShrink: 0,
                boxShadow: active ? `0 3px 8px ${C.pink}40` : 'none',
              }}
            >
              <span style={{ fontSize: 14 }}>{tab.em}</span> {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function TabNav({ activeTab, setActiveTab, t, sidebarOpen, setSidebarOpen, L }) {
  const tabGroups = [
    { vi: 'Tổng quan', en: 'Overview', items: [
      { id: 'overview',    label: t('overview'),    em: '🏠' },
      { id: 'roadmap',     label: t('roadmap'),     em: '🗺️' },
      { id: 'calendar',    label: t('calendar'),    em: '📅' },
      { id: 'skilltree',   label: t('skillTree'),   em: '🌳' },
      { id: 'career',      label: t('career'),      em: '💼' },
    ]},
    { vi: 'Học viên', en: 'Students', items: [
      { id: 'kids',        label: t('kidsTab'),     em: '👥' },
      { id: 'badges',      label: t('badges'),      em: '🏆' },
      { id: 'journal',     label: t('journal'),     em: '📓' },
      { id: 'portfolio',   label: t('portfolio'),   em: '🖼️' },
      { id: 'leaderboard', label: t('leaderboard'), em: '📊' },
    ]},
    { vi: 'Khám phá', en: 'Explore', items: [
      { id: 'library',     label: t('library'),     em: '📚' },
      { id: 'aisearch',    label: t('aiSearch'),    em: '🔍' },
      { id: 'quiz',        label: t('quiz'),        em: '🧩' },
    ]},
    { vi: 'Công cụ học', en: 'Learning', items: [
      { id: 'hardware',    label: t('hardware'),    em: '💻' },
      { id: 'software',    label: t('software'),    em: '🤖' },
      { id: 'english',     label: t('english'),     em: '🌍' },
      { id: 'english-skills', label: t('englishSkills'), em: '🎓' },
      { id: 'finance',     label: t('finance'),     em: '💰' },
      { id: 'thinking',    label: t('thinking'),    em: '🧠' },
    ]},
    { vi: 'Phát triển', en: 'Development', items: [
      { id: 'creative',    label: t('studioCreative'), em: '🎨' },
      { id: 'movement',    label: t('bodyMovement'),   em: '🤸' },
      { id: 'discovery',   label: t('selfDiscovery'),  em: '🔮' },
      { id: 'career-v2',   label: t('careerCompass'),  em: '🧭' },
      { id: 'family',      label: t('familyBridge'),   em: '👨‍👩‍👧' },
    ]},
    { vi: 'Hoạt động', en: 'Activities', items: [
      { id: 'rewards',     label: t('rewards'),     em: '🎁' },
      { id: 'experiences', label: t('experiences'), em: '🌳' },
      { id: 'publish',     label: t('publish'),     em: '📤' },
    ]},
    { vi: 'Hệ thống', en: 'System', items: [
      { id: 'report',      label: t('report'),      em: '📋' },
      { id: 'settings',    label: t('settings'),    em: '⚙️' },
    ]},
  ];

  return (
    <>
      {/* Mobile toggle button */}
      {/* Floating ☰ button removed — only Header toggle on desktop, mobile uses MobileTabBar */}

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(45,27,78,0.4)',
            backdropFilter: 'blur(4px)', zIndex: 29,
          }}
          className="sidebar-overlay"
        />
      )}

      <nav
        className="scrolly sidebar-nav"
        style={{
          background: '#fff', borderRight: `2px solid ${C.border}`,
          width: 240, height: '100vh', overflowY: 'auto',
          position: 'fixed', top: 0, left: sidebarOpen ? 0 : -260,
          zIndex: 30, boxShadow: sidebarOpen ? '4px 0 20px rgba(132,94,194,0.15)' : 'none',
          padding: '20px 0 80px', transition: 'left 0.25s ease-out',
        }}
      >
        {/* Sidebar header */}
        <div style={{ padding: '0 18px 16px', borderBottom: `1px dashed ${C.border}`, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="display" style={{ fontSize: 16, fontWeight: 700, color: C.purple, lineHeight: 1.1 }}>🌸 Pany Kids</div>
            <div className="hand" style={{ fontSize: 14, color: C.pink, marginTop: 2 }}>v3.1 Studio</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            style={{ background: C.soft, border: 'none', padding: 6, borderRadius: 8, cursor: 'pointer' }}
            className="sidebar-close-btn"
          >✕</button>
        </div>

        {tabGroups.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 16 }}>
            <div className="body-f" style={{ fontSize: 10, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1.5, padding: '0 22px 6px' }}>
              {L(group.vi, group.en)}
            </div>
            {group.items.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className="tab-btn body-f"
                  style={{
                    width: 'calc(100% - 12px)',
                    background: active ? `linear-gradient(135deg, ${C.pink}, ${C.purple})` : 'transparent',
                    color: active ? '#fff' : C.ink,
                    border: 'none', padding: '10px 14px', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                    borderRadius: 12, margin: '2px 6px',
                    boxShadow: active ? `0 4px 10px ${C.pink}40` : 'none',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{tab.em}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ textAlign: 'center', padding: '40px 20px 24px', color: C.mute }}>
      <div className="hand" style={{ fontSize: 22, color: C.purple, marginBottom: 4 }}>made with 💖 by bố Bình</div>
      <div className="body-f" style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Pany Kids Studio · v3 · 2026—2031</div>
    </footer>
  );
}

function SectionHeader({ title, subtitle, emoji }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 className="display" style={{ fontSize: 36, fontWeight: 700, margin: 0, color: C.ink, display: 'flex', alignItems: 'center', gap: 12 }}>
        {emoji && <span style={{ fontSize: 40 }} className="float-anim">{emoji}</span>}
        {title}
      </h2>
      {subtitle && <div className="hand" style={{ fontSize: 22, color: C.purple, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

function Card({ children, accent, padding = 24, style = {} }) {
  return (
    <div className="card-hover" style={{
      background: '#fff', borderRadius: 20, padding,
      border: `2px solid ${accent || C.border}`, boxShadow: C.shadowSoft, ...style,
    }}>{children}</div>
  );
}

function Pill({ children, color = C.pink, bg }) {
  return <span className="body-f" style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, background: bg || `${color}20`,
    color, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
  }}>{children}</span>;
}

function ProgressBar({ pct, color = C.pink, height = 8, animated = true }) {
  return (
    <div style={{ height, background: '#F3E8FF', borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: height / 2, transition: animated ? 'width 0.6s ease-out' : 'none',
      }} />
    </div>
  );
}

function Btn({ children, onClick, color = C.pink, variant = 'solid', size = 'md', icon: Icon, disabled, style = {} }) {
  const sizes = { sm: { p: '6px 12px', fs: 11 }, md: { p: '10px 16px', fs: 13 }, lg: { p: '14px 22px', fs: 15 } };
  const s = sizes[size];
  const solid = { background: `linear-gradient(135deg, ${color}, ${color}dd)`, color: '#fff', boxShadow: `0 4px 12px ${color}40` };
  const outline = { background: '#fff', color, border: `2px solid ${color}` };
  const ghost = { background: 'transparent', color };
  const v = variant === 'solid' ? solid : variant === 'outline' ? outline : ghost;
  return (
    <button onClick={onClick} disabled={disabled} className="btn-bounce body-f" style={{
      ...v, border: variant === 'outline' ? `2px solid ${color}` : 'none', padding: s.p, borderRadius: 999,
      cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: s.fs, opacity: disabled ? 0.5 : 1,
      display: 'inline-flex', alignItems: 'center', gap: 6, ...style,
    }}>
      {Icon && <Icon size={s.fs + 2} />} {children}
    </button>
  );
}

function StatCard({ emoji, label, value, color = C.pink, sub }) {
  return (
    <div className="card-hover" style={{
      background: `linear-gradient(135deg, #fff, ${color}10)`, borderRadius: 20, padding: 20,
      border: `2px solid ${color}30`, boxShadow: C.shadowSoft,
    }}>
      <div style={{ fontSize: 32, marginBottom: 6 }}>{emoji}</div>
      <div className="display" style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div className="body-f" style={{ fontSize: 11, color: C.sub, fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</div>
      {sub && <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ============================================================
// TAB COMPONENTS
// ============================================================

function OverviewTab({ kids, getOverall, getYearProgress, getPillarProgress, streaks, unlockedBadges, completedQuests, setCompletedQuestsP, t, L }) {
  const totalDone = kids.reduce((s, k) => s + getOverall(k.id).done, 0);
  const totalAll = kids.reduce((s, k) => s + getOverall(k.id).total, 0);
  const avg = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;
  const top = kids.slice().sort((a, b) => getOverall(b.id).pct - getOverall(a.id).pct)[0];
  const longestStreak = kids.reduce((m, k) => Math.max(m, streaks[k.id]?.longest || 0), 0);
  const totalBadges = kids.reduce((s, k) => s + Object.keys(unlockedBadges[k.id] || {}).length, 0);

  // Quest hôm nay — pick 1 quest per kid by age + current day-of-week
  const today = new Date();
  const dayOfWeek = today.getDay() || 7; // 1=Mon ... 7=Sun
  const dailyQuests = useMemo(() => {
    return kids.map(k => {
      const pool = getQuestsForDay(k.age, dayOfWeek);
      // Stable per-kid-per-day: hash kid.id + date for deterministic pick
      const seed = (k.id + today.toISOString().slice(0, 10)).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      const quest = pool[seed % pool.length] || null;
      return { kid: k, quest };
    });
  }, [kids, dayOfWeek]);

  return (
    <div className="fade-in anime-bg">
      <SectionHeader title={t('overview')} subtitle={L('Một bức tranh tổng thể', 'A bird\'s-eye view')} emoji="🏠" />

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard emoji="📊" label={t('avgProgress')} value={`${avg}%`} color={C.pink} sub={`${totalDone}/${totalAll} ${t('completed').toLowerCase()}`} />
        <StatCard emoji={top?.emoji || '⭐'} label={t('topPerformer')} value={top?.name || '-'} color={C.purple} sub={top ? `${getOverall(top.id).pct}%` : ''} />
        <StatCard emoji="🔥" label={t('longestStreak')} value={`${longestStreak}`} color={C.coral} sub={t('days')} />
        <StatCard emoji="🏆" label={t('totalBadges')} value={`${totalBadges}/${BADGES.length * kids.length}`} color={C.sunny} />
      </div>

      {/* QUEST HÔM NAY — daily quest per kid */}
      <Card style={{ marginBottom: 24, background: 'linear-gradient(135deg, #FFF4D1 0%, #FFE5E5 100%)', border: `2px solid ${C.gold}` }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
          🎯 {L('Quest hôm nay', 'Today\'s Quest')}
        </h3>
        <div className="body-f" style={{ fontSize: 12, color: C.sub, marginBottom: 16 }}>
          {L(`${ALL_QUESTS.length}+ quest tự động đổi mỗi ngày · từ 12 trụ cột`, `${ALL_QUESTS.length}+ quests auto-rotate daily · across 12 pillars`)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {dailyQuests.map(({ kid, quest }) => {
            if (!quest) {
              return (
                <Card key={kid.id} accent={kid.color} padding={14}>
                  <div className="display" style={{ fontWeight: 700 }}>{kid.emoji} {kid.name}</div>
                  <div className="body-f" style={{ fontSize: 12, color: C.mute, fontStyle: 'italic', marginTop: 8 }}>
                    {L('Chưa có quest hôm nay', 'No quest today')}
                  </div>
                </Card>
              );
            }
            const questKey = `${quest.pillar}-${dayOfWeek}-${today.toISOString().slice(0, 10)}`;
            const kidQuests = completedQuests[kid.id] || [];
            const isDone = kidQuests.includes(questKey);
            const toggleQuest = () => {
              const updated = { ...completedQuests };
              if (isDone) {
                updated[kid.id] = kidQuests.filter(q => q !== questKey);
              } else {
                updated[kid.id] = [...kidQuests, questKey];
              }
              setCompletedQuestsP(updated);
            };
            const pillarColor = PILLARS.find(p => p.id === quest.pillar)?.color || C.purple;
            return (
              <Card key={kid.id} accent={kid.color} padding={14} style={isDone ? { opacity: 0.7, background: '#F0FFF0' } : {}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 28 }}>{kid.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div className="display" style={{ fontSize: 15, fontWeight: 700 }}>{kid.name}</div>
                    <div className="body-f" style={{ fontSize: 10, color: C.mute }}>
                      {kid.age <= 6 ? L('Mầm non K', 'Kindergarten K') : kid.age <= 11 ? L('Tiểu học P', 'Primary P') : L('Cấp 2 T', 'Secondary T')}
                    </div>
                  </div>
                  <div style={{ fontSize: 28 }}>{isDone ? '✅' : quest.emoji}</div>
                </div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                  <Pill color={pillarColor}>{quest.pillar}</Pill>
                  <Pill color={C.purple}>{quest.estMin} {L('phút', 'min')}</Pill>
                  {quest.needsParent && <Pill color={C.coral}>👨‍👩 {L('Cần bố mẹ', 'Needs parent')}</Pill>}
                  {isDone && <Pill color={C.mint}>✅ {L('Đã xong', 'Done')}</Pill>}
                </div>
                <div className="display" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, textDecoration: isDone ? 'line-through' : 'none' }}>
                  {L(quest.vi.title, quest.en.title)}
                </div>
                <div className="body-f" style={{ fontSize: 12, color: C.sub, lineHeight: 1.5, marginBottom: 8 }}>
                  {L(quest.vi.desc, quest.en.desc)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="hand" style={{ fontSize: 13, color: C.mint, fontWeight: 700 }}>
                    🎁 {L(quest.vi.reward, quest.en.reward)}
                  </div>
                  <button onClick={toggleQuest} className="btn-bounce" style={{ background: isDone ? C.mute : C.mint, color: '#fff', border: 'none', borderRadius: 999, padding: '6px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
                    {isDone ? L('↩ Hoàn tác', '↩ Undo') : L('✅ Hoàn thành!', '✅ Done!')}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Per-kid cards with mini radar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 32 }}>
        {kids.map(kid => {
          const ov = getOverall(kid.id);
          const radarData = PILLARS.map(p => ({ ...p, pct: getPillarProgress(kid.id, p.id).pct }));
          return (
            <Card key={kid.id} accent={kid.color} padding={22}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ fontSize: 44 }} className="float-anim">{kid.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{kid.name}</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.sub, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{kid.age} {L('tuổi', 'years old')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="display" style={{ fontSize: 28, fontWeight: 700, color: kid.color, lineHeight: 1 }}>{ov.pct}%</div>
                  <div className="body-f" style={{ fontSize: 10, color: C.mute }}>{ov.done}/{ov.total}</div>
                </div>
              </div>
              <ProgressBar pct={ov.pct} color={kid.color} height={10} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: 12, background: C.soft, borderRadius: 12, fontSize: 11 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 18, fontWeight: 700, color: C.coral }}>🔥 {streaks[kid.id]?.count || 0}</div>
                  <div className="body-f" style={{ color: C.sub, fontSize: 10 }}>{t('streak')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 18, fontWeight: 700, color: C.sunny }}>🏆 {Object.keys(unlockedBadges[kid.id] || {}).length}</div>
                  <div className="body-f" style={{ color: C.sub, fontSize: 10 }}>{t('badges')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 18, fontWeight: 700, color: kid.color }}>📅 {YEAR_PLANS.filter((_, i) => getYearProgress(kid.id, i + 1).pct > 0).length}</div>
                  <div className="body-f" style={{ color: C.sub, fontSize: 10 }}>{L('năm hoạt động', 'active years')}</div>
                </div>
              </div>
              {/* Pillar mini-bars */}
              <div style={{ marginTop: 14 }}>
                {radarData.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div className="body-f" style={{ fontSize: 10, color: C.sub, width: 100, fontWeight: 600 }}>{L(p.vi, p.en)}</div>
                    <div style={{ flex: 1 }}><ProgressBar pct={p.pct} color={p.color} height={5} /></div>
                    <div className="body-f" style={{ fontSize: 10, color: p.color, fontWeight: 700, width: 32, textAlign: 'right' }}>{p.pct}%</div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Radar chart */}
      <Card style={{ marginBottom: 24 }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={22} color={C.purple} /> {t('pillarRadar')}
        </h3>
        <RadarChart kids={kids} getPillarProgress={getPillarProgress} L={L} />
      </Card>

      {/* 7 Pillars */}
      <div style={{ background: 'linear-gradient(135deg, #845EC2 0%, #FF6B9D 100%)', color: '#fff', padding: 28, borderRadius: 24, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 120, opacity: 0.1 }}>✨</div>
        <h3 className="display" style={{ fontSize: 24, marginTop: 0, marginBottom: 18, color: '#FFD43B', fontWeight: 700, position: 'relative' }}>{t('sevenPillars')}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, position: 'relative' }}>
          {PILLARS.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="card-hover" style={{ background: 'rgba(255,255,255,0.15)', padding: 16, borderRadius: 16, border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <Icon size={24} style={{ color: '#fff', marginBottom: 8 }} />
                <div className="display" style={{ fontSize: 14, fontWeight: 700 }}>{L(p.vi, p.en)}</div>
              </div>
            );
          })}
          <div style={{ background: 'rgba(255,212,59,0.25)', padding: 16, borderRadius: 16, border: '1px solid rgba(255,212,59,0.4)' }}>
            <Award size={24} style={{ color: '#FFD43B', marginBottom: 8 }} />
            <div className="display" style={{ fontSize: 14, fontWeight: 700 }}>{L('Phần thưởng', 'Rewards')}</div>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <Card>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>💖 {t('coreValues')}</h3>
        <p className="body-f" style={{ fontSize: 14, lineHeight: 1.7, color: C.sub, marginBottom: 18 }}>{t('philosophy')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { icon: '🤝', vi: 'Đồng hành', en: 'Together', vd: 'Bố ngồi cùng, không thả tự AI', ed: 'Dad sits along, no solo-AI' },
            { icon: '🛠️', vi: 'Build thật', en: 'Build real', vd: 'Sản phẩm cuối có người dùng', ed: 'Final product has real users' },
            { icon: '🌏', vi: 'Song ngữ', en: 'Bilingual', vd: 'Tiếng Anh là môi trường', ed: 'English as environment' },
            { icon: '💰', vi: 'Giá trị thật', en: 'Real value', vd: 'Học qua kinh doanh nhỏ', ed: 'Learn via small business' },
            { icon: '🧠', vi: 'Hỏi trước, tra sau', en: 'Think first', vd: '3 lần thử trước khi dùng AI', ed: 'Try 3 times before AI' },
            { icon: '📓', vi: 'Ghi chép tay', en: 'Write by hand', vd: 'Notebook giấy luôn đi cùng laptop', ed: 'Paper notebook + laptop' },
          ].map((p, i) => (
            <div key={i} className="card-hover" style={{ padding: 16, background: C.soft, borderRadius: 16, borderLeft: `4px solid ${C.pink}` }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{p.icon}</div>
              <div className="display" style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{L(p.vi, p.en)}</div>
              <div className="body-f" style={{ fontSize: 12, color: C.sub }}>{L(p.vd, p.ed)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RadarChart({ kids, getPillarProgress, L }) {
  const cx = 200, cy = 200, R = 140;
  const n = PILLARS.length;
  const ang = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const ringPoints = (r) => PILLARS.map((_, i) => `${cx + Math.cos(ang(i)) * r},${cy + Math.sin(ang(i)) * r}`).join(' ');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
      <svg width={420} height={420} viewBox="0 0 400 400">
        {[0.25, 0.5, 0.75, 1].map(f => (
          <polygon key={f} points={ringPoints(R * f)} fill="none" stroke="#F0E6FF" strokeWidth={1} />
        ))}
        {PILLARS.map((p, i) => (
          <line key={p.id} x1={cx} y1={cy} x2={cx + Math.cos(ang(i)) * R} y2={cy + Math.sin(ang(i)) * R} stroke="#F0E6FF" strokeWidth={1} />
        ))}
        {kids.map((kid, ki) => {
          const pts = PILLARS.map((p, i) => {
            const v = getPillarProgress(kid.id, p.id).pct / 100;
            return `${cx + Math.cos(ang(i)) * R * v},${cy + Math.sin(ang(i)) * R * v}`;
          }).join(' ');
          return <polygon key={kid.id} points={pts} fill={`${kid.color}33`} stroke={kid.color} strokeWidth={2} />;
        })}
        {PILLARS.map((p, i) => (
          <text key={p.id} x={cx + Math.cos(ang(i)) * (R + 22)} y={cy + Math.sin(ang(i)) * (R + 22)}
            textAnchor="middle" alignmentBaseline="middle" fontSize="11" fontWeight="700" fill={p.color} fontFamily="Quicksand">
            {L(p.vi, p.en)}
          </text>
        ))}
      </svg>
      <div>
        {kids.map(kid => (
          <div key={kid.id} className="body-f" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
            <div style={{ width: 14, height: 14, background: kid.color, borderRadius: 4 }} />
            <span style={{ fontSize: 18 }}>{kid.emoji}</span> {kid.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapTab({ kids, progress, toggleObjective, expandedYear, setExpandedYear, openEval, getQuarterProgress, t, L, lang }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('roadmap')} subtitle={L('5 năm · 20 quý · 60+ mục tiêu', '5 years · 20 quarters · 60+ goals')} emoji="🗺️" />

      {YEAR_PLANS.map(year => {
        const open = expandedYear === year.year;
        return (
          <div key={year.year} style={{ marginBottom: 16 }}>
            <button onClick={() => setExpandedYear(open ? null : year.year)} className="card-hover btn-bounce" style={{
              width: '100%', padding: 22, background: open ? `linear-gradient(135deg, ${C.pink}, ${C.purple})` : '#fff',
              color: open ? '#fff' : C.ink, border: `2px solid ${open ? 'transparent' : C.border}`,
              cursor: 'pointer', borderRadius: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: C.shadowSoft, fontFamily: 'Quicksand', textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 44 }} className={open ? 'wiggle' : 'float-anim'}>{year.emoji}</div>
                <div>
                  <div className="hand" style={{ fontSize: 18, color: open ? '#FFD43B' : C.purple, marginBottom: -2 }}>{L(year.vi_subtitle, year.en_subtitle)}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700 }}>{L(year.vi_title, year.en_title)}</div>
                  <div className="body-f" style={{ fontSize: 12, opacity: 0.85, marginTop: 4, fontWeight: 600 }}>{year.age_focus} {L('tuổi', 'years')}</div>
                </div>
              </div>
              {open ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
            </button>

            {open && (
              <div style={{ padding: 24, background: C.soft, borderRadius: 20, marginTop: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
                  {year.quarters.map((q, qIdx) => {
                    const pillar = PILLARS.find(p => p.id === q.pillar);
                    return (
                      <Card key={qIdx} accent={pillar?.color} padding={20}>
                        <div className="hand" style={{ color: pillar?.color || C.purple, fontSize: 16 }}>{L(`Tuần ${q.weeks}`, `Week ${q.weeks}`)}</div>
                        <h4 className="display" style={{ fontSize: 18, fontWeight: 700, margin: '4px 0 12px' }}>{L(q.vi_name, q.en_name)}</h4>
                        {pillar && <Pill color={pillar.color}>{pillar.icon && <pillar.icon size={11} />} {L(pillar.vi, pillar.en)}</Pill>}

                        <div style={{ marginTop: 14, marginBottom: 14 }}>
                          <div className="body-f" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: C.mute, marginBottom: 8 }}>{t('objectives')}</div>
                          {(lang === 'vi' ? q.vi_obj : q.en_obj).map((obj, oIdx) => (
                            <div key={oIdx} style={{ marginBottom: 8 }}>
                              <div className="body-f" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 4, color: C.ink }}>• {obj}</div>
                              <div style={{ display: 'flex', gap: 6, marginLeft: 12, flexWrap: 'wrap' }}>
                                {kids.map(kid => {
                                  const ck = progress[`${kid.id}-y${year.year}-q${qIdx}-o${oIdx}`];
                                  return (
                                    <button key={kid.id} onClick={() => toggleObjective(kid.id, year.year, qIdx, oIdx)} className="btn-bounce" style={{
                                      background: ck ? kid.color : 'transparent', color: ck ? '#fff' : kid.color,
                                      border: `2px solid ${kid.color}`, padding: '4px 10px', borderRadius: 999,
                                      fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                                    }}>{ck && <Check size={11} />} {kid.emoji}</button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ paddingTop: 12, borderTop: `1px dashed ${C.border}` }}>
                          <div className="body-f" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: C.mute, marginBottom: 8 }}>{t('skills')}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {q.skills.map(s => <Pill key={s} color={C.purple} bg="#F3E8FF">{s}</Pill>)}
                          </div>
                        </div>

                        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {kids.map(kid => (
                            <button key={kid.id} onClick={() => openEval(kid.id, year.year, qIdx)} className="btn-bounce body-f" style={{
                              background: '#fff', border: `1.5px solid ${kid.color}`, color: kid.color,
                              padding: '4px 10px', borderRadius: 999, fontSize: 10, cursor: 'pointer', fontWeight: 700,
                              display: 'flex', alignItems: 'center', gap: 4,
                            }}><Edit3 size={10} /> {kid.emoji} {t('evaluate')}</button>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SkillTreeTab({ kids, getPillarProgress, t, L }) {
  const [selectedKid, setSelectedKid] = React.useState(kids[0]?.id);
  const kid = kids.find(k => k.id === selectedKid);

  return (
    <div className="fade-in">
      <SectionHeader title={t('skillTree')} subtitle={L('Cây kỹ năng theo 6 trụ cột', 'Skill tree across 6 pillars')} emoji="🌳" />

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}><span style={{ fontSize: 20 }}>{k.emoji}</span> {k.name}</button>
        ))}
      </div>

      {kid && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20 }}>
          {PILLARS.map(p => {
            const Icon = p.icon;
            const pp = getPillarProgress(kid.id, p.id);
            const allQuarters = [];
            YEAR_PLANS.forEach((y, yi) => {
              y.quarters.forEach((q, qi) => {
                if (q.pillar === p.id) allQuarters.push({ year: yi + 1, qi, q });
              });
            });
            return (
              <Card key={p.id} accent={p.color}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${p.color}55` }}>
                    <Icon size={26} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="display" style={{ fontSize: 18, fontWeight: 700, color: p.color }}>{L(p.vi, p.en)}</div>
                    <div className="body-f" style={{ fontSize: 12, color: C.sub }}>{pp.done}/{pp.total} {t('completed').toLowerCase()}</div>
                  </div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700, color: p.color }}>{pp.pct}%</div>
                </div>
                <ProgressBar pct={pp.pct} color={p.color} height={10} />

                {/* Tree */}
                <div style={{ marginTop: 16 }}>
                  {allQuarters.map(({ year, qi, q }, idx) => {
                    const objs = L(q.vi_obj, q.en_obj);
                    const doneCount = objs.filter((_, oi) => false).length; // visual only
                    const isLast = idx === allQuarters.length - 1;
                    const yearEmoji = YEAR_PLANS[year - 1].emoji;
                    return (
                      <div key={`${year}-${qi}`} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', fontWeight: 700, boxShadow: `0 2px 6px ${p.color}55` }}>
                            {yearEmoji}
                          </div>
                          {!isLast && <div style={{ width: 2, flex: 1, background: `${p.color}40`, minHeight: 24, marginTop: 2 }} />}
                        </div>
                        <div style={{ flex: 1, paddingBottom: 14 }}>
                          <div className="hand" style={{ fontSize: 15, color: p.color }}>{L(`Năm ${year}`, `Year ${year}`)} · {L(`Tuần ${q.weeks}`, `Week ${q.weeks}`)}</div>
                          <div className="display" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{L(q.vi_name, q.en_name)}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {q.skills.map(s => <Pill key={s} color={p.color}>{s}</Pill>)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CareerTab({ t, L, kids, getPillarProgress }) {
  const [selectedKid, setSelectedKid] = React.useState(kids[0]?.id);
  const [expandedCareer, setExpandedCareer] = React.useState(null);
  const kid = kids.find(k => k.id === selectedKid);

  // Suggest careers based on pillar strengths
  const suggested = useMemo(() => {
    if (!kid) return [];
    const scores = CAREER_PATHS.map(c => {
      const score = c.pillars.reduce((s, p) => s + getPillarProgress(kid.id, p).pct, 0) / c.pillars.length;
      return { ...c, score };
    });
    return scores.sort((a, b) => b.score - a.score);
  }, [selectedKid, kids]);

  return (
    <div className="fade-in">
      <SectionHeader title={t('career')} subtitle={t('careerExplore')} emoji="💼" />

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}><span style={{ fontSize: 20 }}>{k.emoji}</span> {k.name}</button>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FFD43B, #FF8787)', color: '#fff', padding: 20, borderRadius: 20, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 100, opacity: 0.2 }}>💫</div>
        <div className="hand" style={{ fontSize: 22, marginBottom: 4 }}>{L('Đề xuất cho', 'Suggested for')} {kid?.name}</div>
        <div className="display" style={{ fontSize: 16, fontWeight: 700 }}>
          {L('Dựa trên tiến độ 6 trụ cột — không phải đặt vào hộp, chỉ là hướng phù hợp', 'Based on 6-pillar progress — not pigeonholing, just matching directions')}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 18 }}>
        {suggested.map((c, idx) => {
          const Icon = c.icon;
          const expanded = expandedCareer === c.id;
          return (
            <Card key={c.id} accent={c.color}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 48 }} className="float-anim">{c.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                    {idx < 3 && <Pill color={C.gold} bg="#FFF4D1">⭐ #{idx + 1} {L('phù hợp', 'match')}</Pill>}
                  </div>
                  <div className="display" style={{ fontSize: 18, fontWeight: 700, color: c.color }}>{L(c.vi, c.en)}</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>{Math.round(c.score)}% {L('phù hợp', 'match')}</div>
                </div>
                <Icon size={28} color={c.color} />
              </div>
              <ProgressBar pct={c.score} color={c.color} height={6} />

              <p className="body-f" style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, marginTop: 14, marginBottom: 12 }}>{L(c.vi_desc, c.en_desc)}</p>

              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                {c.pillars.map(pid => {
                  const p = PILLARS.find(x => x.id === pid);
                  return p ? <Pill key={pid} color={p.color}>{L(p.vi, p.en)}</Pill> : null;
                })}
              </div>

              <Btn onClick={() => setExpandedCareer(expanded ? null : c.id)} color={c.color} variant="outline" size="sm" style={{ width: '100%' }}>
                {expanded ? L('Thu gọn', 'Collapse') : L('Xem lộ trình', 'View path')}
              </Btn>

              {expanded && (
                <div className="pop-in" style={{ marginTop: 12, padding: 14, background: C.soft, borderRadius: 14 }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.mute, marginBottom: 6 }}>{L('Lộ trình', 'Path')}</div>
                  <div className="body-f" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{L(c.vi_path, c.en_path)}</div>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.mute, marginBottom: 6 }}>{L('Thu nhập', 'Salary range')}</div>
                  <div className="body-f" style={{ fontSize: 13, color: C.mint, fontWeight: 600 }}>💰 {L(c.vi_salary, c.en_salary)}</div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function KidsTab({ kids, editingKidId, setEditingKidId, editKidData, setEditKidData, startEditKid, saveEditKid, addNewKid, showAddKid, setShowAddKid, newKidName, setNewKidName, newKidAge, setNewKidAge, removeKid, getYearProgress, evaluations, streaks, unlockedBadges, t, L, setKidsP, activeKidId, isParentAuthed }) {
  const [editingPin, setEditingPin] = React.useState(null);
  const [pinValue, setPinValue] = React.useState('');
  const [pinHintValue, setPinHintValue] = React.useState('');
  const startEditPin = (kid) => { setEditingPin(kid.id); setPinValue(kid.pin); setPinHintValue(kid.pinHint || ''); };
  // Privacy: kid in kid-mode can only edit own profile; parent can edit all
  const canEdit = (kidId) => isParentAuthed || activeKidId === kidId;

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <SectionHeader title={t('kidsTab')} subtitle={L('Quản lý học viên · PIN cá nhân', 'Manage students · Personal PIN')} emoji="👥" />
        {isParentAuthed && <Btn onClick={() => setShowAddKid(true)} color={C.pink} icon={Plus}>{t('addStudent')}</Btn>}
      </div>

      {!isParentAuthed && (
        <div style={{ background: '#FFF4D1', borderRadius: 12, padding: 12, marginBottom: 16, border: '2px dashed #FFB800' }}>
          <div className="body-f" style={{ fontSize: 12, color: '#9B6800', fontWeight: 700 }}>
            🔒 {L('Em đang ở mode học viên — chỉ sửa được hồ sơ của chính em. Bố/mẹ vào mode parent để edit tất cả.', 'Student mode — you can only edit your own profile. Switch to parent mode to edit all.')}
          </div>
        </div>
      )}

      {showAddKid && (
        <Card accent={C.pink} style={{ marginBottom: 20, background: '#FFE5F1' }}>
          <h4 className="display" style={{ fontSize: 18, marginTop: 0 }}>🌸 {t('addNewStudent')}</h4>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input placeholder={t('name')} value={newKidName} onChange={e => setNewKidName(e.target.value)}
              style={{ padding: '10px 14px', border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, flex: '1 1 200px', outline: 'none' }} />
            <input placeholder={t('age')} type="number" value={newKidAge} onChange={e => setNewKidAge(e.target.value)}
              style={{ padding: '10px 14px', border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, width: 100, outline: 'none' }} />
            <Btn onClick={addNewKid} color={C.mint} icon={Save}>{t('save')}</Btn>
            <Btn onClick={() => setShowAddKid(false)} color={C.mute} variant="outline">{t('cancel')}</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {kids.map(kid => (
          <Card key={kid.id} accent={kid.color}>
            {editingKidId === kid.id ? (
              <div className="pop-in">
                <h4 className="display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 14px', color: kid.color }}>✏️ {t('editProfile')}</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', gap: 8, marginBottom: 10 }}>
                  <div>
                    <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>{t('name')}</label>
                    <input value={editKidData.name} onChange={e => setEditKidData({ ...editKidData, name: e.target.value })}
                      style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, width: '100%', outline: 'none' }} />
                  </div>
                  <div>
                    <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>{t('age')}</label>
                    <input value={editKidData.age} type="number" min={6} max={16} onChange={e => setEditKidData({ ...editKidData, age: e.target.value })}
                      style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, width: '100%', outline: 'none' }} />
                  </div>
                  <div>
                    <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>{t('avatar')}</label>
                    <input value={editKidData.emoji} onChange={e => setEditKidData({ ...editKidData, emoji: e.target.value })}
                      style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 18, width: '100%', textAlign: 'center', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>🎂 {t('birthday')}</label>
                  <input type="date" value={editKidData.birthday} onChange={e => setEditKidData({ ...editKidData, birthday: e.target.value })}
                    style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, width: '100%', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>🏫 {t('school')}</label>
                  <input value={editKidData.school} onChange={e => setEditKidData({ ...editKidData, school: e.target.value })}
                    placeholder={L('VD: Tiểu học Lê Lợi', 'e.g. Lincoln Elementary')}
                    style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, width: '100%', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>📚 {t('favoriteSubject')}</label>
                  <input value={editKidData.favoriteSubject} onChange={e => setEditKidData({ ...editKidData, favoriteSubject: e.target.value })}
                    placeholder={L('VD: Toán, Tiếng Anh, Vẽ...', 'e.g. Math, English, Art...')}
                    style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, width: '100%', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>🎨 {t('hobbies')}</label>
                  <textarea value={editKidData.hobbies} onChange={e => setEditKidData({ ...editKidData, hobbies: e.target.value })}
                    placeholder={L('VD: vẽ, đọc sách, chơi piano...', 'e.g. drawing, reading, piano...')}
                    style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, width: '100%', minHeight: 50, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>🎯 {t('goals')}</label>
                  <textarea value={editKidData.goals} onChange={e => setEditKidData({ ...editKidData, goals: e.target.value })}
                    placeholder={L('Năm nay em muốn đạt...', 'This year I want to...')}
                    style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, width: '100%', minHeight: 50, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, display: 'block', marginBottom: 4 }}>💬 {t('bio')}</label>
                  <textarea value={editKidData.bio} onChange={e => setEditKidData({ ...editKidData, bio: e.target.value })}
                    placeholder={L('Em là ai? Em thích gì?', 'Who are you? What do you love?')}
                    style={{ padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, width: '100%', minHeight: 50, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn onClick={saveEditKid} color={C.mint} icon={Save} style={{ flex: 1, justifyContent: 'center' }}>{t('save')}</Btn>
                  <Btn onClick={() => setEditingKidId(null)} color={C.mute} variant="outline">{t('cancel')}</Btn>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 56 }} className="float-anim">{kid.emoji}</div>
                    <div>
                      <div className="display" style={{ fontSize: 24, fontWeight: 700 }}>{kid.name}</div>
                      <div className="body-f" style={{ fontSize: 12, color: C.sub, fontWeight: 600 }}>{kid.age} {L('tuổi', 'years old')}</div>
                      <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 2 }}>🔐 PIN: ••••{kid.pinHint ? ` · 💭 ${kid.pinHint}` : ''}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {canEdit(kid.id) && (
                      <>
                        <button onClick={() => startEditKid(kid)} className="btn-bounce body-f" style={{ background: C.soft, border: 'none', padding: '8px 12px', borderRadius: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: C.purple }} title={L('Sửa hồ sơ', 'Edit profile')}>
                          <Edit3 size={14} /> {L('Hồ sơ', 'Profile')}
                        </button>
                        <button onClick={() => startEditPin(kid)} className="btn-bounce body-f" style={{ background: '#FFF4D1', border: 'none', padding: '8px 12px', borderRadius: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#9B6800' }} title={L('Đổi mật mã 4 số', 'Change 4-digit passcode')}>
                          <Lock size={14} /> {L('Đổi mật mã', 'Change PIN')}
                        </button>
                      </>
                    )}
                    {!canEdit(kid.id) && (
                      <div title={L('Chỉ bố/mẹ hoặc chính bạn đó mới sửa được', 'Only parent or this student can edit')} style={{ background: '#F0E6FF', border: 'none', padding: 8, borderRadius: 12, opacity: 0.5 }}>
                        <Lock size={16} color={C.mute} />
                      </div>
                    )}
                    {isParentAuthed && kids.length > 1 && (
                      <button onClick={() => removeKid(kid.id)} className="btn-bounce" style={{ background: '#FFE5E5', border: 'none', padding: 8, borderRadius: 12, cursor: 'pointer' }} title={L('Xoá học viên (chỉ bố/mẹ)', 'Remove student (parent only)')}><X size={16} color={C.coral} /></button>
                    )}
                  </div>
                </div>

                {editingPin === kid.id && (
                  <div className="pop-in" style={{ marginBottom: 16, padding: 16, background: '#FFF4D1', borderRadius: 14, border: `2px solid ${C.gold}` }}>
                    <h4 className="display" style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: '#9B6800' }}>🔒 {L('Đổi mật mã', 'Change passcode')}</h4>
                    <div className="body-f" style={{ fontSize: 12, color: '#9B6800', marginBottom: 12, lineHeight: 1.5 }}>
                      {L('Mật mã 4 chữ số. Đặt số con dễ nhớ. Có thể ghi gợi ý bên dưới (chỉ con thấy).', '4-digit passcode. Pick numbers easy to remember. Add a private hint below.')}
                    </div>

                    <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: '#9B6800', display: 'block', marginBottom: 4 }}>
                      🔢 {L('Mật mã mới (4 số)', 'New passcode (4 digits)')}
                    </label>
                    <input type="text" maxLength={4} value={pinValue} autoFocus
                      onChange={e => setPinValue(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••" style={{ width: '100%', padding: 12, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 22, fontWeight: 700, letterSpacing: 12, textAlign: 'center', outline: 'none', marginBottom: 12 }} />

                    <label className="body-f" style={{ fontSize: 11, fontWeight: 700, color: '#9B6800', display: 'block', marginBottom: 4 }}>
                      💭 {L('Gợi ý cho con (tuỳ chọn)', 'Hint for yourself (optional)')}
                    </label>
                    <input type="text" maxLength={50} value={pinHintValue}
                      onChange={e => setPinHintValue(e.target.value)}
                      placeholder={L('VD: Ngày sinh con thêm 1', 'e.g. Birthday plus 1')}
                      style={{ width: '100%', padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, outline: 'none', marginBottom: 12 }} />

                    <div style={{ display: 'flex', gap: 6 }}>
                      <Btn
                        onClick={() => {
                          if (pinValue.length !== 4) {
                            alert(L('Mật mã phải đủ 4 số.', 'Passcode must be 4 digits.'));
                            return;
                          }
                          setKidsP(kids.map(k => k.id === kid.id ? { ...k, pin: pinValue, pinHint: pinHintValue } : k));
                          setEditingPin(null);
                        }}
                        color={C.mint} size="sm" icon={Save} style={{ flex: 1, justifyContent: 'center' }}
                      >{L('Lưu mật mã mới', 'Save new passcode')}</Btn>
                      <Btn onClick={() => setEditingPin(null)} color={C.mute} variant="outline" size="sm">{t('cancel')}</Btn>
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                  <div style={{ textAlign: 'center', padding: 10, background: '#FFE5E5', borderRadius: 12 }}>
                    <div className="display" style={{ fontSize: 22, fontWeight: 700, color: C.coral }}>🔥 {streaks[kid.id]?.count || 0}</div>
                    <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('streak')}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 10, background: '#FFF4D1', borderRadius: 12 }}>
                    <div className="display" style={{ fontSize: 22, fontWeight: 700, color: C.gold }}>🏆 {Object.keys(unlockedBadges[kid.id] || {}).length}</div>
                    <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('badges')}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 10, background: '#E5F3FF', borderRadius: 12 }}>
                    <div className="display" style={{ fontSize: 22, fontWeight: 700, color: C.sky }}>⭐ {Object.keys(evaluations).filter(k => k.startsWith(kid.id)).length}</div>
                    <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('evaluate')}</div>
                  </div>
                </div>

                {(kid.school || kid.favoriteSubject || kid.hobbies || kid.goals || kid.bio || kid.birthday) && (
                  <div style={{ marginBottom: 16, padding: 14, background: C.soft, borderRadius: 14, borderLeft: `4px solid ${kid.color}` }}>
                    <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.mute, marginBottom: 8 }}>👤 {t('profileLabel')}</div>
                    {kid.birthday && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>🎂 {t('birthday')}:</strong> {kid.birthday}</div>}
                    {kid.school && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>🏫 {t('school')}:</strong> {kid.school}</div>}
                    {kid.favoriteSubject && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>📚 {t('favoriteSubject')}:</strong> {kid.favoriteSubject}</div>}
                    {kid.hobbies && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>🎨 {t('hobbies')}:</strong> {kid.hobbies}</div>}
                    {kid.goals && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>🎯 {t('goals')}:</strong> {kid.goals}</div>}
                    {kid.bio && <div className="body-f" style={{ fontSize: 12, fontStyle: 'italic', color: C.sub, marginTop: 6 }}>"{kid.bio}"</div>}
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.mute, marginBottom: 10 }}>{L('Tiến độ từng năm', 'Progress per year')}</div>
                  {YEAR_PLANS.map(y => {
                    const yp = getYearProgress(kid.id, y.year);
                    return (
                      <div key={y.year} style={{ marginBottom: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                          <span className="body-f" style={{ fontWeight: 600 }}>{y.emoji} {L('Năm', 'Year')} {y.year}</span>
                          <span className="display" style={{ color: kid.color, fontWeight: 700 }}>{yp.pct}%</span>
                        </div>
                        <ProgressBar pct={yp.pct} color={kid.color} height={6} />
                      </div>
                    );
                  })}
                </div>

                <div style={{ paddingTop: 14, borderTop: `1px dashed ${C.border}` }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.mute, marginBottom: 8 }}>{L('Đánh giá gần nhất', 'Recent reviews')}</div>
                  {Object.entries(evaluations).filter(([k]) => k.startsWith(kid.id)).slice(-3).map(([k, v]) => {
                    const parts = k.split('-');
                    return (
                      <div key={k} className="body-f" style={{ fontSize: 12, marginBottom: 6, padding: 10, background: C.soft, borderRadius: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 700 }}>{parts[1]} {parts[2]}</span>
                          <span style={{ color: C.gold }}>{'★'.repeat(v.rating)}{'☆'.repeat(5 - v.rating)}</span>
                        </div>
                        {v.notes && <div style={{ color: C.sub, marginTop: 4, fontSize: 11 }}>{v.notes}</div>}
                      </div>
                    );
                  })}
                  {Object.keys(evaluations).filter(k => k.startsWith(kid.id)).length === 0 && (
                    <div className="body-f" style={{ fontSize: 12, color: C.mute, fontStyle: 'italic' }}>{t('noEvalYet')}</div>
                  )}
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function LibraryTab({ readStories, setReadStoriesP, t, L }) {
  const [filterPillar, setFilterPillar] = React.useState(null);
  const [filterAge, setFilterAge] = React.useState(null);
  const [filterType, setFilterType] = React.useState(null);

  // Bilingual stories state
  const [storyLevel, setStoryLevel] = React.useState<CEFRLevel | null>(null);
  const [openStory, setOpenStory] = React.useState<Story | null>(null);
  const visibleStories = storyLevel ? getStoriesByLevel(storyLevel) : ALL_STORIES;

  // Q&A state
  const [qnaTopic, setQnaTopic] = React.useState<QnATopic | null>(null);
  const [openQnA, setOpenQnA] = React.useState<CareerQnA | null>(null);
  const visibleQnA = qnaTopic ? getQnAByTopic(qnaTopic) : SEED_QNA;
  const qnaStats = React.useMemo(() => getQnAStats(), []);
  const topicLabels: Record<QnATopic, [string, string]> = {
    'choosing-major': ['Chọn ngành', 'Choosing major'],
    'career-exploration': ['Khám phá nghề', 'Career exploration'],
    'early-interests': ['Sở thích sớm', 'Early interests'],
    'parenting-style': ['Nuôi dạy', 'Parenting style'],
    'riasec-self-discovery': ['RIASEC', 'RIASEC'],
    'major-to-career-pivot': ['Chuyển nghề', 'Pivot'],
    'resilience-failure': ['Vượt thất bại', 'Resilience'],
    'money-business-early': ['Tiền & KD sớm', 'Money & biz'],
    'screen-time-tech': ['Màn hình & tech', 'Screen & tech'],
    'social-emotional': ['Cảm xúc & XH', 'Social-emotional'],
    'study-habits': ['Thói quen học', 'Study habits'],
    'family-communication': ['Giao tiếp GD', 'Family comm.'],
  };

  const filtered = CURATED_RESOURCES.filter(r =>
    (!filterPillar || r.pillar === filterPillar) &&
    (!filterAge || (filterAge >= r.age_min && filterAge <= r.age_max)) &&
    (!filterType || r.type === filterType)
  );

  const pillarColors = { tech: C.sky, english: C.pink, finance: C.mint, thinking: C.purple, business: C.sunny, life: C.coral };
  const typeEmojis = { video: '🎬', article: '📰', tool: '🛠️', game: '🎮', book: '📖', course: '🎓', channel: '📺' };

  return (
    <div className="fade-in">
      <SectionHeader title={t('library')} subtitle={t('resourceLib')} emoji="📚" />

      {/* BILINGUAL STORIES — new section */}
      <Card style={{ marginBottom: 24, background: 'linear-gradient(135deg, #E5FAEB 0%, #F0E6FF 100%)', border: `2px solid ${C.mint}` }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
          📖 {L('Truyện song ngữ', 'Bilingual Stories')}
        </h3>
        <div className="body-f" style={{ fontSize: 12, color: C.sub, marginBottom: 14 }}>
          {L(`${ALL_STORIES.length} truyện VN ↔ EN · từ mầm non đến cấp 2`, `${ALL_STORIES.length} stories VN ↔ EN · kindergarten to secondary`)}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          <button onClick={() => setStoryLevel(null)} className="btn-bounce body-f" style={{ background: !storyLevel ? C.ink : '#fff', color: !storyLevel ? '#fff' : C.ink, border: `2px solid ${C.ink}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{L('Tất cả', 'All')}</button>
          {(['K', 'A1', 'A2', 'B1'] as const).map(lv => (
            <button key={lv} onClick={() => setStoryLevel(lv)} className="btn-bounce body-f" style={{ background: storyLevel === lv ? C.mint : '#fff', color: storyLevel === lv ? '#fff' : C.mint, border: `2px solid ${C.mint}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{lv === 'K' ? L('K · Mầm non', 'K · Kindergarten') : lv === 'A1' ? L('A1 · 7-8t', 'A1 · 7-8y') : lv === 'A2' ? L('A2 · 9-11t', 'A2 · 9-11y') : L('B1 · 12-15t', 'B1 · 12-15y')}</button>
          ))}
        </div>
        <div className="body-f" style={{ fontSize: 12, color: C.mint, fontWeight: 700, marginBottom: 8 }}>
          📖 {L(`Đã đọc ${readStories.filter(id => visibleStories.some(s => s.id === id)).length}/${visibleStories.length} truyện`, `Read ${readStories.filter(id => visibleStories.some(s => s.id === id)).length}/${visibleStories.length} stories`)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {visibleStories.slice(0, 12).map(story => {
            const isRead = readStories.includes(story.id);
            return (
            <button key={story.id} onClick={() => { setOpenStory(story); if (!isRead) setReadStoriesP([...readStories, story.id]); }} className="card-hover btn-bounce" style={{ textAlign: 'left', padding: 14, background: isRead ? '#F0FFF0' : '#fff', borderRadius: 14, border: `2px solid ${isRead ? C.mint : C.border}`, cursor: 'pointer', position: 'relative' }}>
              {isRead && <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 14 }}>✅</div>}
              <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                <Pill color={C.mint}>{story.level}</Pill>
                <Pill color={C.purple}>{story.genre}</Pill>
                <Pill color={C.mute}>⏱ {story.reading_minutes}p</Pill>
                {isRead && <Pill color={C.mint}>✓ {L('Đã đọc', 'Read')}</Pill>}
              </div>
              <div className="display" style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{L(story.title_vi, story.title_en)}</div>
              <div className="body-f" style={{ fontSize: 11, color: C.sub, lineHeight: 1.4 }}>{L(story.paragraphs[0]?.vi || '', story.paragraphs[0]?.en || '').slice(0, 80)}…</div>
            </button>
            );
          })}
        </div>
        {visibleStories.length > 12 && (
          <div className="body-f" style={{ fontSize: 11, color: C.mute, textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
            {L(`+${visibleStories.length - 12} truyện nữa — chọn level để xem hết`, `+${visibleStories.length - 12} more stories — pick a level to see them`)}
          </div>
        )}
      </Card>

      {/* EXPERT Q&A — Hỏi & Đáp Chuyên gia */}
      <Card style={{ marginBottom: 24, background: 'linear-gradient(135deg, #F0E6FF 0%, #FFF4D1 100%)', border: `2px solid ${C.purple}` }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
          💬 {L('Hỏi & Đáp Chuyên gia', 'Expert Q&A')}
        </h3>
        <div className="body-f" style={{ fontSize: 12, color: C.sub, marginBottom: 4 }}>
          {L(`${qnaStats.total} câu trả lời từ ${qnaStats.uniqueExperts} chuyên gia · ${qnaStats.uniqueSources} nguồn xác thực`,
             `${qnaStats.total} expert-verified answers from ${qnaStats.uniqueExperts} experts · ${qnaStats.uniqueSources} sources`)}
        </div>
        <div className="body-f" style={{ fontSize: 11, color: C.mute, marginBottom: 14, fontStyle: 'italic' }}>
          🔄 {L('Tự động cập nhật mỗi 3 ngày qua /api/career-qna-refresh (Vercel cron)', 'Auto-refresh every 3 days via /api/career-qna-refresh (Vercel cron)')}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          <button onClick={() => setQnaTopic(null)} className="btn-bounce body-f" style={{ background: !qnaTopic ? C.ink : '#fff', color: !qnaTopic ? '#fff' : C.ink, border: `2px solid ${C.ink}`, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>{L('Tất cả', 'All')}</button>
          {(Object.keys(topicLabels) as QnATopic[]).map(tp => (
            <button key={tp} onClick={() => setQnaTopic(tp)} className="btn-bounce body-f" style={{ background: qnaTopic === tp ? C.purple : '#fff', color: qnaTopic === tp ? '#fff' : C.purple, border: `2px solid ${C.purple}`, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>{L(topicLabels[tp][0], topicLabels[tp][1])}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {visibleQnA.slice(0, 9).map(qna => (
            <button key={qna.id} onClick={() => setOpenQnA(qna)} className="card-hover btn-bounce" style={{ textAlign: 'left', padding: 14, background: '#fff', borderRadius: 14, border: `2px solid ${C.border}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                <Pill color={C.purple}>{L(topicLabels[qna.topic][0], topicLabels[qna.topic][1])}</Pill>
                <Pill color={C.mint}>{qna.ageGroup}</Pill>
                {qna.verified && <Pill color={C.gold}>✓ verified</Pill>}
              </div>
              <div className="display" style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4, marginBottom: 6 }}>
                ❓ {L(qna.question_vi, qna.question_en)}
              </div>
              <div className="body-f" style={{ fontSize: 11, color: C.sub, fontStyle: 'italic' }}>
                — {qna.expert.name}, <span style={{ fontSize: 10 }}>{qna.expert.affiliation || qna.expert.credentials.split(',')[0]}</span>
              </div>
            </button>
          ))}
        </div>
        {visibleQnA.length > 9 && (
          <div className="body-f" style={{ fontSize: 11, color: C.mute, textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
            +{visibleQnA.length - 9} {L('câu nữa — chọn topic để xem hết', 'more — pick a topic to see them all')}
          </div>
        )}
      </Card>

      {/* Q&A modal — full answer + sources */}
      {openQnA && (
        <div onClick={() => setOpenQnA(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, padding: 24, maxWidth: 760, maxHeight: '85vh', overflow: 'auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                  <Pill color={C.purple}>{L(topicLabels[openQnA.topic][0], topicLabels[openQnA.topic][1])}</Pill>
                  <Pill color={C.mint}>{openQnA.ageGroup}</Pill>
                  {openQnA.verified && <Pill color={C.gold}>✓ verified</Pill>}
                </div>
                <h2 className="display" style={{ fontSize: 20, fontWeight: 700, margin: '4px 0 0' }}>❓ {L(openQnA.question_vi, openQnA.question_en)}</h2>
              </div>
              <button onClick={() => setOpenQnA(null)} className="btn-bounce" style={{ background: C.coral, color: '#fff', border: 'none', borderRadius: 999, width: 32, height: 32, cursor: 'pointer', fontWeight: 700, flexShrink: 0 }}>✕</button>
            </div>

            <div style={{ padding: 14, background: C.soft, borderRadius: 12, borderLeft: `4px solid ${C.purple}`, marginBottom: 12 }}>
              <div className="body-f" style={{ fontSize: 14, lineHeight: 1.7, color: C.ink, marginBottom: 10 }}>🇻🇳 {openQnA.answer_vi}</div>
              <div className="body-f" style={{ fontSize: 13, lineHeight: 1.7, color: C.sub, fontStyle: 'italic' }}>🇬🇧 {openQnA.answer_en}</div>
            </div>

            <div style={{ padding: 12, background: '#FFF4D1', borderRadius: 12, marginBottom: 10 }}>
              <div className="display" style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 4 }}>👤 {L('Chuyên gia', 'Expert')}</div>
              <div className="body-f" style={{ fontSize: 13, fontWeight: 600 }}>{openQnA.expert.name}</div>
              <div className="body-f" style={{ fontSize: 12, color: C.sub }}>{openQnA.expert.credentials}</div>
              {openQnA.expert.affiliation && <div className="body-f" style={{ fontSize: 11, color: C.mute }}>{openQnA.expert.affiliation}</div>}
            </div>

            <div style={{ padding: 12, background: '#E5FAEB', borderRadius: 12, marginBottom: 10 }}>
              <div className="display" style={{ fontSize: 12, fontWeight: 700, color: C.mint, marginBottom: 6 }}>🔗 {L('Nguồn xác thực', 'Verified sources')}</div>
              {openQnA.sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" style={{ display: 'block', padding: 8, background: '#fff', borderRadius: 8, marginBottom: 4, color: C.mint, fontSize: 12, textDecoration: 'none' }}>
                  <div style={{ fontWeight: 700 }}>{s.title}</div>
                  <div style={{ fontSize: 10, color: C.sub }}>{s.publisher} · {s.type}{s.date ? ` · ${s.date}` : ''}</div>
                </a>
              ))}
            </div>

            {openQnA.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {openQnA.tags.map(t => <Pill key={t} color={C.mute}>#{t}</Pill>)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Story modal — full bilingual reading */}
      {openStory && (
        <div onClick={() => setOpenStory(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, padding: 24, maxWidth: 760, maxHeight: '85vh', overflow: 'auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                  <Pill color={C.mint}>{openStory.level}</Pill>
                  <Pill color={C.purple}>{openStory.genre}</Pill>
                  <Pill color={C.mute}>⏱ {openStory.reading_minutes} {L('phút', 'min')}</Pill>
                </div>
                <h2 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '4px 0 0' }}>{L(openStory.title_vi, openStory.title_en)}</h2>
              </div>
              <button onClick={() => setOpenStory(null)} className="btn-bounce" style={{ background: C.coral, color: '#fff', border: 'none', borderRadius: 999, width: 32, height: 32, cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>
            {openStory.paragraphs.map((p, i) => (
              <div key={i} style={{ marginBottom: 14, padding: 12, background: i % 2 ? C.soft : '#fff', borderLeft: `3px solid ${C.mint}`, borderRadius: 8 }}>
                <div className="body-f" style={{ fontSize: 14, lineHeight: 1.6, color: C.ink, marginBottom: 6 }}>🇻🇳 {p.vi}</div>
                <div className="body-f" style={{ fontSize: 13, lineHeight: 1.6, color: C.sub, fontStyle: 'italic' }}>🇬🇧 {p.en}</div>
              </div>
            ))}
            {openStory.moral_vi && (
              <div style={{ padding: 14, background: '#FFF4D1', borderRadius: 12, borderLeft: `4px solid ${C.gold}`, marginTop: 8 }}>
                <div className="display" style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 4 }}>💡 {L('Bài học', 'Moral')}</div>
                <div className="body-f" style={{ fontSize: 13 }}>{L(openStory.moral_vi, openStory.moral_en || openStory.moral_vi)}</div>
              </div>
            )}
            {openStory.vocab_focus && openStory.vocab_focus.length > 0 && (
              <div style={{ marginTop: 12, padding: 12, background: '#E5FAEB', borderRadius: 12 }}>
                <div className="display" style={{ fontSize: 12, fontWeight: 700, color: C.mint, marginBottom: 6 }}>🔤 {L('Từ chính', 'Key vocab')}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {openStory.vocab_focus.map(w => <Pill key={w} color={C.mint}>{w}</Pill>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #845EC2, #FF6B9D)', color: '#fff', padding: 14, borderRadius: 16, marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div className="body-f" style={{ fontSize: 13, fontWeight: 600 }}>
          ✨ {L(`${CURATED_RESOURCES.length} tài nguyên đã chọn lọc · cập nhật hằng tháng`, `${CURATED_RESOURCES.length} curated resources · refreshed monthly`)}
        </div>
        <div className="body-f" style={{ fontSize: 11, opacity: 0.9 }}>📅 {L('Cập nhật', 'Refreshed')}: {LAST_REFRESHED}</div>
      </div>

      {/* Pillar filter */}
      <div style={{ marginBottom: 12 }}>
        <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{L('Trụ cột', 'Pillar')}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setFilterPillar(null)} className="btn-bounce body-f" style={{
            background: !filterPillar ? C.ink : '#fff', color: !filterPillar ? '#fff' : C.ink,
            border: `2px solid ${C.ink}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{L('Tất cả', 'All')}</button>
          {PILLARS.map(p => (
            <button key={p.id} onClick={() => setFilterPillar(p.id)} className="btn-bounce body-f" style={{
              background: filterPillar === p.id ? p.color : '#fff', color: filterPillar === p.id ? '#fff' : p.color,
              border: `2px solid ${p.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
            }}>{L(p.vi, p.en)}</button>
          ))}
        </div>
      </div>

      {/* Age filter */}
      <div style={{ marginBottom: 12 }}>
        <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{t('age')}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setFilterAge(null)} className="btn-bounce body-f" style={{
            background: !filterAge ? C.ink : '#fff', color: !filterAge ? '#fff' : C.ink,
            border: `2px solid ${C.ink}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{L('Mọi tuổi', 'All ages')}</button>
          {[6, 8, 10, 12, 14, 16].map(a => (
            <button key={a} onClick={() => setFilterAge(a)} className="btn-bounce body-f" style={{
              background: filterAge === a ? C.purple : '#fff', color: filterAge === a ? '#fff' : C.purple,
              border: `2px solid ${C.purple}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
            }}>{a} {L('tuổi', 'y')}</button>
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div style={{ marginBottom: 18 }}>
        <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{L('Loại', 'Type')}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setFilterType(null)} className="btn-bounce body-f" style={{
            background: !filterType ? C.ink : '#fff', color: !filterType ? '#fff' : C.ink,
            border: `2px solid ${C.ink}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{L('Tất cả', 'All')}</button>
          {Object.entries(typeEmojis).map(([t, em]) => (
            <button key={t} onClick={() => setFilterType(t)} className="btn-bounce body-f" style={{
              background: filterType === t ? C.coral : '#fff', color: filterType === t ? '#fff' : C.coral,
              border: `2px solid ${C.coral}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
            }}>{em} {t}</button>
          ))}
        </div>
      </div>

      <div className="body-f" style={{ fontSize: 12, color: C.mute, marginBottom: 14 }}>
        {filtered.length} {L('tài nguyên', 'resources')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
        {filtered.map(r => {
          const c = pillarColors[r.pillar];
          const pillar = PILLARS.find(p => p.id === r.pillar);
          return (
            <Card key={r.id} accent={c} padding={16}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontSize: 28 }}>{typeEmojis[r.type]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                    <Pill color={c}>{pillar ? L(pillar.vi, pillar.en) : r.pillar}</Pill>
                    <Pill color={C.purple}>{r.age_min}-{r.age_max}{L(' tuổi', 'y')}</Pill>
                    {r.duration_min && <Pill color={C.mute}>⏱ {r.duration_min}p</Pill>}
                  </div>
                  <div className="display" style={{ fontSize: 15, fontWeight: 700, marginTop: 4, lineHeight: 1.3 }}>{L(r.title_vi, r.title_en)}</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.mute, fontWeight: 600 }}>{r.source}</div>
                </div>
              </div>
              <div className="body-f" style={{ fontSize: 12, color: C.sub, lineHeight: 1.5, marginBottom: 10 }}>{L(r.why_vi, r.why_en)}</div>
              {r.prompt_vi && (
                <div style={{ padding: 10, background: '#FFF4D1', borderRadius: 10, marginBottom: 10, borderLeft: `3px solid ${C.gold}` }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4 }}>💭 {L('Câu hỏi suy nghĩ', 'Reflection prompt')}</div>
                  <div className="body-f" style={{ fontSize: 12, color: C.ink, fontStyle: 'italic' }}>{L(r.prompt_vi, r.prompt_en)}</div>
                </div>
              )}
              <a href={r.url} target="_blank" rel="noreferrer" className="body-f btn-bounce" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: c, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>🔗 {L('Mở link', 'Open link')}</a>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="body-f" style={{ textAlign: 'center', padding: 40, color: C.mute, fontStyle: 'italic' }}>
          {L('Không có tài nguyên phù hợp với filter này. Thử bỏ bớt filter.', 'No resources match these filters. Try removing some.')}
        </div>
      )}
    </div>
  );
}

function QuizTab({ kids, quizState, setQuizState, t, L, lang }) {
  const [filter, setFilter] = React.useState({ pillar: null, age: null });
  const [mode, setMode] = React.useState<'pillar' | 'math'>('pillar');
  const [mathLevel, setMathLevel] = React.useState<MathLevel | null>(null);

  // Adapter: map MathQuestion → QUIZ_BANK shape so render code below stays unchanged
  const mathBank = React.useMemo(() => {
    const pool = mathLevel ? getQuestionsByLevel(mathLevel) : ALL_MATH_QUESTIONS;
    return pool.map(q => ({
      id: q.id,
      pillar: 'thinking',
      age: q.level === 'L1' ? '6-7' : q.level === 'L2' ? '8-10' : q.level === 'L3' ? '11-13' : '14-16',
      vi_q: `[${q.level}/${q.topic}] ${q.question_vi}`,
      en_q: `[${q.level}/${q.topic}] ${q.question_en}`,
      vi_options: q.options,
      en_options: q.options,
      answer: q.correctIdx,
      _isMath: true,
      _explain: q.explain_vi || q.explain_en,
    }));
  }, [mathLevel]);

  const filteredQuiz = mode === 'math'
    ? mathBank
    : QUIZ_BANK.filter(q => (!filter.pillar || q.pillar === filter.pillar) && (!filter.age || q.age === filter.age));
  const current = filteredQuiz[quizState.qIdx];

  const startQuiz = (kidId, pillar = null, age = null) => {
    if (mode === 'math') {
      // Auto-pick math level for kid if not set yet
      const kid = kids.find(k => k.id === kidId);
      if (!mathLevel && kid) setMathLevel(getMathLevelForKid(kid.age));
    }
    setFilter({ pillar, age });
    setQuizState({ kidId, qIdx: 0, score: 0, answered: null, pillar, age });
  };

  const answer = (idx) => {
    if (quizState.answered !== null) return;
    const correct = idx === current.answer;
    setQuizState(s => ({ ...s, answered: idx, score: correct ? s.score + 1 : s.score }));
  };

  const next = () => {
    if (quizState.qIdx + 1 >= filteredQuiz.length) {
      setQuizState(s => ({ ...s, qIdx: filteredQuiz.length, answered: null }));
    } else {
      setQuizState(s => ({ ...s, qIdx: s.qIdx + 1, answered: null }));
    }
  };

  const reset = () => setQuizState({ kidId: null, qIdx: 0, score: 0, answered: null, pillar: null, age: null });

  return (
    <div className="fade-in">
      <SectionHeader title={t('quiz')} subtitle={t('quizGenerator')} emoji="🧩" />

      {!quizState.kidId ? (
        <Card>
          <h3 className="display" style={{ fontSize: 20, marginTop: 0, fontWeight: 700 }}>🧩 {L('Chọn học viên & lĩnh vực', 'Pick student & topic')}</h3>

          {/* MODE TOGGLE — Pillar Quiz vs Math Quiz */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, padding: 4, background: C.soft, borderRadius: 12, width: 'fit-content' }}>
            <button onClick={() => setMode('pillar')} className="btn-bounce body-f" style={{ background: mode === 'pillar' ? C.purple : 'transparent', color: mode === 'pillar' ? '#fff' : C.purple, border: 'none', padding: '6px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>📚 {L('Quiz Trụ cột', 'Pillar Quiz')}</button>
            <button onClick={() => setMode('math')} className="btn-bounce body-f" style={{ background: mode === 'math' ? C.coral : 'transparent', color: mode === 'math' ? '#fff' : C.coral, border: 'none', padding: '6px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>🔢 {L('Quiz Toán', 'Math Quiz')}</button>
          </div>

          <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 16 }}>
            {mode === 'pillar'
              ? L(`${QUIZ_BANK.length} câu hỏi sẵn — lọc theo trụ cột & độ tuổi`, `${QUIZ_BANK.length} questions ready — filter by pillar & age`)
              : L(`${ALL_MATH_QUESTIONS.length} câu toán — lọc theo cấp lớp`, `${ALL_MATH_QUESTIONS.length} math questions — filter by grade level`)}
          </div>

          {/* Math level picker (only show in math mode) */}
          {mode === 'math' && (
            <div style={{ marginBottom: 14 }}>
              <div className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{L('Cấp lớp', 'Grade level')}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button onClick={() => setMathLevel(null)} className="btn-bounce body-f" style={{ background: !mathLevel ? C.ink : '#fff', color: !mathLevel ? '#fff' : C.ink, border: `2px solid ${C.ink}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{L('Tất cả', 'All')}</button>
                {([['L1', L('Lớp lá', 'Kindergarten')], ['L2', L('Lớp 4', 'Grade 4')], ['L3', L('Lớp 6', 'Grade 6')], ['L4', L('Cấp 2', 'Secondary')]] as const).map(([lv, label]) => (
                  <button key={lv} onClick={() => setMathLevel(lv as MathLevel)} className="btn-bounce body-f" style={{ background: mathLevel === lv ? C.coral : '#fff', color: mathLevel === lv ? '#fff' : C.coral, border: `2px solid ${C.coral}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{lv} · {label}</button>
                ))}
              </div>
            </div>
          )}

          {/* Pillar / age filters only in pillar mode */}
          {mode === 'pillar' && <div style={{ marginBottom: 14 }}>
            <div className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{L('Trụ cột', 'Pillar')}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button onClick={() => setFilter({ ...filter, pillar: null })} className="btn-bounce body-f" style={{ background: !filter.pillar ? C.ink : '#fff', color: !filter.pillar ? '#fff' : C.ink, border: `2px solid ${C.ink}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{L('Tất cả', 'All')}</button>
              {PILLARS.filter(p => QUIZ_BANK.some(q => q.pillar === p.id)).map(p => (
                <button key={p.id} onClick={() => setFilter({ ...filter, pillar: p.id })} className="btn-bounce body-f" style={{ background: filter.pillar === p.id ? p.color : '#fff', color: filter.pillar === p.id ? '#fff' : p.color, border: `2px solid ${p.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{L(p.vi, p.en)}</button>
              ))}
            </div>
          </div>}

          {mode === 'pillar' && <div style={{ marginBottom: 18 }}>
            <div className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{t('age')}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[null, '6-7', '8-10', '11-13', '14-16'].map(a => (
                <button key={a || 'all'} onClick={() => setFilter({ ...filter, age: a })} className="btn-bounce body-f" style={{ background: filter.age === a ? C.purple : '#fff', color: filter.age === a ? '#fff' : C.purple, border: `2px solid ${C.purple}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>{a || L('Tất cả', 'All')}</button>
              ))}
            </div>
          </div>}

          <div className="body-f" style={{ fontSize: 12, color: C.mute, marginBottom: 14 }}>{filteredQuiz.length} {L('câu hỏi sẽ hiện ra', 'questions will be shown')}</div>

          <div className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{t('selectKid')}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {kids.map(k => (
              <Btn key={k.id} onClick={() => startQuiz(k.id, filter.pillar, filter.age)} color={k.color} disabled={filteredQuiz.length === 0}>
                <span style={{ fontSize: 16 }}>{k.emoji}</span> {k.name} → {t('startQuiz')}
              </Btn>
            ))}
          </div>
        </Card>
      ) : quizState.qIdx >= filteredQuiz.length ? (
        // Result screen
        <Card style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }} className="pop-in">
            {quizState.score === filteredQuiz.length ? '🏆' : quizState.score >= filteredQuiz.length / 2 ? '🌟' : '💪'}
          </div>
          <h2 className="display" style={{ fontSize: 32, fontWeight: 700, color: C.purple, margin: 0 }}>
            {quizState.score} / {filteredQuiz.length}
          </h2>
          <div className="hand" style={{ fontSize: 22, color: C.pink, marginTop: 8 }}>
            {quizState.score === filteredQuiz.length ? L('Hoàn hảo!', 'Perfect!') : quizState.score >= filteredQuiz.length / 2 ? L('Làm tốt lắm!', 'Well done!') : L('Cố lên, thử lại nhé!', 'Keep going, try again!')}
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn onClick={reset} color={C.purple} icon={RotateCw}>{L('Quiz mới', 'New quiz')}</Btn>
          </div>
        </Card>
      ) : (
        // Question screen
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Pill color={C.purple}>{quizState.qIdx + 1} / {filteredQuiz.length}</Pill>
            <div className="display" style={{ fontSize: 14, color: C.mint, fontWeight: 700 }}>{t('score')}: {quizState.score}</div>
          </div>
          <ProgressBar pct={((quizState.qIdx) / filteredQuiz.length) * 100} color={C.purple} height={6} />

          <div style={{ marginTop: 24 }}>
            <Pill color={PILLARS.find(p => p.id === current.pillar)?.color || C.purple}>
              {L(PILLARS.find(p => p.id === current.pillar)?.vi, PILLARS.find(p => p.id === current.pillar)?.en)} · {current.age}
            </Pill>
            <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 10, lineHeight: 1.4 }}>
              {L(current.vi_q, current.en_q)}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginTop: 18 }}>
              {(L(current.vi_options, current.en_options)).map((opt, i) => {
                const ans = quizState.answered;
                const isCorrect = i === current.answer;
                const isPicked = i === ans;
                let bg = '#fff', col = C.ink, border = C.border;
                if (ans !== null) {
                  if (isCorrect) { bg = '#E5FAEB'; col = C.mint; border = C.mint; }
                  else if (isPicked) { bg = '#FFE5E5'; col = C.coral; border = C.coral; }
                }
                return (
                  <button key={i} onClick={() => answer(i)} disabled={ans !== null} className="btn-bounce body-f" style={{
                    background: bg, color: col, border: `2px solid ${border}`, padding: '14px 16px', borderRadius: 16,
                    cursor: ans !== null ? 'default' : 'pointer', fontWeight: 700, fontSize: 14, textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: col, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{['A','B','C','D'][i]}</span>
                    {opt}
                    {ans !== null && isCorrect && <span style={{ marginLeft: 'auto' }}>✅</span>}
                    {ans !== null && isPicked && !isCorrect && <span style={{ marginLeft: 'auto' }}>❌</span>}
                  </button>
                );
              })}
            </div>

            {quizState.answered !== null && (
              <div className="pop-in" style={{ marginTop: 18, padding: 14, background: quizState.answered === current.answer ? '#E5FAEB' : '#FFE5E5', borderRadius: 14, textAlign: 'center' }}>
                <div className="display" style={{ fontSize: 18, fontWeight: 700, color: quizState.answered === current.answer ? C.mint : C.coral }}>
                  {quizState.answered === current.answer ? t('correct') : t('wrong')}
                </div>
                <div style={{ marginTop: 10 }}>
                  <Btn onClick={next} color={C.purple} icon={ChevronRight}>{quizState.qIdx + 1 >= filteredQuiz.length ? L('Xem kết quả', 'See result') : L('Câu tiếp', 'Next')}</Btn>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

function ReportTab({ kids, getOverall, streaks, unlockedBadges, getPillarProgress, exportReport, exportData, t, L }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('report')} subtitle={L('Báo cáo tổng hợp · Xuất PDF/Markdown', 'Aggregated report · Export PDF/Markdown')} emoji="📋" />

      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <Btn onClick={exportReport} color={C.purple} size="lg" icon={Download}>{L('Xuất Markdown', 'Export Markdown')}</Btn>
        <Btn onClick={() => window.print()} color={C.sky} size="lg" icon={FileText}>{t('printReport')}</Btn>
        <Btn onClick={exportData} color={C.mint} size="lg" icon={Download} variant="outline">{t('exportData')} (JSON)</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 18 }}>
        {kids.map(k => {
          const ov = getOverall(k.id);
          const s = streaks[k.id] || { count: 0, longest: 0 };
          const b = Object.keys(unlockedBadges[k.id] || {}).length;
          return (
            <Card key={k.id} accent={k.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, paddingBottom: 14, borderBottom: `2px solid ${C.border}` }}>
                <div style={{ fontSize: 48 }}>{k.emoji}</div>
                <div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{k.name}</div>
                  <div className="body-f" style={{ fontSize: 12, color: C.sub, fontWeight: 600 }}>{k.age} {L('tuổi', 'years')}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
                <div style={{ padding: 12, background: C.soft, borderRadius: 12 }}>
                  <div className="body-f" style={{ fontSize: 10, color: C.mute, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{t('progress')}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700, color: k.color }}>{ov.pct}%</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.sub }}>{ov.done}/{ov.total}</div>
                </div>
                <div style={{ padding: 12, background: '#FFE5E5', borderRadius: 12 }}>
                  <div className="body-f" style={{ fontSize: 10, color: C.mute, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>🔥 {t('streak')}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700, color: C.coral }}>{s.longest}</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.sub }}>{L('dài nhất', 'longest')}</div>
                </div>
                <div style={{ padding: 12, background: '#FFF4D1', borderRadius: 12 }}>
                  <div className="body-f" style={{ fontSize: 10, color: C.mute, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>🏆 {t('badges')}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700, color: C.gold }}>{b}/{BADGES.length}</div>
                </div>
                <div style={{ padding: 12, background: '#E5F3FF', borderRadius: 12 }}>
                  <div className="body-f" style={{ fontSize: 10, color: C.mute, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>📅 {L('Hoạt động', 'Active')}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700, color: C.sky }}>{s.count}</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.sub }}>{L('ngày streak', 'streak days')}</div>
                </div>
              </div>

              <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.mute, marginBottom: 8 }}>{L('6 trụ cột', '6 pillars')}</div>
              {PILLARS.map(p => {
                const pp = getPillarProgress(k.id, p.id);
                return (
                  <div key={p.id} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                      <span className="body-f" style={{ fontWeight: 600 }}>{L(p.vi, p.en)}</span>
                      <span className="display" style={{ color: p.color, fontWeight: 700 }}>{pp.pct}%</span>
                    </div>
                    <ProgressBar pct={pp.pct} color={p.color} height={5} />
                  </div>
                );
              })}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function SettingsTab({ lang, setLangP, exportData, importData, t, L, parentPin, setParentPinP, parentLocked, setParentLockedP }) {
  const fileInputRef = React.useRef(null);
  const [editingPin, setEditingPin] = React.useState(false);
  const [newParentPin, setNewParentPin] = React.useState(parentPin);
  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) importData(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const saveParentPin = () => {
    if (newParentPin.length === 4 && /^\d+$/.test(newParentPin)) {
      setParentPinP(newParentPin);
      setEditingPin(false);
    } else {
      alert(L('PIN phải là 4 chữ số.', 'PIN must be 4 digits.'));
    }
  };
  return (
    <div className="fade-in">
      <SectionHeader title={t('settings')} subtitle="⚙️" emoji="⚙️" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
        <Card accent={C.pink}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>🌍 {t('language')}</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'vi', label: '🇻🇳 Tiếng Việt' },
              { id: 'en', label: '🇬🇧 English' },
            ].map(l => (
              <button key={l.id} onClick={() => setLangP(l.id)} className="btn-bounce body-f" style={{
                flex: 1, background: lang === l.id ? `linear-gradient(135deg, ${C.pink}, ${C.purple})` : '#fff',
                color: lang === l.id ? '#fff' : C.ink, border: `2px solid ${C.border}`,
                padding: '14px 16px', borderRadius: 16, cursor: 'pointer', fontWeight: 700, fontSize: 14,
              }}>{l.label}</button>
            ))}
          </div>
        </Card>

        <Card accent={C.mint}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>💾 {t('dataMgmt')}</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <Btn onClick={exportData} color={C.mint} icon={Download} style={{ width: '100%', justifyContent: 'center' }}>📤 {t('exportData')} (JSON)</Btn>
            <div className="body-f" style={{ fontSize: 11, color: C.mute, textAlign: 'center', lineHeight: 1.5 }}>
              {lang === 'vi' ? 'Lưu backup toàn bộ dữ liệu (kids, progress, badges, journal, portfolio, pins...)' : 'Backup all data (kids, progress, badges, journal, portfolio, pins...)'}
            </div>

            <div style={{ height: 1, background: C.border, margin: '8px 0' }} />

            <input ref={fileInputRef} type="file" accept="application/json" onChange={onFileSelect} style={{ display: 'none' }} />
            <Btn onClick={() => fileInputRef.current?.click()} color={C.sky} variant="outline" style={{ width: '100%', justifyContent: 'center' }}>
              📥 {t('importData')} (JSON)
            </Btn>
            <div className="body-f" style={{ fontSize: 11, color: C.mute, textAlign: 'center', lineHeight: 1.5 }}>
              {L('Khôi phục từ file backup. Sẽ ghi đè data hiện tại.', 'Restore from backup file. Will overwrite current data.')}
            </div>
          </div>
        </Card>

        <Card accent={C.gold}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>🔐 {L('Khoá Bố/Mẹ', 'Parent Lock')}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: 12, background: parentLocked ? '#FFF4D1' : C.soft, borderRadius: 12 }}>
            <div>
              <div className="body-f" style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
                {parentLocked ? `🔒 ${L('Đã khoá', 'Locked')}` : `🔓 ${L('Chưa khoá', 'Unlocked')}`}
              </div>
              <div className="body-f" style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>
                {parentLocked
                  ? L('Yêu cầu PIN để vào parent mode', 'Requires PIN to enter parent mode')
                  : L('Mode bố/mẹ là default — không cần PIN', 'Parent mode is default — no PIN needed')}
              </div>
            </div>
            <button onClick={() => setParentLockedP(!parentLocked)} className="btn-bounce body-f" style={{
              background: parentLocked ? C.gold : C.mute, color: '#fff', border: 'none',
              padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
            }}>
              {parentLocked ? L('Mở khoá', 'Unlock') : L('Khoá', 'Lock')}
            </button>
          </div>

          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {L('PIN Bố/Mẹ hiện tại', 'Current parent PIN')}: {editingPin ? '' : '••••'}
          </div>
          {editingPin ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" maxLength={4} value={newParentPin} autoFocus
                onChange={e => setNewParentPin(e.target.value.replace(/\D/g, ''))}
                placeholder="PIN 4 số" style={{
                  flex: 1, padding: 10, border: `2px solid ${C.border}`, borderRadius: 12,
                  fontSize: 16, fontWeight: 700, letterSpacing: 8, textAlign: 'center', outline: 'none',
                }} />
              <Btn onClick={saveParentPin} color={C.mint} icon={Save} size="sm">{t('save')}</Btn>
              <Btn onClick={() => { setEditingPin(false); setNewParentPin(parentPin); }} color={C.mute} variant="outline" size="sm">{t('cancel')}</Btn>
            </div>
          ) : (
            <Btn onClick={() => setEditingPin(true)} color={C.gold} variant="outline" icon={Edit3} style={{ width: '100%', justifyContent: 'center' }}>
              {L('Đổi PIN bố/mẹ', 'Change parent PIN')}
            </Btn>
          )}
          <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 8, fontStyle: 'italic' }}>
            💡 {L('Mặc định: 0000. Đổi để bảo vệ Settings + edit học viên khỏi các bạn nhỏ tự ý.', 'Default: 0000. Change to protect Settings + student edits from unauthorized kids.')}
          </div>
        </Card>

        <Card accent={C.sky}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>🔔 {t('notifications')}</h3>
          <div className="body-f" style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>
            {lang === 'vi' ? '💡 Tích hợp Telegram bot @pany_super_os_bot có thể được setup riêng — xem tab Settings của Pany Super OS.' : '💡 Telegram bot integration (@pany_super_os_bot) can be set up separately — see Pany Super OS Settings.'}
          </div>
        </Card>

        <Card accent={C.purple}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>ℹ️ {lang === 'vi' ? 'Về Pany Kids Studio' : 'About Pany Kids Studio'}</h3>
          <div className="body-f" style={{ fontSize: 13, color: C.sub, lineHeight: 1.7 }}>
            <div><strong>{lang === 'vi' ? 'Phiên bản' : 'Version'}:</strong> v3.0 · 2026-04-30</div>
            <div><strong>{lang === 'vi' ? 'Tác giả' : 'Author'}:</strong> Bố Bình 💖</div>
            <div><strong>{lang === 'vi' ? 'Cho' : 'For'}:</strong> Phúc · An · Y</div>
            <div style={{ marginTop: 10, padding: 10, background: C.soft, borderRadius: 10, fontStyle: 'italic' }}>
              {lang === 'vi' ? '"Pany Kids Studio không phải lớp học. Đây là studio gia đình — bố và các con cùng làm thật, học thật, sai thật, sửa thật."' : '"Pany Kids Studio is not a classroom. It\'s a family studio — dad and kids build real, learn real, fail real, fix real."'}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function HardwareTab({ t, L }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('hardware')} subtitle={L('Đầu tư theo độ tuổi — không cần đầu tư hết một lần', 'Invest by age — no need all at once')} emoji="💻" />

      <div style={{ background: 'linear-gradient(135deg, #4DABF7, #845EC2)', color: '#fff', padding: 22, borderRadius: 24, marginBottom: 28, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: 20, fontSize: 100, opacity: 0.15 }}>🌟</div>
        <div style={{ fontSize: 56 }} className="float-anim">🚀</div>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <div className="hand" style={{ color: '#FFD43B', fontSize: 20, marginBottom: -2 }}>{L('companion app — đã build sẵn', 'companion app — ready to deploy')}</div>
          <div className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Pany Kids Companion</div>
          <div className="body-f" style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.95 }}>
            {L('App riêng cho các bạn nhỏ chạy trên 3 máy của các bạn — gamified, không AI, có streak/badge/quest.', 'A dedicated app for kids on their own machines — gamified, no AI, with streak/badge/quest.')}
          </div>
        </div>
      </div>

      {HARDWARE_BY_AGE.map((age, i) => (
        <Card key={i} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ fontSize: 48 }}>{age.emoji}</div>
            <div>
              <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{L(age.vi_range, age.en_range)}</div>
              <div className="hand" style={{ color: C.purple, fontSize: 16 }}>tier {i + 1} of 4</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {age.items.map((item, j) => (
              <div key={j} className="card-hover" style={{ padding: 14, background: C.soft, borderRadius: 14, borderLeft: `4px solid ${C.sky}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <Pill color={C.sky}>{L(item.vi_cat, item.en_cat)}</Pill>
                  <span className="display" style={{ fontSize: 13, color: C.mint, fontWeight: 700 }}>💰 {item.cost}</span>
                </div>
                <div className="display" style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{L(item.vi_name, item.en_name)}</div>
                <div className="body-f" style={{ fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{L(item.vi_why, item.en_why)}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function SoftwareTab({ t, L }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('software')} subtitle={L('Stack công cụ theo độ tuổi và mục đích', 'Tools stack by age and purpose')} emoji="🤖" />

      <div style={{ background: 'linear-gradient(135deg, #FF6B9D, #845EC2)', color: '#fff', padding: 18, borderRadius: 20, marginBottom: 28, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 32 }}>⚠️</div>
        <div>
          <div className="hand" style={{ color: '#FFD43B', fontSize: 20, marginBottom: 2 }}>{t('notice')}</div>
          <div className="body-f" style={{ fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: '#FFD43B' }}>Claude (Anthropic) {L('yêu cầu user 18+', 'requires user 18+')}.</strong> {L('Bố là người duy nhất chat với Claude — các bạn ngồi cùng, nói ý tưởng, bố dịch thành prompt. Vừa hợp lệ, vừa dạy diễn đạt rõ ràng.', 'Dad is the only one chatting with Claude — kids sit along, share ideas, dad turns into prompts. Both compliant and teaches clear expression.')}
          </div>
        </div>
      </div>

      {SOFTWARE_STACK.map((stack, i) => (
        <Card key={i} style={{ marginBottom: 18 }}>
          <h3 className="display" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 14px' }}>{L(stack.vi_pillar, stack.en_pillar)}</h3>
          {stack.items.map((item, j) => (
            <div key={j} style={{ padding: 12, background: C.soft, borderRadius: 12, marginBottom: 8, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ minWidth: 70, padding: '4px 10px', background: `linear-gradient(135deg, ${C.purple}, ${C.pink})`, color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, textAlign: 'center', height: 'fit-content' }}>
                {item.age === 'all' ? '👶➡️🧑' : item.age}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                  {item.tools.map((tool, k) => (
                    <span key={k} className="body-f" style={{ background: '#fff', border: `1.5px solid ${C.border}`, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>{tool}</span>
                  ))}
                </div>
                <div className="body-f" style={{ fontSize: 12, color: C.sub, fontStyle: 'italic' }}>{L(item.vi_note, item.en_note)}</div>
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

function EnglishTab({ t, L }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('english')} subtitle={L('Lộ trình từ flashcard đến Cambridge', 'From flashcards to Cambridge')} emoji="🌍" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, marginBottom: 28 }}>
        {ENGLISH_STAGES.map((s, i) => (
          <Card key={i} accent={C.pink}>
            <div className="display" style={{ fontSize: 16, fontWeight: 700 }}>{L(s.stage_vi, s.stage_en)}</div>
            <div className="hand" style={{ color: C.pink, fontSize: 18, marginBottom: 14 }}>{L(s.target_vi, s.target_en)}</div>

            <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: C.mute, marginBottom: 8 }}>Apps</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {s.apps.map((a, j) => <Pill key={j} color={C.pink} bg="#FFE5F1">{a}</Pill>)}
            </div>

            <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: C.mute, marginBottom: 6 }}>{L('Phương pháp', 'Method')}</div>
            <div className="body-f" style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{L(s.method_vi, s.method_en)}</div>
          </Card>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FF6B9D, #845EC2)', color: '#fff', padding: 26, borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -10, right: 10, fontSize: 80, opacity: 0.15 }}>🌍</div>
        <h3 className="display" style={{ fontSize: 22, color: '#FFD43B', marginTop: 0, marginBottom: 14, fontWeight: 700 }}>{L('Nguyên tắc tiếng Anh trong Studio', 'English principles in the Studio')}</h3>
        <ul className="body-f" style={{ fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
          <li>{L('Mỗi session với Claude: prompt tiếng Việt, output ', 'Each Claude session: Vietnamese prompt, output ')}<strong style={{ color: '#FFD43B' }}>{L('tiếng Anh + bản dịch', 'English + translation')}</strong></li>
          <li>{L('Mỗi tuần: 1 video TED-Ed (5 phút), tóm tắt lại', 'Each week: 1 TED-Ed video (5min), summarize back')}</li>
          <li>{L('Mỗi tháng: 1 buổi "English Only Dinner"', 'Each month: 1 "English Only Dinner"')}</li>
          <li>{L('Mỗi quý: video tự nói tiếng Anh 1 phút, lưu để so sánh', 'Each quarter: 1-min self English video, save to compare')}</li>
          <li>{L('Cấm dịch tự động Google Translate khi học', 'No auto Google Translate while learning')}</li>
        </ul>
      </div>
    </div>
  );
}

function FinanceTab({ t, L }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('finance')} subtitle={L('Từ 3 hũ tiết kiệm đến lãi kép', 'From 3 jars to compound interest')} emoji="💰" />

      {FINANCIAL_SKILLS.map((f, i) => (
        <Card key={i} accent={C.mint} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
            <div>
              <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{f.age} {L('tuổi', 'years')}</div>
              <div className="hand" style={{ color: C.mint, fontSize: 17 }}>🎯 {L(f.vi_milestone, f.en_milestone)}</div>
            </div>
            <DollarSign size={36} style={{ color: C.mint }} />
          </div>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: C.mute, marginBottom: 10 }}>{L('Kỹ năng cần học', 'Skills to learn')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {(L(f.vi_skills, f.en_skills)).map((s, j) => (
              <div key={j} style={{ padding: 12, background: '#E5FAEB', borderRadius: 12, borderLeft: `4px solid ${C.mint}` }}>
                <Check size={14} style={{ color: C.mint, marginBottom: 4 }} />
                <div className="body-f" style={{ fontSize: 13, fontWeight: 600 }}>{s}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <div style={{ background: 'linear-gradient(135deg, #51CF66, #FFD43B)', color: '#fff', padding: 24, borderRadius: 24 }}>
        <h3 className="display" style={{ fontSize: 22, marginTop: 0, fontWeight: 700 }}>🏺 {L('Hệ thống "3 Hũ" cho mọi độ tuổi', 'The "3-Jar System" for all ages')}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 16 }}>
          {[
            { vi: 'Hũ Tiêu (50%)', en: 'Spend Jar (50%)', vd: 'Snack, đồ chơi nhỏ', ed: 'Snacks, small toys', emoji: '🛍️' },
            { vi: 'Hũ Tiết Kiệm (40%)', en: 'Save Jar (40%)', vd: 'Lego, sách, công cụ', ed: 'Lego, books, tools', emoji: '🐷' },
            { vi: 'Hũ Cho Đi (10%)', en: 'Give Jar (10%)', vd: 'Quyên góp, quà tặng', ed: 'Donate, gifts', emoji: '🎁' },
          ].map((h, i) => (
            <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.18)', borderRadius: 16, borderLeft: '3px solid #FFD43B', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{h.emoji}</div>
              <div className="display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{L(h.vi, h.en)}</div>
              <div className="body-f" style={{ fontSize: 12, opacity: 0.95 }}>{L(h.vd, h.ed)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThinkingTab({ t, L }) {
  return (
    <div className="fade-in">
      <SectionHeader title={t('thinking')} subtitle={L('6 thực hành làm hằng tuần', '6 weekly practices')} emoji="🧠" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 28 }}>
        {CRITICAL_THINKING.map((p, i) => (
          <Card key={i} accent={C.purple} style={{ position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: -12, left: 16, background: `linear-gradient(135deg, ${C.purple}, ${C.pink})`, color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, boxShadow: `0 4px 12px ${C.purple}55` }}>
              ✨ PRACTICE #{i + 1}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Brain size={22} color={C.purple} />
              <div className="display" style={{ fontSize: 16, fontWeight: 700 }}>{L(p.vi, p.en)}</div>
            </div>
            <div className="body-f" style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{L(p.vi_desc, p.en_desc)}</div>
          </Card>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #845EC2, #FF6B9D)', color: '#fff', padding: 28, borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: 20, fontSize: 90, opacity: 0.15 }} className="float-anim">🎤</div>
        <h3 className="display" style={{ fontSize: 22, marginTop: 0, marginBottom: 14, fontWeight: 700 }}>🎤 Family Debate Night</h3>
        <div className="body-f" style={{ fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginTop: 0 }}>{L('Mỗi tháng 1 buổi tối, chọn 1 chủ đề:', 'One night a month, pick a topic:')}</p>
          <ul>
            <li>{L('"Có nên cấm điện thoại trong trường?"', '"Should phones be banned in school?"')}</li>
            <li>{L('"Tiền ở đâu ra?"', '"Where does money come from?"')}</li>
            <li>{L('"AI có làm con mất việc khi lớn không?"', '"Will AI take my job in the future?"')}</li>
            <li>{L('"Có nên cho thú cưng ăn đồ ăn người?"', '"Should pets eat human food?"')}</li>
          </ul>
          <p><strong style={{ color: '#FFD43B' }}>{L('Quy tắc:', 'Rule:')}</strong> {L('Mỗi bạn phải trình bày cả hai phía trước khi nói quan điểm cá nhân. Bố làm trọng tài.', 'Each kid must argue both sides before stating their own view. Dad is referee.')}</p>
        </div>
      </div>
    </div>
  );
}

function RewardsTab({ t, L }) {
  const colors = [C.pink, C.sky, C.mint, C.purple, C.gold];
  return (
    <div className="fade-in">
      <SectionHeader title={t('rewards')} subtitle={L('Hệ thống ghi nhận có cấu trúc', 'Structured recognition system')} emoji="🎁" />

      <div style={{ display: 'grid', gap: 14 }}>
        {REWARDS.map((r, i) => (
          <Card key={i} accent={colors[i]}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', fontWeight: 700, boxShadow: `0 6px 16px ${colors[i]}55` }}>
                {['📅', '🗓️', '🏆', '🌟', '💎'][i]}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div className="display" style={{ fontSize: 20, fontWeight: 700, color: colors[i] }}>{L(r.vi_tier, r.en_tier)}</div>
                <div className="body-f" style={{ fontSize: 13, color: C.sub, marginTop: 2 }}><strong>{L('Điều kiện', 'Criteria')}:</strong> {L(r.vi_crit, r.en_crit)}</div>
                <div className="hand" style={{ fontSize: 18, color: colors[i], marginTop: 4 }}>🎁 {L(r.vi_reward, r.en_reward)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExperiencesTab({ t, L, kids, lang }) {
  return (
    <div className="fade-in">
      {/* VN Map + GPS */}
      <VietnamMap kids={kids} lang={lang} L={L} t={t} />

      {/* Suggestions */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: `2px dashed ${C.border}` }}>
        <h3 className="display" style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>💡 {L('Gợi ý trải nghiệm', 'Experience ideas')}</h3>
        <div className="hand" style={{ fontSize: 20, color: C.coral, marginBottom: 18 }}>{L('Khám phá thế giới ngoài màn hình', 'Discover the world beyond screens')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {EXPERIENCES.map((e, i) => (
            <Card key={i} accent={C.coral}>
              <div className="hand" style={{ fontSize: 22, color: C.coral, marginBottom: 4 }}>{L(e.vi_when, e.en_when)}</div>
              <div className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>{['🌸 Quarterly', '🏕️ Bi-annual', '🌍 Yearly'][i]}</div>
              {(L(e.vi_acts, e.en_acts)).map((act, j) => (
                <div key={j} style={{ padding: 12, background: C.soft, borderRadius: 12, marginBottom: 8, borderLeft: `4px solid ${C.coral}`, fontSize: 13 }} className="body-f">
                  ✨ {act}
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function EvalModal({ evalKid, evalQuarter, evalText, setEvalText, evalRating, setEvalRating, saveEval, setEvalKid, setEvalQuarter, kids, t, L }) {
  const kid = kids.find(k => k.id === evalKid);
  const q = YEAR_PLANS[evalQuarter.year - 1].quarters[evalQuarter.qIdx];
  return (
    <div onClick={() => { setEvalKid(null); setEvalQuarter(null); }} style={{
      position: 'fixed', inset: 0, background: 'rgba(45,27,78,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} className="pop-in" style={{
        background: '#fff', borderRadius: 24, padding: 28, maxWidth: 500, width: '100%',
        boxShadow: '0 20px 60px rgba(132,94,194,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ fontSize: 44 }}>{kid?.emoji}</div>
          <div>
            <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{kid?.name}</div>
            <div className="hand" style={{ fontSize: 18, color: C.purple }}>{L(`Năm ${evalQuarter.year} · ${q.vi_name}`, `Year ${evalQuarter.year} · ${q.en_name}`)}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 8 }}>{t('rating')}</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setEvalRating(n)} className="btn-bounce" style={{
                background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 32, padding: 4,
              }}>{n <= evalRating ? '⭐' : '☆'}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 8 }}>{t('notes')}</label>
          <textarea value={evalText} onChange={e => setEvalText(e.target.value)}
            placeholder={L('Điểm mạnh, cần cải thiện, kế hoạch tuần tới...', 'Strengths, areas to improve, next week plan...')}
            style={{ width: '100%', padding: 12, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, minHeight: 100, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn onClick={() => { setEvalKid(null); setEvalQuarter(null); }} color={C.mute} variant="outline">{t('cancel')}</Btn>
          <Btn onClick={saveEval} color={C.mint} icon={Save}>{t('save')}</Btn>
        </div>
      </div>
    </div>
  );
}

function LoginModal({ kids, pinAttempt, setPinAttempt, tryLogin, setShowLogin, setActiveKidId, t, L, parentLocked, parentUnlocked, tryParentLogin, parentLoginAttempt, setParentLoginAttempt, parentLoginError }) {
  const [error, setError] = React.useState(false);
  const [showParentPin, setShowParentPin] = React.useState(parentLocked && !parentUnlocked);

  const tryIt = (kidId, val) => {
    if (val.length === 4) {
      const ok = tryLogin(kidId, val);
      if (!ok) { setError(true); setTimeout(() => setError(false), 1500); setPinAttempt({ kidId, value: '' }); }
    }
  };

  const goParent = () => {
    setActiveKidId(null);
    if (parentLocked && !parentUnlocked) {
      setShowParentPin(true);
    } else {
      setShowLogin(false);
    }
  };

  const handleParentPin = (val) => {
    if (val.length === 4) {
      const ok = tryParentLogin(val);
      if (ok) setShowLogin(false);
    }
  };

  return (
    <div onClick={() => setShowLogin(false)} style={{
      position: 'fixed', inset: 0, background: 'rgba(45,27,78,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} className="pop-in" style={{
        background: '#fff', borderRadius: 24, padding: 28, maxWidth: 480, width: '100%',
        boxShadow: '0 20px 60px rgba(132,94,194,0.4)',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {showParentPin ? `👨‍👩‍👧 ${L('Đăng nhập Bố/Mẹ', 'Parent Login')}` : `🔐 ${t('selectKid')}`}
        </h3>
        <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 12 }}>
          {showParentPin ? L('Nhập PIN bố/mẹ (mặc định: 0000)', 'Enter parent PIN (default: 0000)') : t('enterPin')}
        </div>

        {showParentPin && (
          <div className="pop-in" style={{ marginBottom: 14 }}>
            <input type="password" maxLength={4} value={parentLoginAttempt} autoFocus
              onChange={e => { const v = e.target.value.replace(/\D/g, ''); setParentLoginAttempt(v); handleParentPin(v); }}
              placeholder="••••" style={{
                width: '100%', padding: 16, border: `3px solid ${parentLoginError ? C.coral : C.border}`, borderRadius: 16,
                fontSize: 28, fontWeight: 700, letterSpacing: 16, textAlign: 'center', outline: 'none', marginBottom: 12,
              }} />
            {parentLoginError && <div className="body-f" style={{ color: C.coral, fontSize: 13, textAlign: 'center', fontWeight: 700, marginBottom: 10 }}>❌ PIN sai!</div>}
            <Btn onClick={() => setShowParentPin(false)} color={C.mute} variant="outline" style={{ width: '100%', justifyContent: 'center' }}>{L('← Trở lại chọn học viên', '← Back to student select')}</Btn>
          </div>
        )}

        {!showParentPin && (<>

        {/* PIN hints */}
        {!pinAttempt.kidId && (
          <div style={{ background: '#FFF4D1', borderRadius: 12, padding: 12, marginBottom: 16, border: '2px dashed #FFB800' }}>
            <div className="body-f" style={{ fontSize: 12, fontWeight: 700, color: '#9B6800', marginBottom: 6 }}>💡 {t('pinHintTitle')}</div>
            <div className="body-f" style={{ fontSize: 12, color: C.ink, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {kids.map(k => (
                <span key={k.id}><strong>{k.emoji} {k.name}</strong>: {k.pin}</span>
              ))}
            </div>
            <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 6 }}>
              {L('Đổi PIN trong tab "Học viên" → click 🔒', 'Change PIN in "Students" tab → click 🔒')}
            </div>
          </div>
        )}

        {!pinAttempt.kidId ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 14 }}>
              {kids.map(k => (
                <button key={k.id} onClick={() => setPinAttempt({ kidId: k.id, value: '' })} className="btn-bounce" style={{
                  background: '#fff', border: `2px solid ${k.color}`, padding: 18, borderRadius: 18, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ fontSize: 40 }}>{k.emoji}</div>
                  <div className="display" style={{ fontSize: 16, fontWeight: 700, color: k.color }}>{k.name}</div>
                </button>
              ))}
            </div>
            <div style={{ paddingTop: 14, borderTop: `1px dashed ${C.border}` }}>
              <Btn onClick={goParent} color={C.purple} variant="outline" icon={Users} style={{ width: '100%', justifyContent: 'center' }}>
                👨‍👩‍👧 {t('loginParent')}
              </Btn>
            </div>
          </>
        ) : (
          <div>
            {(() => {
              const k = kids.find(x => x.id === pinAttempt.kidId);
              return (
                <div style={{ textAlign: 'center', marginBottom: 18 }}>
                  <div style={{ fontSize: 56, marginBottom: 8 }} className={error ? 'wiggle' : ''}>{k?.emoji}</div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700, color: k?.color }}>{k?.name}</div>
                </div>
              );
            })()}
            <input type="password" maxLength={4} value={pinAttempt.value} autoFocus
              onChange={e => { const v = e.target.value.replace(/\D/g, ''); setPinAttempt({ ...pinAttempt, value: v }); if (v.length === 4) tryIt(pinAttempt.kidId, v); }}
              placeholder="••••" style={{
                width: '100%', padding: 16, border: `3px solid ${error ? C.coral : C.border}`, borderRadius: 16,
                fontSize: 28, fontWeight: 700, letterSpacing: 16, textAlign: 'center', outline: 'none', marginBottom: 12,
              }} />
            {error && <div className="body-f" style={{ color: C.coral, fontSize: 13, textAlign: 'center', fontWeight: 700 }}>❌ {pinAttempt.value === '' ? 'PIN sai!' : ''} Try again!</div>}
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn onClick={() => setPinAttempt({ kidId: null, value: '' })} color={C.mute} variant="outline" style={{ flex: 1, justifyContent: 'center' }}>{t('cancel')}</Btn>
            </div>
          </div>
        )}

        </>)}
      </div>
    </div>
  );
}

function PublishTab({ t, L }) {
  const colors = [C.mute, C.sky, C.purple, C.pink];
  const emojis = ['🏠', '👥', '🌍', '🚀'];
  return (
    <div className="fade-in">
      <SectionHeader title={t('publish')} subtitle={L('Từ Demo Day gia đình đến ProductHunt', 'From family Demo Day to ProductHunt')} emoji="📤" />

      {PUBLISHING.map((p, i) => (
        <Card key={i} accent={colors[i]} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 56 }} className="float-anim">{emojis[i]}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="display" style={{ fontSize: 20, fontWeight: 700, color: colors[i] }}>{L(p.vi_stage, p.en_stage)}</div>
              <div className="hand" style={{ fontSize: 18, color: colors[i], marginTop: 2 }}>{L(p.vi_when, p.en_when)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {p.platforms.map((pl, j) => (
              <span key={j} className="body-f" style={{ background: C.soft, color: colors[i], padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: `1.5px solid ${colors[i]}40` }}>{pl}</span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function JournalTab({ kids, journal, saveJournal, t, L, activeKidId, isParentAuthed }) {
  // PRIVACY: Journal is strictly private — only the kid who wrote it can read.
  // Parent CANNOT view kids' journal (privacy from kids' side).
  if (isParentAuthed && !activeKidId) {
    return (
      <div className="fade-in">
        <SectionHeader title={t('journal')} subtitle={L('Nhật ký là bí mật cá nhân', 'Journal is personal secret')} emoji="📓" />
        <div style={{
          background: 'linear-gradient(135deg, #FFE5F1, #E5F3FF)',
          borderRadius: 24, padding: 40, textAlign: 'center',
          border: `2px dashed ${C.purple}`,
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
          <h3 className="display" style={{ fontSize: 24, fontWeight: 700, color: C.purple, marginBottom: 12 }}>
            {L('Nhật ký là bí mật của các bạn', 'Journal is the kids\' secret')}
          </h3>
          <p className="body-f" style={{ fontSize: 14, color: C.sub, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 16px' }}>
            {L(
              'Chỉ học viên mới đọc được nhật ký của chính mình. Bố/mẹ tôn trọng không gian riêng tư của các bạn — đây là nơi các bạn tâm sự với Đại Ka.',
              'Only each student can read their own journal. Parents respect kids\' privacy — this is where they confide in Đại Ka.'
            )}
          </p>
          <p className="body-f" style={{ fontSize: 13, color: C.mute, fontStyle: 'italic' }}>
            💡 {L('Bố/mẹ có thể xem tổng quan, tiến độ, badges, lộ trình ở các tab khác.', 'Parents can view overview, progress, badges, roadmap in other tabs.')}
          </p>
        </div>
      </div>
    );
  }

  // Kid mode: only own journal
  const visibleKids = kids.filter(k => k.id === activeKidId);
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  React.useEffect(() => {
    if (activeKidId && selectedKid !== activeKidId) setSelectedKid(activeKidId);
  }, [activeKidId]);
  const [learned, setLearned] = React.useState('');
  const [hard, setHard] = React.useState('');
  const [happy, setHappy] = React.useState('');

  const today = new Date().toISOString().slice(0, 10);
  const todayKey = `${selectedKid}-${today}`;
  const todayEntry = journal[todayKey];

  React.useEffect(() => {
    if (todayEntry) { setLearned(todayEntry.learned || ''); setHard(todayEntry.hard || ''); setHappy(todayEntry.happy || ''); }
    else { setLearned(''); setHard(''); setHappy(''); }
  }, [selectedKid, todayEntry]);

  const submit = () => {
    if (!learned && !hard && !happy) return;
    saveJournal(selectedKid, { learned, hard, happy });
  };

  const entries = Object.entries(journal).filter(([k]) => k.startsWith(selectedKid)).sort().reverse();

  return (
    <div className="fade-in">
      <SectionHeader title={t('journal')} subtitle={L('Mỗi ngày 3 câu — phản tư là siêu năng lực', 'Daily 3 lines — reflection is a superpower')} emoji="📓" />

      {!isParentAuthed && (
        <div style={{ background: '#E5F3FF', borderRadius: 12, padding: 10, marginBottom: 14, fontSize: 12 }}>
          <div className="body-f" style={{ color: C.sky, fontWeight: 700 }}>🔒 {L('Nhật ký là bí mật cá nhân — chỉ em xem được.', 'Journal is personal secret — only you can see.')}</div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {visibleKids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}><span style={{ fontSize: 20 }}>{k.emoji}</span> {k.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Today's entry */}
        <Card accent={C.purple}>
          <h3 className="display" style={{ fontSize: 20, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
            ✏️ {t('journalEntry')}
          </h3>
          <div className="hand" style={{ fontSize: 18, color: C.purple, marginBottom: 14 }}>{today}</div>

          <div style={{ marginBottom: 14 }}>
            <label className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 6 }}>📚 {t('learned')}</label>
            <textarea value={learned} onChange={e => setLearned(e.target.value)} placeholder={t('writeJournal')}
              style={{ width: '100%', padding: 12, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, minHeight: 60, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 6 }}>😅 {t('hard')}</label>
            <textarea value={hard} onChange={e => setHard(e.target.value)} placeholder={t('writeJournal')}
              style={{ width: '100%', padding: 12, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, minHeight: 60, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 6 }}>😊 {t('happy')}</label>
            <textarea value={happy} onChange={e => setHappy(e.target.value)} placeholder={t('writeJournal')}
              style={{ width: '100%', padding: 12, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, minHeight: 60, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <Btn onClick={submit} color={C.purple} size="lg" icon={Save} style={{ width: '100%' }}>{t('save')}</Btn>
        </Card>

        {/* History */}
        <Card>
          <h3 className="display" style={{ fontSize: 20, margin: '0 0 14px' }}>📖 {L('Lịch sử nhật ký', 'Journal history')}</h3>
          {entries.length === 0 && <div className="body-f" style={{ fontSize: 13, color: C.mute, fontStyle: 'italic' }}>{L('Chưa có entry nào. Viết entry đầu tiên!', 'No entries yet. Write your first one!')}</div>}
          <div style={{ maxHeight: 600, overflowY: 'auto' }}>
            {entries.map(([k, v]) => {
              const date = k.split('-').slice(1).join('-');
              return (
                <div key={k} style={{ padding: 14, marginBottom: 10, background: C.soft, borderRadius: 14, borderLeft: `4px solid ${C.purple}` }}>
                  <div className="hand" style={{ fontSize: 18, color: C.purple, marginBottom: 6 }}>{date}</div>
                  {v.learned && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>📚 {L('Học', 'Learned')}:</strong> {v.learned}</div>}
                  {v.hard && <div className="body-f" style={{ fontSize: 12, marginBottom: 4 }}><strong>😅 {L('Khó', 'Hard')}:</strong> {v.hard}</div>}
                  {v.happy && <div className="body-f" style={{ fontSize: 12 }}><strong>😊 {L('Vui', 'Happy')}:</strong> {v.happy}</div>}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function PortfolioTab({ kids, portfolio, addPortfolioItem, setPortfolioP, t, L, activeKidId, isParentAuthed }) {
  // PRIVACY: Portfolio details are private to each kid (their personal learning items).
  // Parent sees count summary only, not the actual content.
  if (isParentAuthed && !activeKidId) {
    return (
      <div className="fade-in">
        <SectionHeader title={t('portfolio')} subtitle={L('Sản phẩm cá nhân của các bạn', 'Personal projects of kids')} emoji="🖼️" />
        <div style={{
          background: 'linear-gradient(135deg, #FFE5F1, #E5F3FF)',
          borderRadius: 24, padding: 32, textAlign: 'center',
          border: `2px dashed ${C.sky}`,
        }}>
          <div style={{ fontSize: 56, marginBottom: 14 }}>🔒</div>
          <h3 className="display" style={{ fontSize: 22, fontWeight: 700, color: C.sky, marginBottom: 12 }}>
            {L('Portfolio cá nhân của các bạn', 'Kids\' personal portfolio')}
          </h3>
          <p className="body-f" style={{ fontSize: 14, color: C.sub, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 16px' }}>
            {L(
              'Bố/mẹ chỉ xem được số lượng, không xem chi tiết. Các bạn có thể chủ động chia sẻ với gia đình ở Demo Day.',
              'Parents see counts only, not details. Kids share with family at Demo Day.'
            )}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 24, maxWidth: 600, margin: '24px auto 0' }}>
            {kids.map(k => (
              <div key={k.id} style={{ background: '#fff', borderRadius: 16, padding: 16, border: `2px solid ${k.color}` }}>
                <div style={{ fontSize: 36 }}>{k.emoji}</div>
                <div className="display" style={{ fontSize: 16, fontWeight: 700, color: k.color, marginTop: 4 }}>{k.name}</div>
                <div className="display" style={{ fontSize: 28, fontWeight: 700, color: C.purple, marginTop: 8 }}>{(portfolio[k.id] || []).length}</div>
                <div className="body-f" style={{ fontSize: 11, color: C.mute, fontWeight: 600 }}>{L('sản phẩm', 'projects')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Kid mode: only own portfolio
  const visibleKids = kids.filter(k => k.id === activeKidId);
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  React.useEffect(() => {
    if (activeKidId && selectedKid !== activeKidId) setSelectedKid(activeKidId);
  }, [activeKidId]);
  const [showAdd, setShowAdd] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const items = portfolio[selectedKid] || [];
  const submit = () => {
    if (!title) return;
    addPortfolioItem(selectedKid, { title, url, desc });
    setTitle(''); setUrl(''); setDesc(''); setShowAdd(false);
  };
  const removeItem = (idx) => {
    const list = portfolio[selectedKid] || [];
    setPortfolioP({ ...portfolio, [selectedKid]: list.filter((_, i) => i !== idx) });
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <SectionHeader title={t('portfolio')} subtitle={L('Showcase sản phẩm các bạn build', 'Showcase what kids build')} emoji="🖼️" />
        <Btn onClick={() => setShowAdd(true)} color={C.sky} icon={Plus}>{t('addPortfolio')}</Btn>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {visibleKids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}><span style={{ fontSize: 20 }}>{k.emoji}</span> {k.name} <span style={{ background: '#fff3', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>{(portfolio[k.id] || []).length}</span></button>
        ))}
      </div>

      {showAdd && (
        <Card accent={C.sky} style={{ marginBottom: 20, background: '#E5F3FF' }}>
          <h4 className="display" style={{ fontSize: 18, marginTop: 0 }}>🎨 {t('addPortfolio')}</h4>
          <input placeholder={t('portfolioTitle')} value={title} onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, marginBottom: 10, outline: 'none' }} />
          <input placeholder={t('portfolioUrl')} value={url} onChange={e => setUrl(e.target.value)}
            style={{ width: '100%', padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, marginBottom: 10, outline: 'none' }} />
          <textarea placeholder={t('portfolioDesc')} value={desc} onChange={e => setDesc(e.target.value)}
            style={{ width: '100%', padding: 10, border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, minHeight: 60, resize: 'vertical', marginBottom: 10, outline: 'none', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn onClick={submit} color={C.mint} icon={Save} style={{ flex: 1 }}>{t('save')}</Btn>
            <Btn onClick={() => setShowAdd(false)} color={C.mute} variant="outline">{t('cancel')}</Btn>
          </div>
        </Card>
      )}

      {items.length === 0 ? (
        <Card><div className="body-f" style={{ fontSize: 14, color: C.mute, fontStyle: 'italic', textAlign: 'center', padding: 40 }}>
          🎨 {L('Chưa có sản phẩm nào. Bấm "Thêm sản phẩm" để showcase!', 'No portfolio yet. Click "Add a project" to showcase!')}
        </div></Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {items.map((item, idx) => (
            <Card key={idx} accent={C.sky}>
              {item.url && (
                <div style={{ marginBottom: 12, borderRadius: 14, overflow: 'hidden', aspectRatio: '16/10', background: C.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.url) ? (
                    <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                  ) : (
                    <a href={item.url} target="_blank" rel="noreferrer" className="body-f" style={{ color: C.sky, fontWeight: 700, fontSize: 13 }}>🔗 {L('Xem link', 'View link')}</a>
                  )}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div className="display" style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>{item.title}</div>
                <button onClick={() => removeItem(idx)} className="btn-bounce" style={{ background: '#FFE5E5', border: 'none', padding: 6, borderRadius: 8, cursor: 'pointer' }}><X size={12} color={C.coral} /></button>
              </div>
              <div className="hand" style={{ fontSize: 14, color: C.purple }}>{item.date}</div>
              {item.desc && <div className="body-f" style={{ fontSize: 12, color: C.sub, marginTop: 8, lineHeight: 1.5 }}>{item.desc}</div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function LeaderboardTab({ kids, getOverall, streaks, unlockedBadges, t, L }) {
  const ranked = useMemo(() => {
    return kids.map(k => {
      const ov = getOverall(k.id);
      const s = streaks[k.id] || { count: 0, longest: 0 };
      const b = Object.keys(unlockedBadges[k.id] || {}).length;
      const score = ov.pct * 2 + s.longest * 5 + b * 10;
      return { ...k, ov, s, b, score };
    }).sort((a, b) => b.score - a.score);
  }, [kids, streaks, unlockedBadges]);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="fade-in">
      <SectionHeader title={t('leaderboard')} subtitle={L('So sánh vui — không phải áp lực', 'Friendly compare — not pressure')} emoji="📊" />

      <div style={{ background: 'linear-gradient(135deg, #FFD43B, #FF8787, #FF6B9D)', color: '#fff', padding: 20, borderRadius: 24, marginBottom: 24, textAlign: 'center' }}>
        <div className="hand" style={{ fontSize: 22, marginBottom: 4 }}>{L('Công thức', 'Formula')}</div>
        <div className="display" style={{ fontSize: 16, fontWeight: 700 }}>
          {L('Điểm = Tiến độ × 2 + Streak dài nhất × 5 + Huy hiệu × 10', 'Score = Progress × 2 + Longest streak × 5 + Badges × 10')}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
        {ranked.map((k, idx) => (
          <Card key={k.id} accent={k.color} style={{ background: idx === 0 ? `linear-gradient(135deg, #fff, ${k.color}15)` : '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ fontSize: idx < 3 ? 56 : 40, width: 64, textAlign: 'center' }} className={idx === 0 ? 'wiggle' : ''}>
                {idx < 3 ? medals[idx] : `#${idx + 1}`}
              </div>
              <div style={{ fontSize: 48 }}>{k.emoji}</div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{k.name}</div>
                <div className="body-f" style={{ fontSize: 12, color: C.sub, fontWeight: 600 }}>{k.age} {L('tuổi', 'years')}</div>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700, color: k.color }}>{k.ov.pct}%</div>
                  <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('progress')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700, color: C.coral }}>🔥{k.s.longest}</div>
                  <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('longestStreak')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700, color: C.gold }}>🏆{k.b}</div>
                  <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('badges')}</div>
                </div>
                <div style={{ textAlign: 'center', borderLeft: `2px solid ${C.border}`, paddingLeft: 16 }}>
                  <div className="display" style={{ fontSize: 28, fontWeight: 700, color: C.purple }}>{k.score}</div>
                  <div className="body-f" style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{t('score')}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px' }}>📈 {t('compareKids')}</h3>
        <ComparisonChart kids={ranked} L={L} />
      </Card>
    </div>
  );
}

function ComparisonChart({ kids, L }) {
  const max = Math.max(1, ...kids.map(k => k.score));
  return (
    <div>
      {kids.map(k => (
        <div key={k.id} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span className="body-f" style={{ fontSize: 13, fontWeight: 700 }}>{k.emoji} {k.name}</span>
            <span className="display" style={{ fontSize: 13, color: k.color, fontWeight: 700 }}>{k.score} {L('điểm', 'pts')}</span>
          </div>
          <div style={{ height: 14, background: C.soft, borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(k.score / max) * 100}%`, background: `linear-gradient(90deg, ${k.color}, ${k.color}cc)`, borderRadius: 7, transition: 'width 0.6s' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BadgesTab({ kids, unlockedBadges, t, L }) {
  const [selectedKid, setSelectedKid] = React.useState(kids[0]?.id);
  const kid = kids.find(k => k.id === selectedKid);
  const unlocked = unlockedBadges[selectedKid] || {};

  return (
    <div className="fade-in">
      <SectionHeader title={t('badges')} subtitle={L(`${BADGES.length} huy hiệu để mở khoá`, `${BADGES.length} badges to unlock`)} emoji="🏆" />

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}><span style={{ fontSize: 20 }}>{k.emoji}</span> {k.name}
          <span style={{ background: '#fff3', padding: '2px 8px', borderRadius: 999, fontSize: 11 }}>{Object.keys(unlockedBadges[k.id] || {}).length}/{BADGES.length}</span>
          </button>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FFD43B, #FF6B9D)', color: '#fff', padding: 22, borderRadius: 24, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -10, right: 10, fontSize: 80, opacity: 0.2 }} className="float-anim">🏆</div>
        <div className="hand" style={{ fontSize: 22 }}>{kid?.name} {L('đã mở', 'has unlocked')}</div>
        <div className="display" style={{ fontSize: 36, fontWeight: 700 }}>{Object.keys(unlocked).length} / {BADGES.length}</div>
        <ProgressBar pct={(Object.keys(unlocked).length / BADGES.length) * 100} color="#fff" height={6} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {BADGES.map(b => {
          const u = unlocked[b.id];
          return (
            <div key={b.id} className="card-hover" style={{
              background: u ? '#fff' : '#F5F0FA', borderRadius: 20, padding: 18, textAlign: 'center',
              border: `2px solid ${u ? C.gold : '#E5DBF0'}`, position: 'relative',
              opacity: u ? 1 : 0.55, boxShadow: u ? `0 6px 16px ${C.gold}30` : 'none',
            }}>
              {u && <div className="badge-glow" style={{ position: 'absolute', inset: 0, borderRadius: 20, opacity: 0.15, pointerEvents: 'none' }} />}
              <div style={{ fontSize: 56, marginBottom: 8, filter: u ? 'none' : 'grayscale(1)' }} className={u ? 'pop-in' : ''}>{b.emoji}</div>
              <div className="display" style={{ fontSize: 15, fontWeight: 700, color: u ? C.ink : C.mute, marginBottom: 4 }}>{L(b.vi, b.en)}</div>
              <div className="body-f" style={{ fontSize: 11, color: C.sub, lineHeight: 1.4, marginBottom: 8 }}>{L(b.desc_vi, b.desc_en)}</div>
              {u ? (
                <Pill color={C.mint}><Check size={11} /> {t('unlocked')} {new Date(u).toLocaleDateString()}</Pill>
              ) : (
                <Pill color={C.mute}><Lock size={11} /> {t('locked')}</Pill>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarTab({ kids, weeklyTasks, setTasksP, streaks, checkInToday, t, L }) {
  const today = new Date().toISOString().slice(0, 10);
  const wKey = (() => {
    const d = new Date(); const oj = new Date(d.getFullYear(), 0, 1);
    const w = Math.ceil(((d - oj) / 86400000 + oj.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${String(w).padStart(2, '0')}`;
  })();
  const [selectedKid, setSelectedKid] = React.useState(kids[0]?.id);
  const [newTask, setNewTask] = React.useState('');

  const tasksKey = `${selectedKid}-${wKey}`;
  const tasks = weeklyTasks[tasksKey] || [];

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasksP({ ...weeklyTasks, [tasksKey]: [...tasks, { text: newTask, done: false, id: Date.now() }] });
    setNewTask('');
  };
  const toggleTask = (id) => setTasksP({ ...weeklyTasks, [tasksKey]: tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) });
  const deleteTask = (id) => setTasksP({ ...weeklyTasks, [tasksKey]: tasks.filter(t => t.id !== id) });

  // 7-day calendar grid showing check-ins
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 13 + i);
    return d.toISOString().slice(0, 10);
  });

  return (
    <div className="fade-in">
      <SectionHeader title={t('calendar')} subtitle={L('Điểm danh hằng ngày · Task tuần này', 'Daily check-in · Weekly tasks')} emoji="📅" />

      {/* Kid selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 20 }}>{k.emoji}</span> {k.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20 }}>
        {/* Check-in & streak */}
        <Card accent={C.coral}>
          <h3 className="display" style={{ fontSize: 20, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            🔥 {t('streak')}
          </h3>
          {selectedKid && (() => {
            const s = streaks[selectedKid] || { count: 0, longest: 0, history: {} };
            const checkedToday = !!s.history[today];
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="display" style={{ fontSize: 48, fontWeight: 700, color: C.coral, lineHeight: 1 }}>{s.count}</div>
                    <div className="body-f" style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>{t('streak')}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="display" style={{ fontSize: 48, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{s.longest}</div>
                    <div className="body-f" style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>{t('longestStreak')}</div>
                  </div>
                </div>
                <Btn onClick={() => checkInToday(selectedKid)} color={C.coral} size="lg" disabled={checkedToday} icon={Check} style={{ width: '100%' }}>
                  {checkedToday ? `✅ ${t('checkedIn')}` : `🔥 ${t('checkIn')} ${t('today').toLowerCase()}`}
                </Btn>

                {/* 14-day grid */}
                <div style={{ marginTop: 18 }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{L('14 ngày qua', 'Last 14 days')}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                    {days.map(d => {
                      const ok = s.history[d];
                      const isToday = d === today;
                      return (
                        <div key={d} title={d} style={{
                          aspectRatio: '1', background: ok ? C.coral : isToday ? '#FFE5F1' : C.soft,
                          border: isToday ? `2px solid ${C.coral}` : 'none',
                          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, color: ok ? '#fff' : C.mute, fontWeight: 700,
                        }}>{ok ? '🔥' : new Date(d).getDate()}</div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </Card>

        {/* Weekly tasks */}
        <Card accent={C.sky}>
          <h3 className="display" style={{ fontSize: 20, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            📋 {t('weeklyTasks')}
          </h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder={L('Học 20 từ tiếng Anh...', 'Learn 20 English words...')}
              style={{ flex: 1, padding: '10px 14px', border: `2px solid ${C.border}`, borderRadius: 999, fontSize: 13, outline: 'none' }} />
            <Btn onClick={addTask} color={C.sky} icon={Plus}>{t('add')}</Btn>
          </div>
          {tasks.length === 0 && <div className="body-f" style={{ fontSize: 13, color: C.mute, fontStyle: 'italic', padding: 16, textAlign: 'center' }}>{L('Chưa có task. Thêm task đầu tiên!', 'No tasks yet. Add your first!')}</div>}
          {tasks.map(tk => (
            <div key={tk.id} className="body-f" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, marginBottom: 6, background: tk.done ? '#E5FAEB' : C.soft, borderRadius: 12, border: `1.5px solid ${tk.done ? C.mint : 'transparent'}` }}>
              <button onClick={() => toggleTask(tk.id)} className="btn-bounce" style={{
                width: 24, height: 24, borderRadius: '50%', border: `2px solid ${tk.done ? C.mint : C.mute}`,
                background: tk.done ? C.mint : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}>{tk.done && <Check size={14} />}</button>
              <span style={{ flex: 1, fontSize: 13, textDecoration: tk.done ? 'line-through' : 'none', color: tk.done ? C.mute : C.ink }}>{tk.text}</span>
              <button onClick={() => deleteTask(tk.id)} className="btn-bounce" style={{ background: 'transparent', border: 'none', color: C.coral, cursor: 'pointer', padding: 4 }}><X size={16} /></button>
            </div>
          ))}
          {tasks.length > 0 && (
            <div className="body-f" style={{ marginTop: 12, fontSize: 12, color: C.sub, textAlign: 'center', fontWeight: 600 }}>
              {tasks.filter(t => t.done).length} / {tasks.length} {L('hoàn thành', 'done')}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// PILLAR: STUDIO SÁNG TẠO
// ============================================================
function StudioCreativeTab({ kids, creativeWorks, setCreativeP, activeKidId, t, L, lang }) {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [brushColor, setBrushColor] = React.useState('#845EC2');
  const [brushSize, setBrushSize] = React.useState(4);
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);

  const todayPrompt = React.useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return CREATIVE_PROMPTS[dayOfYear % CREATIVE_PROMPTS.length];
  }, []);

  const colors = ['#2D1B4E', '#845EC2', '#FF6B9D', '#4DABF7', '#51CF66', '#FFD43B', '#FF8787', '#FFB800', '#FFFFFF'];

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveDrawing = () => {
    const dataUrl = canvasRef.current?.toDataURL('image/png');
    if (!dataUrl || !selectedKid) return;
    const kidWorks = creativeWorks[selectedKid] || [];
    const updated = { ...creativeWorks, [selectedKid]: [...kidWorks, { date: new Date().toISOString(), prompt: lang === 'vi' ? todayPrompt.vi : todayPrompt.en, dataUrl }] };
    setCreativeP(updated);
  };

  const kidWorks = (creativeWorks[selectedKid] || []).slice().reverse();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (ctx) { ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    }
  }, []);

  return (
    <div className="fade-in">
      <SectionHeader title={t('studioCreative')} subtitle={L('Canvas vẽ, prompt sáng tạo hằng ngày', 'Drawing canvas, daily creative prompts')} emoji="🎨" />

      <Card accent={C.pink} padding={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Sparkles size={20} color={C.pink} />
          <div>
            <div className="display" style={{ fontSize: 14, fontWeight: 700, color: C.pink }}>{L('Thử thách sáng tạo hôm nay', 'Today\'s Creative Challenge')}</div>
            <div className="body-f" style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginTop: 4 }}>{L(todayPrompt.vi, todayPrompt.en)}</div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{k.emoji} {k.name}</button>
        ))}
      </div>

      <Card accent={C.purple}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {colors.map(c => (
            <button key={c} onClick={() => setBrushColor(c)} className="btn-bounce" style={{
              width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer',
              border: brushColor === c ? '3px solid #2D1B4E' : '2px solid #F0E6FF',
              boxShadow: brushColor === c ? '0 0 0 2px #fff, 0 0 0 4px #845EC2' : 'none',
            }} />
          ))}
          <span className="body-f" style={{ fontSize: 11, color: C.mute, marginLeft: 8 }}>{L('Cỡ cọ', 'Brush')}:</span>
          {[2, 4, 8, 14].map(s => (
            <button key={s} onClick={() => setBrushSize(s)} className="btn-bounce" style={{
              width: s + 16, height: s + 16, borderRadius: '50%', background: brushSize === s ? C.purple : C.soft,
              border: `2px solid ${brushSize === s ? C.purple : C.border}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: s, height: s, borderRadius: '50%', background: brushSize === s ? '#fff' : C.mute }} />
            </button>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
          style={{ width: '100%', height: 360, borderRadius: 16, border: `2px solid ${C.border}`, cursor: 'crosshair', touchAction: 'none' }}
        />

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Btn onClick={saveDrawing} color={C.mint} icon={Save}>{L('Lưu tác phẩm', 'Save artwork')}</Btn>
          <Btn onClick={clearCanvas} color={C.coral} variant="outline" icon={RotateCw}>{L('Xoá canvas', 'Clear')}</Btn>
        </div>
      </Card>

      {kidWorks.length > 0 && (
        <Card accent={C.sky} style={{ marginTop: 16 }}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px' }}>🖼️ {L('Tác phẩm đã lưu', 'Saved artworks')} ({kidWorks.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {kidWorks.slice(0, 12).map((w, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: `2px solid ${C.border}`, background: '#fff' }}>
                <img src={w.dataUrl} alt={w.prompt} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                <div style={{ padding: 8 }}>
                  <div className="body-f" style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>{w.prompt}</div>
                  <div className="body-f" style={{ fontSize: 10, color: C.mute, marginTop: 2 }}>{new Date(w.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ============================================================
// PILLAR: CƠ THỂ & VẬN ĐỘNG
// ============================================================
function BodyMovementTab({ kids, exerciseLog, setExerciseP, activeKidId, t, L, lang }) {
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  const [timerActive, setTimerActive] = React.useState(false);
  const [timerSeconds, setTimerSeconds] = React.useState(0);
  const [timerTarget, setTimerTarget] = React.useState(60);
  const [currentChallenge, setCurrentChallenge] = React.useState(null);
  const [breathPhase, setBreathPhase] = React.useState(null); // 'in' | 'out' | null
  const [breathCount, setBreathCount] = React.useState(0);
  const timerRef = React.useRef(null);
  const breathRef = React.useRef(null);

  const todayStr = new Date().toISOString().slice(0, 10);
  const kidLog = (exerciseLog[selectedKid] || []);
  const todayExercises = kidLog.filter(e => e.date.startsWith(todayStr));
  const todayMinutes = todayExercises.reduce((s, e) => s + (e.duration || 0), 0);

  const pickChallenge = () => {
    const idx = Math.floor(Math.random() * EXERCISE_CHALLENGES.length);
    const ch = EXERCISE_CHALLENGES[idx];
    setCurrentChallenge(ch);
    setTimerTarget(ch.duration * 60);
    setTimerSeconds(0);
  };

  const startTimer = () => { setTimerActive(true); setTimerSeconds(0); };
  const stopTimer = () => {
    setTimerActive(false);
    if (currentChallenge && timerSeconds > 0) {
      const entry = { date: new Date().toISOString(), exercise: lang === 'vi' ? currentChallenge.vi : currentChallenge.en, duration: Math.ceil(timerSeconds / 60), emoji: currentChallenge.emoji };
      const updated = { ...exerciseLog, [selectedKid]: [...kidLog, entry] };
      setExerciseP(updated);
    }
    setTimerSeconds(0);
  };

  React.useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const startBreathing = () => {
    setBreathPhase('in');
    setBreathCount(0);
    let count = 0;
    breathRef.current = setInterval(() => {
      count++;
      if (count >= 15) { clearInterval(breathRef.current); setBreathPhase(null); return; }
      setBreathPhase(p => p === 'in' ? 'out' : 'in');
      setBreathCount(count);
    }, 4000);
  };

  React.useEffect(() => () => clearInterval(breathRef.current), []);

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const pct = timerTarget > 0 ? Math.min(100, Math.round((timerSeconds / timerTarget) * 100)) : 0;

  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const mins = kidLog.filter(e => e.date.startsWith(ds)).reduce((s, e) => s + (e.duration || 0), 0);
    last7.push({ date: ds, mins, day: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()] });
  }
  const maxMins = Math.max(30, ...last7.map(d => d.mins));

  return (
    <div className="fade-in">
      <SectionHeader title={t('bodyMovement')} subtitle={L('Thể dục, thử thách vận động, thở chánh niệm', 'Exercise, movement challenges, mindful breathing')} emoji="🤸" />

      <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{k.emoji} {k.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* Challenge card */}
        <Card accent={C.coral}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            🎯 {L('Thử thách vận động', 'Movement Challenge')}
          </h3>
          {currentChallenge ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{currentChallenge.emoji}</div>
              <div className="display" style={{ fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 12 }}>
                {L(currentChallenge.vi, currentChallenge.en)}
              </div>
              <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 16px', borderRadius: '50%', background: C.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="140" height="140" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                  <circle cx="70" cy="70" r="60" fill="none" stroke={C.border} strokeWidth="8" />
                  <circle cx="70" cy="70" r="60" fill="none" stroke={timerActive ? C.coral : C.mint} strokeWidth="8" strokeDasharray={`${pct * 3.77} 377`} strokeLinecap="round" />
                </svg>
                <div className="display" style={{ fontSize: 28, fontWeight: 700, color: timerActive ? C.coral : C.ink }}>{fmtTime(timerSeconds)}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {!timerActive ? (
                  <Btn onClick={startTimer} color={C.mint} icon={Zap}>{L('Bắt đầu', 'Start')}</Btn>
                ) : (
                  <Btn onClick={stopTimer} color={C.coral} icon={Check}>{L('Xong!', 'Done!')}</Btn>
                )}
                <Btn onClick={pickChallenge} color={C.sky} variant="outline" icon={RotateCw}>{L('Đổi', 'Change')}</Btn>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>💪</div>
              <Btn onClick={pickChallenge} color={C.coral} icon={Zap}>{L('Bốc thử thách!', 'Pick a challenge!')}</Btn>
            </div>
          )}
        </Card>

        {/* Mindful breathing */}
        <Card accent={C.purple}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            🧘 {L('Thở chánh niệm 1 phút', '1-Minute Mindful Breathing')}
          </h3>
          <div style={{ textAlign: 'center', padding: 16 }}>
            {breathPhase ? (
              <>
                <div style={{
                  width: 120, height: 120, borderRadius: '50%', margin: '0 auto 16px',
                  background: breathPhase === 'in' ? 'linear-gradient(135deg, #845EC2, #FF6B9D)' : 'linear-gradient(135deg, #4DABF7, #51CF66)',
                  transform: breathPhase === 'in' ? 'scale(1.3)' : 'scale(0.8)',
                  transition: 'all 3.5s ease-in-out',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 24, color: '#fff', fontWeight: 700 }}>
                    {breathPhase === 'in' ? L('Hít vào', 'Breathe in') : L('Thở ra', 'Breathe out')}
                  </span>
                </div>
                <div className="body-f" style={{ fontSize: 13, color: C.sub }}>{Math.ceil((15 - breathCount) * 4 / 60)} {L('phút còn lại', 'min left')}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🫧</div>
                <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 16 }}>
                  {L('Ngồi thoải mái, nhắm mắt, theo hướng dẫn hít thở 4 giây', 'Sit comfortably, close your eyes, follow the 4-second breathing guide')}
                </div>
                <Btn onClick={startBreathing} color={C.purple} icon={Heart}>{L('Bắt đầu thở', 'Start breathing')}</Btn>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Today summary */}
      <Card accent={C.mint} style={{ marginTop: 16 }}>
        <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          📊 {L('Hôm nay', 'Today')} — {todayMinutes} {L('phút vận động', 'min of movement')}
        </h3>
        {todayExercises.length === 0 ? (
          <div className="body-f" style={{ fontSize: 13, color: C.mute, fontStyle: 'italic', textAlign: 'center', padding: 12 }}>
            {L('Chưa có hoạt động hôm nay. Bốc thử thách đi con!', 'No activities today. Pick a challenge!')}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {todayExercises.map((e, i) => (
              <Pill key={i} color={C.mint}>{e.emoji} {e.exercise} · {e.duration}m</Pill>
            ))}
          </div>
        )}
      </Card>

      {/* 7-day chart */}
      <Card accent={C.sky} style={{ marginTop: 16 }}>
        <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px' }}>📈 {L('7 ngày gần nhất', 'Last 7 days')}</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {last7.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div className="body-f" style={{ fontSize: 10, fontWeight: 700, color: C.sub }}>{d.mins}m</div>
              <div style={{
                width: '100%', maxWidth: 36, borderRadius: 8,
                height: Math.max(4, (d.mins / maxMins) * 80),
                background: d.date === todayStr ? `linear-gradient(135deg, ${C.coral}, ${C.pink})` : C.sky,
                transition: 'height 0.3s',
              }} />
              <div className="body-f" style={{ fontSize: 10, fontWeight: 700, color: d.date === todayStr ? C.coral : C.mute }}>{d.day}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// PILLAR: TỰ KHÁM PHÁ
// ============================================================
function SelfDiscoveryTab({ kids, moodLog, setMoodP, riasecAnswers, setRiasecAnsP, riasecCompleted, setRiasecDoneP, activeKidId, t, L, lang, fireConfetti }) {
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  const [moodNote, setMoodNote] = React.useState('');
  const [riasecStep, setRiasecStep] = React.useState(0); // 0 = not started
  const [showResults, setShowResults] = React.useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);
  const moodKey = `${selectedKid}-${todayStr}`;
  const todayMood = moodLog[moodKey];
  const kid = kids.find(k => k.id === selectedKid);
  const kidAge = kid?.age || 10;
  const questions = kidAge <= 12 ? RIASEC_JUNIOR_8_12 : RIASEC_JUNIOR_13_15;
  const kidAnswers = riasecAnswers[selectedKid] || {};
  const kidResult = riasecCompleted[selectedKid];
  const answeredCount = Object.keys(kidAnswers).length;

  const saveMood = (value) => {
    const updated = { ...moodLog, [moodKey]: { mood: value, note: moodNote, date: new Date().toISOString() } };
    setMoodP(updated);
    setMoodNote('');
  };

  const answerRiasec = (qId, score) => {
    const updated = { ...riasecAnswers, [selectedKid]: { ...kidAnswers, [qId]: score } };
    setRiasecAnsP(updated);
    setTimeout(() => setRiasecStep(s => s + 1), 300);
  };

  const finishRiasec = () => {
    const results = scoreRiasec(kidAnswers, questions);
    const updated = { ...riasecCompleted, [selectedKid]: { date: new Date().toISOString(), results } };
    setRiasecDoneP(updated);
    setRiasecStep(0);
    setShowResults(true);
    fireConfetti();
  };

  const resetRiasec = () => {
    const updatedAns = { ...riasecAnswers }; delete updatedAns[selectedKid];
    const updatedDone = { ...riasecCompleted }; delete updatedDone[selectedKid];
    setRiasecAnsP(updatedAns);
    setRiasecDoneP(updatedDone);
    setRiasecStep(0);
    setShowResults(false);
  };

  // Mood history (last 7 days)
  const moodHistory = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const m = moodLog[`${selectedKid}-${ds}`];
    moodHistory.push({ date: ds, mood: m, day: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()] });
  }

  return (
    <div className="fade-in">
      <SectionHeader title={t('selfDiscovery')} subtitle={L('Nhật ký cảm xúc, khám phá bản thân qua RIASEC', 'Mood journal, self-discovery via RIASEC quiz')} emoji="🔮" />

      <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => { setSelectedKid(k.id); setRiasecStep(0); setShowResults(false); }} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{k.emoji} {k.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* Mood Journal */}
        <Card accent={C.sunny}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            {todayMood ? '✅' : '☁️'} {L('Cảm xúc hôm nay', 'Today\'s Mood')}
          </h3>
          {todayMood ? (
            <div style={{ textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 48 }}>{MOOD_OPTIONS.find(m => m.value === todayMood.mood)?.emoji || '⛅'}</div>
              <div className="body-f" style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 8 }}>
                {L(MOOD_OPTIONS.find(m => m.value === todayMood.mood)?.vi, MOOD_OPTIONS.find(m => m.value === todayMood.mood)?.en)}
              </div>
              {todayMood.note && <div className="body-f" style={{ fontSize: 13, color: C.sub, marginTop: 6, fontStyle: 'italic' }}>"{todayMood.note}"</div>}
              <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 8 }}>✅ {L('Đã ghi nhận!', 'Recorded!')}</div>
            </div>
          ) : (
            <>
              <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 12 }}>
                {L('Hôm nay con thấy thế nào?', 'How are you feeling today?')}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
                {MOOD_OPTIONS.map(m => (
                  <button key={m.value} onClick={() => saveMood(m.value)} className="btn-bounce" style={{
                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'center', padding: 8,
                  }}>
                    <div style={{ fontSize: 32 }}>{m.emoji}</div>
                    <div className="body-f" style={{ fontSize: 10, fontWeight: 700, color: C.sub, marginTop: 4 }}>{L(m.vi, m.en)}</div>
                  </button>
                ))}
              </div>
              <input value={moodNote} onChange={e => setMoodNote(e.target.value)} placeholder={L('Ghi chú thêm (tuỳ chọn)...', 'Optional note...')}
                style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.border}`, borderRadius: 999, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            </>
          )}
        </Card>

        {/* Mood 7-day */}
        <Card accent={C.pink}>
          <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px' }}>📅 {L('Cảm xúc 7 ngày', '7-Day Mood')}</h3>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {moodHistory.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 24 }}>{d.mood ? (MOOD_OPTIONS.find(m => m.value === d.mood.mood)?.emoji || '⛅') : '·'}</div>
                <div className="body-f" style={{ fontSize: 10, fontWeight: 700, color: d.date === todayStr ? C.pink : C.mute, marginTop: 4 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* RIASEC Quiz */}
      <Card accent={C.purple} style={{ marginTop: 16 }}>
        <h3 className="display" style={{ fontSize: 20, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
          🧭 {L('Khám phá RIASEC Junior', 'RIASEC Junior Discovery')}
        </h3>
        <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 16 }}>
          {L(
            `${questions.length} câu hỏi giúp con hiểu mình thích gì — không có đúng sai!`,
            `${questions.length} questions to help you understand what you enjoy — no right or wrong!`
          )}
          {kidAge <= 12 ? ` (8-12 ${L('tuổi', 'years')})` : ` (13-15 ${L('tuổi', 'years')})`}
        </div>

        {(showResults || kidResult) && !riasecStep ? (
          /* Results view */
          (() => {
            const results = kidResult?.results || scoreRiasec(kidAnswers, questions);
            const top3 = results.slice(0, 3);
            return (
              <div>
                <div className="body-f" style={{ fontSize: 12, color: C.mute, marginBottom: 12 }}>
                  {kidResult?.date && `${L('Làm ngày', 'Taken on')}: ${new Date(kidResult.date).toLocaleDateString()}`}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  {top3.map((r, i) => {
                    const info = RIASEC_TYPES.find(t => t.type === r.type);
                    if (!info) return null;
                    return (
                      <div key={r.type} style={{ background: i === 0 ? `linear-gradient(135deg, ${info.color}15, ${info.color}30)` : C.soft, borderRadius: 16, padding: 16, border: i === 0 ? `2px solid ${info.color}` : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: 28 }}>{info.emoji}</span>
                          <div>
                            <div className="display" style={{ fontSize: 15, fontWeight: 700, color: info.color }}>#{i + 1} {L(info.vi_name, info.en_name)}</div>
                            <div className="body-f" style={{ fontSize: 11, color: C.sub }}>{L(`Điểm: ${r.score}`, `Score: ${r.score}`)}</div>
                          </div>
                        </div>
                        <div className="body-f" style={{ fontSize: 12, color: C.sub, marginBottom: 8 }}>{L(info.vi_desc, info.en_desc)}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {(L(info.vi_careers, info.en_careers)).slice(0, 5).map(c => <Pill key={c} color={info.color}>{c}</Pill>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* All 6 types bar chart */}
                <div style={{ marginTop: 16 }}>
                  {results.map(r => {
                    const info = RIASEC_TYPES.find(t => t.type === r.type);
                    const maxScore = questions.length / 6 * 5;
                    return (
                      <div key={r.type} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ width: 24, textAlign: 'center', fontSize: 16 }}>{info?.emoji}</span>
                        <span className="body-f" style={{ width: 80, fontSize: 12, fontWeight: 700, color: C.ink }}>{L(info?.vi_name, info?.en_name)}</span>
                        <div style={{ flex: 1, height: 14, background: C.soft, borderRadius: 99, overflow: 'hidden' }}>
                          <div style={{ width: `${(r.score / maxScore) * 100}%`, height: '100%', background: info?.color, borderRadius: 99, transition: 'width 0.5s' }} />
                        </div>
                        <span className="body-f" style={{ width: 30, fontSize: 12, fontWeight: 700, color: C.sub, textAlign: 'right' }}>{r.score}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <Btn onClick={resetRiasec} color={C.coral} variant="outline" icon={RotateCw}>{L('Làm lại', 'Retake')}</Btn>
                </div>
              </div>
            );
          })()
        ) : riasecStep > 0 ? (
          /* Quiz in progress */
          (() => {
            const q = questions[riasecStep - 1];
            if (!q) {
              return (
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <div className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{L('Hoàn thành!', 'Complete!')}</div>
                  <Btn onClick={finishRiasec} color={C.purple} icon={Award}>{L('Xem kết quả', 'See results')}</Btn>
                </div>
              );
            }
            return (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Pill color={C.purple}>{riasecStep} / {questions.length}</Pill>
                  <div style={{ flex: 1, height: 6, background: C.soft, borderRadius: 99, margin: '0 12px', overflow: 'hidden' }}>
                    <div style={{ width: `${(riasecStep / questions.length) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${C.purple}, ${C.pink})`, borderRadius: 99, transition: 'width 0.3s' }} />
                  </div>
                </div>
                <div className="display" style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 16, lineHeight: 1.5 }}>
                  {L(q.vi, q.en)}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    { score: 1, vi: 'Không thích', en: 'Dislike', bg: '#FFE5E5' },
                    { score: 2, vi: 'Bình thường', en: 'Neutral', bg: '#FFF4D1' },
                    { score: 3, vi: 'Hơi thích', en: 'Somewhat', bg: '#E5F3FF' },
                    { score: 4, vi: 'Thích', en: 'Like', bg: '#E5FAEB' },
                    { score: 5, vi: 'Rất thích!', en: 'Love it!', bg: '#F3E5FF' },
                  ].map(opt => {
                    const selected = kidAnswers[q.id] === opt.score;
                    return (
                      <button key={opt.score} onClick={() => answerRiasec(q.id, opt.score)} className="btn-bounce body-f" style={{
                        background: selected ? C.purple : opt.bg, color: selected ? '#fff' : C.ink,
                        border: `2px solid ${selected ? C.purple : 'transparent'}`,
                        padding: '10px 16px', borderRadius: 14, cursor: 'pointer', fontWeight: 700, fontSize: 13,
                        minWidth: 90, transition: 'all 0.15s',
                      }}>
                        {L(opt.vi, opt.en)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()
        ) : (
          /* Not started */
          <div style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🧭</div>
            {kidResult ? (
              <>
                <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 12 }}>
                  {L('Con đã làm quiz rồi! Xem kết quả hoặc làm lại.', 'You already took the quiz! View results or retake.')}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <Btn onClick={() => setShowResults(true)} color={C.purple} icon={Award}>{L('Xem kết quả', 'View results')}</Btn>
                  <Btn onClick={resetRiasec} color={C.coral} variant="outline" icon={RotateCw}>{L('Làm lại', 'Retake')}</Btn>
                </div>
              </>
            ) : (
              <>
                <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 16 }}>
                  {L('Trả lời từng câu để tìm hiểu con thích gì nhất!', 'Answer each question to discover what you enjoy most!')}
                </div>
                <Btn onClick={() => setRiasecStep(1)} color={C.purple} icon={Sparkles}>{L('Bắt đầu khám phá!', 'Start exploring!')}</Btn>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

// ============================================================
// PILLAR: LA BÀN NGHỀ NGHIỆP (Career Compass)
// ============================================================
function CareerCompassTab({ kids, savedCareers, setSavedCareersP, riasecCompleted, activeKidId, t, L, lang }) {
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  const [filterType, setFilterType] = React.useState(null); // null | 'R'|'I'|'A'|'S'|'E'|'C'
  const [filterAge, setFilterAge] = React.useState(null);
  const [openCareer, setOpenCareer] = React.useState(null); // career object for modal
  const [view, setView] = React.useState('explore'); // 'explore' | 'saved' | 'recommended'

  const kid = kids.find(k => k.id === selectedKid);
  const kidAge = kid?.age || 10;
  const kidSaved = savedCareers[selectedKid] || [];
  const riasecResult = riasecCompleted[selectedKid];

  const careerOfDay = React.useMemo(() => getCareerOfDay(), []);

  const todayProject = React.useMemo(() => {
    if (!riasecResult?.results) return null;
    const topType = riasecResult.results[0].type;
    return getProjectForType(topType);
  }, [riasecResult]);

  const recommended = React.useMemo(() => {
    if (!riasecResult?.results) return [];
    const top3Types = riasecResult.results.slice(0, 3).map(r => r.type);
    return CAREERS.filter(c => top3Types.includes(c.type)).slice(0, 12);
  }, [riasecResult]);

  let filtered = CAREERS;
  if (filterType) filtered = filtered.filter(c => c.type === filterType);
  if (filterAge) filtered = filtered.filter(c => c.min_age <= filterAge);

  const list = view === 'saved'
    ? CAREERS.filter(c => kidSaved.includes(c.id))
    : view === 'recommended' ? recommended : filtered;

  const toggleSave = (careerId) => {
    const current = savedCareers[selectedKid] || [];
    const updated = current.includes(careerId)
      ? current.filter(id => id !== careerId)
      : [...current, careerId];
    setSavedCareersP({ ...savedCareers, [selectedKid]: updated });
  };

  const isSaved = (careerId) => kidSaved.includes(careerId);

  const typeColors = { R: '#4DABF7', I: '#845EC2', A: '#FF6B9D', S: '#51CF66', E: '#FFD43B', C: '#FF8787' };

  return (
    <div className="fade-in">
      <SectionHeader title={t('careerCompass')} subtitle={L('60 nghề nghiệp với góc nhìn Việt Nam', '60 careers with Vietnam perspective')} emoji="🧭" />

      <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{k.emoji} {k.name}</button>
        ))}
      </div>

      {/* Career of the Day + Today Project */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>
        <Card accent={typeColors[careerOfDay.type]}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: typeColors[careerOfDay.type], textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            ⭐ {L('Nghề nghiệp hôm nay', 'Career of the Day')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 40 }}>{careerOfDay.emoji}</span>
            <div>
              <div className="display" style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{L(careerOfDay.vi_name, careerOfDay.en_name)}</div>
              <div className="body-f" style={{ fontSize: 12, color: C.sub }}>{L(careerOfDay.vi_desc, careerOfDay.en_desc)}</div>
            </div>
          </div>
          <Btn onClick={() => setOpenCareer(careerOfDay)} color={typeColors[careerOfDay.type]} size="sm">{L('Xem chi tiết', 'View details')}</Btn>
        </Card>

        {todayProject ? (
          <Card accent={C.coral}>
            <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.coral, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              🎯 {L('Ngày làm 1 nghề (gợi ý)', 'Day-in-the-life mini-project')}
            </div>
            <div className="body-f" style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>
              {L(todayProject.vi, todayProject.en)}
            </div>
            <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 8, fontStyle: 'italic' }}>
              {L('Dựa trên kết quả RIASEC của con', 'Based on your RIASEC results')}
            </div>
          </Card>
        ) : (
          <Card accent={C.purple}>
            <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              🔮 {L('Làm RIASEC quiz để có gợi ý', 'Take RIASEC quiz for suggestions')}
            </div>
            <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 8 }}>
              {L('Sau khi làm xong, em sẽ gợi ý nghề + project mỗi ngày dựa trên tính cách của con.', 'After completing, I\'ll suggest careers + daily projects based on your personality.')}
            </div>
            <div className="body-f" style={{ fontSize: 11, color: C.mute, fontStyle: 'italic' }}>
              {L('Vào tab Tự khám phá 🔮 để bắt đầu', 'Go to Self Discovery 🔮 tab to start')}
            </div>
          </Card>
        )}
      </div>

      {/* View tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <button onClick={() => setView('explore')} className="btn-bounce body-f" style={{
          background: view === 'explore' ? C.purple : '#fff', color: view === 'explore' ? '#fff' : C.purple,
          border: `2px solid ${C.purple}`, padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 13,
        }}>🔍 {L('Khám phá', 'Explore')} ({CAREERS.length})</button>
        <button onClick={() => setView('recommended')} disabled={!riasecResult} className="btn-bounce body-f" style={{
          background: view === 'recommended' ? C.pink : '#fff', color: view === 'recommended' ? '#fff' : (riasecResult ? C.pink : C.mute),
          border: `2px solid ${riasecResult ? C.pink : C.border}`, padding: '8px 16px', borderRadius: 999,
          cursor: riasecResult ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: 13, opacity: riasecResult ? 1 : 0.5,
        }}>⭐ {L('Đề xuất cho con', 'Recommended')} ({recommended.length})</button>
        <button onClick={() => setView('saved')} className="btn-bounce body-f" style={{
          background: view === 'saved' ? C.gold : '#fff', color: view === 'saved' ? '#fff' : C.gold,
          border: `2px solid ${C.gold}`, padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 13,
        }}>❤️ {L('Đã lưu', 'Saved')} ({kidSaved.length})</button>
      </div>

      {/* RIASEC type filter (only in explore view) */}
      {view === 'explore' && (
        <Card accent={C.sky} padding={16} style={{ marginBottom: 16 }}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {L('Lọc theo loại tính cách', 'Filter by personality type')}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setFilterType(null)} className="btn-bounce body-f" style={{
              background: !filterType ? C.ink : '#fff', color: !filterType ? '#fff' : C.ink,
              border: `2px solid ${C.ink}`, padding: '4px 10px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 11,
            }}>{L('Tất cả', 'All')}</button>
            {RIASEC_TYPES.map(rt => (
              <button key={rt.type} onClick={() => setFilterType(filterType === rt.type ? null : rt.type)} className="btn-bounce body-f" style={{
                background: filterType === rt.type ? rt.color : '#fff', color: filterType === rt.type ? '#fff' : rt.color,
                border: `2px solid ${rt.color}`, padding: '4px 10px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 11,
              }}>{rt.emoji} {L(rt.vi_name, rt.en_name)}</button>
            ))}
          </div>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginTop: 12, marginBottom: 8 }}>
            {L('Tuổi phù hợp', 'Age-appropriate')}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setFilterAge(null)} className="btn-bounce body-f" style={{
              background: !filterAge ? C.ink : '#fff', color: !filterAge ? '#fff' : C.ink,
              border: `2px solid ${C.ink}`, padding: '4px 10px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 11,
            }}>{L('Mọi tuổi', 'Any age')}</button>
            <button onClick={() => setFilterAge(kidAge)} className="btn-bounce body-f" style={{
              background: filterAge === kidAge ? C.pink : '#fff', color: filterAge === kidAge ? '#fff' : C.pink,
              border: `2px solid ${C.pink}`, padding: '4px 10px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 11,
            }}>{L(`Phù hợp ${kid?.name} (${kidAge}t)`, `For ${kid?.name} (${kidAge}yo)`)}</button>
          </div>
        </Card>
      )}

      {/* Career cards grid */}
      {list.length === 0 ? (
        <Card accent={C.mute}>
          <div className="body-f" style={{ fontSize: 13, color: C.mute, fontStyle: 'italic', textAlign: 'center', padding: 20 }}>
            {view === 'saved'
              ? L('Chưa có nghề nghiệp nào lưu. Khám phá và bấm ❤️ để lưu!', 'No saved careers yet. Explore and tap ❤️ to save!')
              : L('Không có nghề nghiệp khớp với bộ lọc.', 'No careers match your filter.')}
          </div>
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {list.map(c => {
            const typeInfo = RIASEC_TYPES.find(t => t.type === c.type);
            return (
              <div key={c.id} style={{ background: '#fff', borderRadius: 16, padding: 16, border: `2px solid ${C.border}`, position: 'relative', cursor: 'pointer' }}
                onClick={() => setOpenCareer(c)}>
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <button onClick={(e) => { e.stopPropagation(); toggleSave(c.id); }} className="btn-bounce" style={{
                    background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 22,
                  }} aria-label={isSaved(c.id) ? 'Unsave' : 'Save'}>
                    {isSaved(c.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{c.emoji}</div>
                <div className="display" style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 4 }}>
                  {L(c.vi_name, c.en_name)}
                </div>
                <Pill color={typeColors[c.type]}>{typeInfo?.emoji} {L(typeInfo?.vi_name, typeInfo?.en_name)}</Pill>
                <div className="body-f" style={{ fontSize: 12, color: C.sub, marginTop: 8, lineHeight: 1.5 }}>
                  {L(c.vi_desc, c.en_desc)}
                </div>
                <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 8 }}>
                  {L(`Bắt đầu từ ${c.min_age} tuổi`, `Start age ${c.min_age}`)} · {c.vn_salary && L(`Lương ${c.vn_salary}`, `Salary ${c.vn_salary}`)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Career detail modal */}
      {openCareer && (
        <div onClick={() => setOpenCareer(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(45,27,78,0.6)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(4px)',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 24, maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto',
            padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 56 }}>{openCareer.emoji}</div>
                <div className="display" style={{ fontSize: 22, fontWeight: 700, color: C.ink, marginTop: 4 }}>
                  {L(openCareer.vi_name, openCareer.en_name)}
                </div>
                <Pill color={typeColors[openCareer.type]}>
                  {RIASEC_TYPES.find(t => t.type === openCareer.type)?.emoji} {L(RIASEC_TYPES.find(t => t.type === openCareer.type)?.vi_name, RIASEC_TYPES.find(t => t.type === openCareer.type)?.en_name)}
                </Pill>
              </div>
              <button onClick={() => setOpenCareer(null)} className="btn-bounce" style={{
                background: C.soft, border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><X size={18} /></button>
            </div>

            <div className="body-f" style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 16 }}>
              {L(openCareer.vi_desc, openCareer.en_desc)}
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  💪 {L('Kỹ năng cần thiết', 'Key skills')}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(L(openCareer.vi_skills, openCareer.en_skills) || []).map(s => <Pill key={s} color={C.sky}>{s}</Pill>)}
                </div>
              </div>

              <div>
                <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  🛤️ {L('Lộ trình bắt đầu', 'How to start')}
                </div>
                <div className="body-f" style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, background: C.soft, padding: 12, borderRadius: 12 }}>
                  {L(openCareer.vi_path, openCareer.en_path)}
                </div>
              </div>

              <div>
                <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  🇻🇳 {L('Bối cảnh Việt Nam', 'Vietnam context')}
                </div>
                <div className="body-f" style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, background: '#FFF4D1', padding: 12, borderRadius: 12 }}>
                  {openCareer.vn_context}
                </div>
                {openCareer.vn_example && (
                  <div className="body-f" style={{ fontSize: 12, color: C.mute, marginTop: 6, fontStyle: 'italic' }}>
                    💡 {L('Ví dụ:', 'Example:')} {openCareer.vn_example}
                  </div>
                )}
                {openCareer.vn_salary && (
                  <div className="body-f" style={{ fontSize: 12, color: C.mint, marginTop: 6, fontWeight: 700 }}>
                    💰 {L('Mức lương:', 'Salary:')} {openCareer.vn_salary}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <Btn onClick={() => toggleSave(openCareer.id)} color={isSaved(openCareer.id) ? C.coral : C.gold} icon={Heart}>
                {isSaved(openCareer.id) ? L('Bỏ lưu', 'Unsave') : L('Lưu nghề này', 'Save career')}
              </Btn>
              <Btn onClick={() => setOpenCareer(null)} color={C.mute} variant="outline">{L('Đóng', 'Close')}</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PILLAR: CẦU NỐI GIA ĐÌNH (Family Bridge)
// ============================================================
function FamilyBridgeTab({ kids, familyJournal, setFamilyJournalP, weeklyReviews, setWeeklyReviewsP, activeKidId, isParentAuthed, t, L, lang, weekKey }) {
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  const [newEntry, setNewEntry] = React.useState('');
  const [reviewAnswers, setReviewAnswers] = React.useState({});

  const askPrompt = React.useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return ASK_PARENT_PROMPTS[dayOfYear % ASK_PARENT_PROMPTS.length];
  }, []);

  const showTellOfWeek = React.useMemo(() => {
    const wk = new Date().getUTCDay() + Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
    return SHOW_TELL_IDEAS[wk % SHOW_TELL_IDEAS.length];
  }, []);

  const activityOfWeek = React.useMemo(() => {
    const wk = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
    return FAMILY_ACTIVITIES[wk % FAMILY_ACTIVITIES.length];
  }, []);

  const currentWeek = weekKey ? weekKey() : '';
  const reviewKey = `${selectedKid}-${currentWeek}`;
  const thisWeekReview = weeklyReviews[reviewKey];
  const reviewPrompts = WEEKLY_REVIEW_PROMPTS[lang === 'vi' ? 'vi' : 'en'];

  const addJournalEntry = () => {
    if (!newEntry.trim()) return;
    const author = isParentAuthed ? 'parent' : selectedKid;
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      author,
      kidId: selectedKid,
      authorName: isParentAuthed ? L('Bố/Mẹ', 'Parent') : (kids.find(k => k.id === selectedKid)?.name || 'Kid'),
      authorEmoji: isParentAuthed ? '👨‍👩‍👧' : (kids.find(k => k.id === selectedKid)?.emoji || '🌟'),
      content: newEntry,
    };
    setFamilyJournalP([entry, ...familyJournal]);
    setNewEntry('');
  };

  const submitReview = () => {
    const answers = reviewPrompts.map((p, i) => ({ q: p.q, a: reviewAnswers[i] || '' }));
    setWeeklyReviewsP({ ...weeklyReviews, [reviewKey]: { answers, date: new Date().toISOString() } });
    setReviewAnswers({});
  };

  const recentEntries = familyJournal.slice(0, 20);

  return (
    <div className="fade-in">
      <SectionHeader title={t('familyBridge')} subtitle={L('Sổ tay chung, review tuần, hỏi bố cha', 'Shared notebook, weekly review, ask parent')} emoji="👨‍👩‍👧" />

      <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{k.emoji} {k.name}</button>
        ))}
      </div>

      {/* 3 inspiration cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
        <Card accent={C.purple} padding={16}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            🤔 {L('Hỏi bố cha hôm nay', 'Ask parent today')}
          </div>
          <div className="body-f" style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>
            "{L(askPrompt.vi, askPrompt.en)}"
          </div>
        </Card>

        <Card accent={C.pink} padding={16}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            {showTellOfWeek.emoji} {L('Show & Tell tuần này', 'This week\'s Show & Tell')}
          </div>
          <div className="body-f" style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>
            {L(showTellOfWeek.vi, showTellOfWeek.en)}
          </div>
        </Card>

        <Card accent={C.mint} padding={16}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mint, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            🎉 {L('Hoạt động cả nhà tuần này', 'Family activity this week')}
          </div>
          <div className="body-f" style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>
            {L(activityOfWeek.vi, activityOfWeek.en)}
          </div>
          <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 6 }}>
            ⏱️ ~{activityOfWeek.minutes} {L('phút', 'min')} · {activityOfWeek.energy === 'high' ? '🔥' : activityOfWeek.energy === 'medium' ? '⚡' : '🍃'} {L(activityOfWeek.energy === 'high' ? 'Năng lượng cao' : activityOfWeek.energy === 'medium' ? 'Vừa phải' : 'Thư giãn', activityOfWeek.energy)}
          </div>
        </Card>
      </div>

      {/* Family shared journal */}
      <Card accent={C.sky}>
        <h3 className="display" style={{ fontSize: 18, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          📔 {L('Sổ tay gia đình', 'Family Notebook')}
        </h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <textarea value={newEntry} onChange={e => setNewEntry(e.target.value)}
            placeholder={isParentAuthed
              ? L('Bố/Mẹ ghi điều con đã làm tốt, lời khuyên, cảm xúc...', 'Parent: write something kid did well, advice, feelings...')
              : L('Con ghi cảm xúc, ý tưởng, câu hỏi cho bố mẹ...', 'Kid: write feelings, ideas, questions for parents...')}
            rows={3}
            style={{ flex: 1, padding: '10px 14px', border: `2px solid ${C.border}`, borderRadius: 16, fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Pill color={isParentAuthed ? C.purple : kids.find(k => k.id === selectedKid)?.color || C.pink}>
            {isParentAuthed ? '👨‍👩‍👧' : kids.find(k => k.id === selectedKid)?.emoji || '🌟'} {L('Đang viết với tư cách', 'Writing as')}: {isParentAuthed ? L('Bố/Mẹ', 'Parent') : kids.find(k => k.id === selectedKid)?.name}
          </Pill>
          <Btn onClick={addJournalEntry} color={C.sky} icon={Plus} disabled={!newEntry.trim()}>{L('Ghi vào sổ', 'Add entry')}</Btn>
        </div>

        {recentEntries.length === 0 ? (
          <div className="body-f" style={{ fontSize: 13, color: C.mute, fontStyle: 'italic', textAlign: 'center', padding: 16 }}>
            {L('Sổ trống. Cùng viết entry đầu tiên!', 'Empty notebook. Write the first entry!')}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentEntries.map(entry => (
              <div key={entry.id} style={{
                background: entry.author === 'parent' ? '#F3E5FF' : C.soft,
                borderRadius: 14, padding: 12, borderLeft: `4px solid ${entry.author === 'parent' ? C.purple : C.pink}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{entry.authorEmoji}</span>
                  <span className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{entry.authorName}</span>
                  <span className="body-f" style={{ fontSize: 11, color: C.mute, marginLeft: 'auto' }}>
                    {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="body-f" style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {entry.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Weekly review */}
      <Card accent={C.coral} style={{ marginTop: 16 }}>
        <h3 className="display" style={{ fontSize: 18, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
          📅 {L('Review tuần này', 'This Week\'s Review')}
        </h3>
        <div className="body-f" style={{ fontSize: 12, color: C.sub, marginBottom: 14 }}>
          {L('Mỗi Chủ Nhật, cùng nhìn lại 1 tuần qua.', 'Every Sunday, reflect on the past week together.')} · Week: {currentWeek}
        </div>

        {thisWeekReview ? (
          <div>
            <div className="body-f" style={{ fontSize: 12, color: C.mint, marginBottom: 12, fontWeight: 700 }}>
              ✅ {L('Đã hoàn thành review tuần này', 'Review completed this week')} · {new Date(thisWeekReview.date).toLocaleDateString()}
            </div>
            {thisWeekReview.answers.map((a, i) => (
              <div key={i} style={{ marginBottom: 12, padding: 12, background: C.soft, borderRadius: 12 }}>
                <div className="body-f" style={{ fontSize: 12, fontWeight: 700, color: C.coral, marginBottom: 4 }}>{a.q}</div>
                <div className="body-f" style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{a.a || L('(không trả lời)', '(no answer)')}</div>
              </div>
            ))}
            <Btn onClick={() => { const k = { ...weeklyReviews }; delete k[reviewKey]; setWeeklyReviewsP(k); }} color={C.mute} variant="outline" size="sm" icon={RotateCw}>
              {L('Làm lại review tuần này', 'Redo this week\'s review')}
            </Btn>
          </div>
        ) : (
          <div>
            {reviewPrompts.map((p, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <label className="body-f" style={{ fontSize: 13, fontWeight: 700, color: C.ink, display: 'block', marginBottom: 6 }}>
                  {p.q}
                </label>
                <textarea value={reviewAnswers[i] || ''} onChange={e => setReviewAnswers({ ...reviewAnswers, [i]: e.target.value })}
                  placeholder={p.placeholder} rows={2}
                  style={{ width: '100%', padding: '8px 12px', border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            ))}
            <Btn onClick={submitReview} color={C.coral} icon={Save}>{L('Lưu review tuần này', 'Save this week\'s review')}</Btn>
          </div>
        )}
      </Card>
    </div>
  );
}

// ============================================================
// SKILL: ENGLISH 4 SKILLS — Listen / Speak / Read / Write
// ============================================================
function EnglishSkillsTab({ kids, englishProgress, setEnglishProgressP, activeKidId, t, L, lang }) {
  const [selectedKid, setSelectedKid] = React.useState(activeKidId || kids[0]?.id);
  const [mode, setMode] = React.useState('listen'); // listen | speak | read | write
  const [level, setLevel] = React.useState<CEFRLevel>('A1');
  const [browserCheck, setBrowserCheck] = React.useState({ tts: false, asr: false });

  const kid = kids.find(k => k.id === selectedKid);

  React.useEffect(() => {
    if (kid) setLevel(getLevelForAge(kid.age));
    setBrowserCheck({ tts: ttsSupported(), asr: asrSupported() });
    loadVoices();
  }, [selectedKid]);

  const kidProg = englishProgress[selectedKid] || { listen: { right: 0, total: 0 }, speak: [], read: {}, write: [] };

  const updateKidProg = (patch) => {
    const next = { ...englishProgress, [selectedKid]: { ...kidProg, ...patch } };
    setEnglishProgressP(next);
  };

  return (
    <div className="fade-in">
      <SectionHeader title={t('englishSkills')} subtitle={L('Nghe · Nói · Đọc · Viết — Đại Ka chấm', 'Listen · Speak · Read · Write — Đại Ka grades')} emoji="🎓" />

      <div style={{ display: 'flex', gap: 8, margin: '0 0 12px', flexWrap: 'wrap' }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)} className="btn-bounce body-f" style={{
            background: selectedKid === k.id ? k.color : '#fff', color: selectedKid === k.id ? '#fff' : k.color,
            border: `2px solid ${k.color}`, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{k.emoji} {k.name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '0 0 12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1 }}>
          {L('Cấp độ', 'Level')}:
        </span>
        {(['K', 'A1', 'A2', 'B1'] as CEFRLevel[]).map(lvl => (
          <button key={lvl} onClick={() => setLevel(lvl)} className="btn-bounce body-f" style={{
            background: level === lvl ? C.purple : '#fff', color: level === lvl ? '#fff' : C.purple,
            border: `2px solid ${C.purple}`, padding: '4px 12px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12,
          }}>{lvl}</button>
        ))}
        <span className="body-f" style={{ fontSize: 11, color: C.mute, marginLeft: 8 }}>
          ({L(
            level === 'K' ? '4-6t · mầm non' : level === 'A1' ? '7-8t · vỡ lòng' : level === 'A2' ? '9-11t · sơ cấp' : '12-15t · trung cấp',
            level === 'K' ? 'ages 4-6 · kindergarten' : level === 'A1' ? 'ages 7-8 · beginner' : level === 'A2' ? 'ages 9-11 · elementary' : 'ages 12-15 · intermediate'
          )})
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
        {[
          { id: 'listen', em: '🎧', vi: 'Nghe', en: 'Listen', color: C.sky },
          { id: 'speak', em: '🗣️', vi: 'Nói', en: 'Speak', color: C.coral },
          { id: 'read', em: '📖', vi: 'Đọc', en: 'Read', color: C.mint },
          { id: 'write', em: '✍️', vi: 'Viết', en: 'Write', color: C.purple },
        ].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} className="btn-bounce body-f" style={{
            background: mode === m.id ? m.color : '#fff', color: mode === m.id ? '#fff' : m.color,
            border: `2px solid ${m.color}`, padding: '8px 14px', borderRadius: 14,
            cursor: 'pointer', fontWeight: 700, fontSize: 13,
          }}>{m.em} {L(m.vi, m.en)}</button>
        ))}
      </div>

      {(mode === 'listen' || mode === 'speak') && !browserCheck.tts && (
        <Card accent={C.coral}>
          <div className="body-f" style={{ fontSize: 13, color: C.coral, fontWeight: 700 }}>
            ⚠️ {L('Trình duyệt không hỗ trợ phát âm. Mở Chrome/Edge để dùng.', 'Browser does not support TTS. Use Chrome/Edge.')}
          </div>
        </Card>
      )}
      {mode === 'speak' && browserCheck.tts && !browserCheck.asr && (
        <Card accent={C.coral}>
          <div className="body-f" style={{ fontSize: 13, color: C.coral, fontWeight: 700 }}>
            ⚠️ {L('Trình duyệt không hỗ trợ ghi giọng nói. Hãy dùng Chrome desktop hoặc Android Chrome.', 'No speech recognition. Use desktop Chrome or Android Chrome.')}
          </div>
        </Card>
      )}

      {mode === 'listen' && <ListenPanel level={level} kidProg={kidProg} updateKidProg={updateKidProg} L={L} lang={lang} />}
      {mode === 'speak' && <SpeakPanel level={level} kidProg={kidProg} updateKidProg={updateKidProg} L={L} lang={lang} asrOk={browserCheck.asr} />}
      {mode === 'read' && <ReadPanel level={level} kidProg={kidProg} updateKidProg={updateKidProg} L={L} lang={lang} />}
      {mode === 'write' && <WritePanel level={level} kidProg={kidProg} updateKidProg={updateKidProg} kid={kid} L={L} lang={lang} />}
    </div>
  );
}

// ===== LISTEN PANEL =====
function ListenPanel({ level, kidProg, updateKidProg, L, lang }) {
  const [round, setRound] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);

  const startRound = () => {
    const pool = LISTEN_WORDS[level];
    const options = pickRandomItems(pool, 4);
    const target = options[Math.floor(Math.random() * options.length)];
    setRound({ target, options });
    setFeedback(null);
    setTimeout(() => speak(target.word, { lang: 'en-US' }), 200);
  };

  const replay = () => { if (round) speak(round.target.word, { lang: 'en-US' }); };

  const choose = (word) => {
    if (!round || feedback) return;
    const correct = word === round.target.word;
    setFeedback(correct ? 'correct' : 'wrong');
    const stats = kidProg.listen || { right: 0, total: 0 };
    updateKidProg({ listen: { right: stats.right + (correct ? 1 : 0), total: stats.total + 1 } });
  };

  const stats = kidProg.listen || { right: 0, total: 0 };
  const pct = stats.total ? Math.round((stats.right / stats.total) * 100) : 0;

  return (
    <Card accent={C.sky}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 className="display" style={{ fontSize: 18, margin: 0 }}>🎧 {L('Nghe & chọn từ', 'Listen & pick the word')}</h3>
        <Pill color={C.sky}>{stats.right} / {stats.total} ({pct}%)</Pill>
      </div>

      {!round ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎧</div>
          <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 16 }}>
            {L('Đại Ka đọc 1 từ — con click vào đúng từ con nghe được trong 4 lựa chọn.', 'Đại Ka says a word — click the matching one from 4 options.')}
          </div>
          <Btn onClick={startRound} color={C.sky} icon={Zap}>{L('Bắt đầu vòng 1', 'Start round 1')}</Btn>
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Btn onClick={replay} color={C.sky} variant="outline" icon={Music}>{L('Nghe lại', 'Replay')}</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
            {round.options.map(o => {
              const isCorrect = feedback && o.word === round.target.word;
              const isWrong = feedback === 'wrong' && o.word !== round.target.word;
              return (
                <button key={o.word} onClick={() => choose(o.word)} className="btn-bounce" style={{
                  background: isCorrect ? '#E5FAEB' : '#fff',
                  border: `2px solid ${isCorrect ? C.mint : isWrong ? C.border : C.sky}`,
                  padding: '14px 12px', borderRadius: 14, cursor: feedback ? 'default' : 'pointer',
                  textAlign: 'left',
                }}>
                  <div className="display" style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{o.word}</div>
                  <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 2 }}>{o.phonetic}</div>
                  {feedback && <div className="body-f" style={{ fontSize: 11, color: C.sub, marginTop: 4 }}>🇻🇳 {o.vi}</div>}
                </button>
              );
            })}
          </div>
          {feedback && (
            <div style={{ textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 16, fontWeight: 700, color: feedback === 'correct' ? C.mint : C.coral, marginBottom: 12 }}>
                {feedback === 'correct' ? `🎉 ${L('Đúng rồi!', 'Correct!')}` : `${L('Chưa đúng. Đáp án:', 'Not quite. Answer:')} ${round.target.word}`}
              </div>
              <Btn onClick={startRound} color={C.sky} icon={RotateCw}>{L('Vòng tiếp theo', 'Next round')}</Btn>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

// ===== SPEAK PANEL =====
function SpeakPanel({ level, kidProg, updateKidProg, L, lang, asrOk }) {
  const [target, setTarget] = React.useState(null);
  const [transcript, setTranscript] = React.useState('');
  const [score, setScore] = React.useState(null);
  const [recording, setRecording] = React.useState(false);
  const [error, setError] = React.useState(null);

  const pickSentence = () => {
    const pool = SPEAK_SENTENCES.filter(s => s.level === level);
    const sentence = pool[Math.floor(Math.random() * pool.length)];
    setTarget(sentence);
    setTranscript('');
    setScore(null);
    setError(null);
  };

  const playTarget = () => { if (target) speak(target.text, { lang: 'en-US', rate: 0.85 }); };

  const startRecording = async () => {
    if (!target) return;
    setRecording(true);
    setError(null);
    setTranscript('');
    try {
      const result = await listen({ lang: 'en-US', timeout: 10000 });
      setTranscript(result.transcript);
      const matchScore = pronunciationScore(target.text, result.transcript);
      setScore(matchScore);
      const log = kidProg.speak || [];
      updateKidProg({ speak: [...log, { date: new Date().toISOString(), score: matchScore, target: target.text, spoken: result.transcript, level }] });
    } catch (e: any) {
      setError(e?.message || 'recognition_failed');
    } finally {
      setRecording(false);
    }
  };

  const speakLog = kidProg.speak || [];
  const recent = speakLog.slice(-5).reverse();
  const avgScore = speakLog.length ? Math.round(speakLog.reduce((s, e) => s + e.score, 0) / speakLog.length) : 0;

  return (
    <Card accent={C.coral}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 className="display" style={{ fontSize: 18, margin: 0 }}>🗣️ {L('Đọc thành tiếng', 'Read aloud')}</h3>
        <Pill color={C.coral}>{L('Trung bình:', 'Avg:')} {avgScore}%</Pill>
      </div>

      {!target ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🗣️</div>
          <div className="body-f" style={{ fontSize: 13, color: C.sub, marginBottom: 16 }}>
            {L('Bốc 1 câu → nghe Đại Ka đọc → con đọc lại → AI chấm độ chính xác.', 'Pick a sentence → hear Đại Ka → read it back → AI scores match.')}
          </div>
          <Btn onClick={pickSentence} color={C.coral} icon={Zap}>{L('Bốc câu', 'Pick a sentence')}</Btn>
        </div>
      ) : (
        <>
          <div style={{ background: C.soft, borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div className="display" style={{ fontSize: 18, fontWeight: 700, color: C.ink, lineHeight: 1.5 }}>
              "{target.text}"
            </div>
            <div className="body-f" style={{ fontSize: 12, color: C.sub, marginTop: 6, fontStyle: 'italic' }}>
              🇻🇳 {target.vi}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <Btn onClick={playTarget} color={C.sky} variant="outline" icon={Music}>{L('Nghe Đại Ka', 'Hear Đại Ka')}</Btn>
            <Btn onClick={startRecording} color={C.coral} disabled={!asrOk || recording} icon={Send}>
              {recording ? L('Đang ghi…', 'Recording…') : L('Đọc lại', 'Read it back')}
            </Btn>
            <Btn onClick={pickSentence} color={C.mute} variant="outline" icon={RotateCw}>{L('Câu khác', 'Next')}</Btn>
          </div>

          {error && (
            <div style={{ background: '#FFE5E5', borderRadius: 12, padding: 10 }}>
              <div className="body-f" style={{ fontSize: 12, color: C.coral, fontWeight: 700 }}>
                {error === 'no_speech_detected' ? L('Không nghe thấy con. Thử lại nhé!', 'Couldn\'t hear you. Try again!') : `⚠️ ${error}`}
              </div>
            </div>
          )}

          {transcript && (
            <div style={{ background: score >= 80 ? '#E5FAEB' : score >= 50 ? '#FFF4D1' : '#FFE5E5', borderRadius: 12, padding: 12, marginTop: 8 }}>
              <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1 }}>
                {L('Con đã nói:', 'You said:')}
              </div>
              <div className="body-f" style={{ fontSize: 14, color: C.ink, marginTop: 4 }}>"{transcript}"</div>
              <div className="display" style={{ fontSize: 24, fontWeight: 700, color: score >= 80 ? C.mint : score >= 50 ? C.gold : C.coral, marginTop: 8 }}>
                {score}% {L('khớp', 'match')}
              </div>
              <div className="body-f" style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>
                {score >= 90 ? L('Tuyệt vời!', 'Excellent!') : score >= 70 ? L('Tốt lắm con!', 'Great!') : score >= 50 ? L('Khá rồi, thử lại nha.', 'Decent — try once more.') : L('Cùng nghe lại Đại Ka rồi đọc theo nhé.', 'Listen to Đại Ka again and copy.')}
              </div>
            </div>
          )}
        </>
      )}

      {recent.length > 0 && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px dashed ${C.border}` }}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {L('Gần đây', 'Recent')}
          </div>
          {recent.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Pill color={r.score >= 80 ? C.mint : r.score >= 50 ? C.gold : C.coral}>{r.score}%</Pill>
              <span className="body-f" style={{ fontSize: 12, color: C.sub, flex: 1 }}>{r.target.slice(0, 60)}{r.target.length > 60 ? '…' : ''}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// ===== READ PANEL =====
function ReadPanel({ level, kidProg, updateKidProg, L, lang }) {
  const [passage, setPassage] = React.useState(null);
  const [answers, setAnswers] = React.useState({});
  const [revealed, setRevealed] = React.useState(false);

  const pickPassage = () => {
    const pool = READING_PASSAGES.filter(p => p.level === level);
    const p = pool[Math.floor(Math.random() * pool.length)];
    setPassage(p);
    setAnswers({});
    setRevealed(false);
  };

  const submit = () => {
    if (!passage) return;
    const right = passage.questions.reduce((c, q, i) => c + (answers[i] === q.correctIdx ? 1 : 0), 0);
    const total = passage.questions.length;
    const score = Math.round((right / total) * 100);
    setRevealed(true);
    const passageId = `${passage.level}-${passage.title_en}`;
    updateKidProg({ read: { ...(kidProg.read || {}), [passageId]: { score, date: new Date().toISOString(), right, total } } });
  };

  return (
    <Card accent={C.mint}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 className="display" style={{ fontSize: 18, margin: 0 }}>📖 {L('Đọc hiểu', 'Reading comprehension')}</h3>
        <Pill color={C.mint}>{Object.keys(kidProg.read || {}).length} {L('bài', 'passages')}</Pill>
      </div>

      {!passage ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>📖</div>
          <Btn onClick={pickPassage} color={C.mint} icon={BookOpen}>{L('Bốc bài đọc', 'Pick a passage')}</Btn>
        </div>
      ) : (
        <>
          <div style={{ background: '#FFF9E5', borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <div className="display" style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 8 }}>
              {passage.title_en}
            </div>
            <div className="body-f" style={{ fontSize: 11, color: C.sub, marginBottom: 10, fontStyle: 'italic' }}>
              🇻🇳 {passage.title_vi}
            </div>
            <div className="body-f" style={{ fontSize: 14, color: C.ink, lineHeight: 1.7 }}>
              {passage.passage}
            </div>
          </div>

          {passage.questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1px dashed ${C.border}` }}>
              <div className="body-f" style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8 }}>
                {qi + 1}. {q.q}
              </div>
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = revealed && oi === q.correctIdx;
                const isWrong = revealed && selected && oi !== q.correctIdx;
                return (
                  <button key={oi} onClick={() => !revealed && setAnswers({ ...answers, [qi]: oi })}
                    className="btn-bounce body-f" style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      background: isCorrect ? '#E5FAEB' : isWrong ? '#FFE5E5' : selected ? C.soft : '#fff',
                      border: `2px solid ${isCorrect ? C.mint : isWrong ? C.coral : selected ? C.purple : C.border}`,
                      padding: 10, borderRadius: 10, cursor: revealed ? 'default' : 'pointer',
                      fontSize: 13, marginBottom: 6, color: C.ink, fontWeight: selected ? 700 : 500,
                    }}>
                    {String.fromCharCode(65 + oi)}. {opt}
                  </button>
                );
              })}
              {revealed && (
                <div className="body-f" style={{ fontSize: 12, color: C.sub, marginTop: 6, fontStyle: 'italic', padding: 8, background: C.soft, borderRadius: 8 }}>
                  💡 {q.explanation_vi}
                </div>
              )}
            </div>
          ))}

          {!revealed ? (
            <Btn onClick={submit} color={C.mint} disabled={Object.keys(answers).length < passage.questions.length} icon={Check}>
              {L('Nộp bài', 'Submit')}
            </Btn>
          ) : (
            <Btn onClick={pickPassage} color={C.sky} icon={RotateCw}>{L('Bài khác', 'Another passage')}</Btn>
          )}
        </>
      )}
    </Card>
  );
}

// ===== WRITE PANEL =====
function WritePanel({ level, kidProg, updateKidProg, kid, L, lang }) {
  const [prompt, setPrompt] = React.useState(null);
  const [text, setText] = React.useState('');
  const [grading, setGrading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);

  const pickPrompt = () => {
    const pool = WRITING_PROMPTS.filter(p => p.level === level);
    const p = pool[Math.floor(Math.random() * pool.length)];
    setPrompt(p);
    setText('');
    setResult(null);
    setError(null);
  };

  const submit = async () => {
    if (!prompt || !text.trim() || grading) return;
    setGrading(true);
    setError(null);
    try {
      const res = await fetch('/api/grade-english', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          prompt: prompt.prompt_en,
          level,
          kidName: kid?.name,
          kidAge: kid?.age,
          kidId: kid?.id,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `HTTP ${res.status}`);
      } else {
        setResult(data);
        const log = kidProg.write || [];
        updateKidProg({ write: [...log, { date: new Date().toISOString(), score: data.score || 0, prompt: prompt.prompt_en, text: text.trim(), feedback: data, level }] });
      }
    } catch (e: any) {
      setError(e?.message || 'network_error');
    } finally {
      setGrading(false);
    }
  };

  const writeLog = kidProg.write || [];
  const recent = writeLog.slice(-3).reverse();

  return (
    <Card accent={C.purple}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 className="display" style={{ fontSize: 18, margin: 0 }}>✍️ {L('Viết — Đại Ka chấm', 'Write — Đại Ka grades')}</h3>
        <Pill color={C.purple}>{writeLog.length} {L('bài', 'submissions')}</Pill>
      </div>

      {!prompt ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>✍️</div>
          <Btn onClick={pickPrompt} color={C.purple} icon={Edit3}>{L('Bốc đề viết', 'Pick a prompt')}</Btn>
        </div>
      ) : (
        <>
          <div style={{ background: C.soft, borderRadius: 14, padding: 14, marginBottom: 12 }}>
            <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              {L('Đề', 'Prompt')} ({level})
            </div>
            <div className="body-f" style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>
              {prompt.prompt_en}
            </div>
            <div className="body-f" style={{ fontSize: 12, color: C.sub, marginTop: 4, fontStyle: 'italic' }}>
              🇻🇳 {prompt.prompt_vi}
            </div>
            <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 8 }}>
              💡 {L('Gợi ý:', 'Hint:')} {prompt.example_starter}
            </div>
          </div>

          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder={L('Viết bằng tiếng Anh ở đây… (tối thiểu ' + prompt.min_sentences + ' câu)', 'Write in English here… (min ' + prompt.min_sentences + ' sentences)')}
            rows={6} maxLength={2000}
            disabled={grading || !!result}
            style={{ width: '100%', padding: '10px 14px', border: `2px solid ${C.border}`, borderRadius: 14, fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', color: C.ink }} />
          <div className="body-f" style={{ fontSize: 11, color: C.mute, marginTop: 4, textAlign: 'right' }}>
            {text.length} / 2000
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {!result && (
              <Btn onClick={submit} color={C.purple} disabled={!text.trim() || grading} icon={Send}>
                {grading ? L('Đại Ka đang chấm…', 'Đại Ka grading…') : L('Nộp cho Đại Ka', 'Submit to Đại Ka')}
              </Btn>
            )}
            <Btn onClick={pickPrompt} color={C.sky} variant="outline" icon={RotateCw}>{L('Đề khác', 'New prompt')}</Btn>
          </div>

          {error && (
            <div style={{ background: '#FFE5E5', borderRadius: 12, padding: 10, marginTop: 10 }}>
              <div className="body-f" style={{ fontSize: 12, color: C.coral, fontWeight: 700 }}>⚠️ {error}</div>
            </div>
          )}

          {result && (
            <div style={{ background: '#F3E5FF', borderRadius: 14, padding: 14, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>👨‍🏫</span>
                <div>
                  <div className="display" style={{ fontSize: 16, fontWeight: 700, color: C.purple }}>{L('Đại Ka chấm', 'Đại Ka says')}</div>
                  <div className="display" style={{ fontSize: 28, fontWeight: 800, color: result.score >= 80 ? C.mint : result.score >= 60 ? C.gold : C.coral }}>
                    {result.score} / 100
                  </div>
                </div>
              </div>
              {result.strengths && (
                <div style={{ marginBottom: 8 }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mint, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                    ✅ {L('Điểm mạnh', 'Strengths')}
                  </div>
                  <div className="body-f" style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{result.strengths}</div>
                </div>
              )}
              {result.improvements && (
                <div style={{ marginBottom: 8 }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.coral, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                    🔧 {L('Cần cải thiện', 'Improvements')}
                  </div>
                  <div className="body-f" style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{result.improvements}</div>
                </div>
              )}
              {result.corrected && result.corrected !== text.trim() && (
                <div style={{ marginBottom: 8 }}>
                  <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                    📝 {L('Phiên bản chỉnh sửa', 'Corrected version')}
                  </div>
                  <div className="body-f" style={{ fontSize: 13, color: C.ink, lineHeight: 1.5, padding: 8, background: '#fff', borderRadius: 10, fontStyle: 'italic' }}>
                    "{result.corrected}"
                  </div>
                </div>
              )}
              {result.encouragement && (
                <div style={{ background: 'linear-gradient(135deg, #FFD43B22, #FF6B9D22)', borderRadius: 10, padding: 10, marginTop: 10 }}>
                  <div className="body-f" style={{ fontSize: 12, color: C.ink, fontStyle: 'italic' }}>
                    💖 {result.encouragement}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {recent.length > 0 && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px dashed ${C.border}` }}>
          <div className="body-f" style={{ fontSize: 11, fontWeight: 700, color: C.mute, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {L('Bài gần đây', 'Recent submissions')}
          </div>
          {recent.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Pill color={r.score >= 80 ? C.mint : r.score >= 60 ? C.gold : C.coral}>{r.score}/100</Pill>
              <span className="body-f" style={{ fontSize: 12, color: C.sub, flex: 1 }}>{(r.prompt || '').slice(0, 60)}…</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

