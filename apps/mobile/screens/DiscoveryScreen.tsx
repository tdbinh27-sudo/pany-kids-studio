import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { Btn } from '../components/Btn';
import { Pill } from '../components/Pill';
import { KidSelector } from '../components/KidSelector';
import { DEFAULT_KIDS, Kid } from '../lib/kids';
import { I18N, Lang, L } from '../lib/i18n';
import { C, RADIUS, SP } from '../lib/design';
import { load, persist } from '../lib/storage';
import {
  RIASEC_TYPES,
  RIASEC_JUNIOR_8_12,
  RIASEC_JUNIOR_13_15,
  MOOD_OPTIONS,
  scoreRiasec,
} from '../lib/riasec-junior';

interface DiscoveryScreenProps {
  lang: Lang;
}

export function DiscoveryScreen({ lang }: DiscoveryScreenProps) {
  const t = I18N[lang];
  const [kids] = useState<Kid[]>(DEFAULT_KIDS);
  const [activeKidId, setActiveKidId] = useState<string>(DEFAULT_KIDS[0].id);
  const [moodLog, setMoodLog] = useState<Record<string, any>>({});
  const [riasecAnswers, setRiasecAnswers] = useState<Record<string, Record<number, number>>>({});
  const [riasecCompleted, setRiasecCompleted] = useState<Record<string, any>>({});
  const [step, setStep] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    (async () => {
      setMoodLog(await load('moodLog', {}));
      setRiasecAnswers(await load('riasecAnswers', {}));
      setRiasecCompleted(await load('riasecCompleted', {}));
    })();
  }, []);

  const kid = kids.find((k) => k.id === activeKidId);
  const kidAge = kid?.age || 10;
  const questions = kidAge <= 12 ? RIASEC_JUNIOR_8_12 : RIASEC_JUNIOR_13_15;
  const kidAnswers = riasecAnswers[activeKidId] || {};
  const kidResult = riasecCompleted[activeKidId];
  const today = new Date().toISOString().slice(0, 10);
  const todayMood = moodLog[`${activeKidId}-${today}`];

  const saveMood = async (value: number) => {
    const updated = {
      ...moodLog,
      [`${activeKidId}-${today}`]: { mood: value, date: new Date().toISOString() },
    };
    setMoodLog(updated);
    await persist('moodLog', updated);
  };

  const answerQ = async (qId: number, score: number) => {
    const updated = { ...riasecAnswers, [activeKidId]: { ...kidAnswers, [qId]: score } };
    setRiasecAnswers(updated);
    await persist('riasecAnswers', updated);
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const finishQuiz = async () => {
    const results = scoreRiasec(kidAnswers, questions);
    const updated = { ...riasecCompleted, [activeKidId]: { date: new Date().toISOString(), results } };
    setRiasecCompleted(updated);
    await persist('riasecCompleted', updated);
    setStep(0);
    setShowResults(true);
  };

  const resetQuiz = async () => {
    const ans = { ...riasecAnswers };
    delete ans[activeKidId];
    const done = { ...riasecCompleted };
    delete done[activeKidId];
    setRiasecAnswers(ans);
    setRiasecCompleted(done);
    await persist('riasecAnswers', ans);
    await persist('riasecCompleted', done);
    setStep(0);
    setShowResults(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgMid }}>
      <ScrollView contentContainerStyle={{ padding: SP.lg }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: C.purple, marginBottom: 4 }}>
          🔮 {t.discovery}
        </Text>
        <Text style={{ fontSize: 13, color: C.sub, marginBottom: SP.md }}>
          {L(lang, 'Cảm xúc + RIASEC quiz', 'Mood + RIASEC quiz')}
        </Text>

        <KidSelector kids={kids} selectedId={activeKidId} onSelect={(id) => { setActiveKidId(id); setStep(0); setShowResults(false); }} />

        {/* Mood card */}
        <View style={{ marginTop: SP.md }}>
          <Card accent={C.sunny}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: C.gold, marginBottom: 8 }}>
              ☁️ {t.moodToday}
            </Text>
            {todayMood ? (
              <View style={{ alignItems: 'center', padding: 8 }}>
                <Text style={{ fontSize: 48 }}>
                  {MOOD_OPTIONS.find((m) => m.value === todayMood.mood)?.emoji || '⛅'}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: C.ink, marginTop: 8 }}>
                  {L(lang, MOOD_OPTIONS.find((m) => m.value === todayMood.mood)?.vi || '', MOOD_OPTIONS.find((m) => m.value === todayMood.mood)?.en || '')}
                </Text>
              </View>
            ) : (
              <>
                <Text style={{ fontSize: 13, color: C.sub, marginBottom: 12 }}>{t.howFeel}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  {MOOD_OPTIONS.map((m) => (
                    <Pressable key={m.value} onPress={() => saveMood(m.value)} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: 6, alignItems: 'center' })}>
                      <Text style={{ fontSize: 32 }}>{m.emoji}</Text>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: C.sub, marginTop: 4 }}>
                        {L(lang, m.vi, m.en)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </Card>
        </View>

        {/* RIASEC Quiz */}
        <Card accent={C.purple}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: C.ink, marginBottom: 4 }}>
            🧭 {t.riasecQuiz}
          </Text>
          <Text style={{ fontSize: 12, color: C.sub, marginBottom: 12 }}>
            {questions.length} {L(lang, 'câu', 'questions')} · {kidAge <= 12 ? '8-12' : '13-15'} {L(lang, 'tuổi', 'years')}
          </Text>

          {(showResults || kidResult) && step === 0 ? (
            <ResultsView
              results={kidResult?.results || scoreRiasec(kidAnswers, questions)}
              questions={questions}
              lang={lang}
              onReset={resetQuiz}
            />
          ) : step > 0 ? (
            <QuizStep
              questions={questions}
              step={step}
              kidAnswers={kidAnswers}
              lang={lang}
              onAnswer={answerQ}
              onFinish={finishQuiz}
            />
          ) : (
            <View style={{ alignItems: 'center', padding: 12 }}>
              <Text style={{ fontSize: 56, marginBottom: 12 }}>🧭</Text>
              {kidResult ? (
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Btn label={t.seeResults} onPress={() => setShowResults(true)} color={C.purple} icon="🏆" />
                  <Btn label={t.retake} onPress={resetQuiz} color={C.coral} variant="outline" />
                </View>
              ) : (
                <Btn label={L(lang, 'Bắt đầu khám phá!', 'Start exploring!')} onPress={() => setStep(1)} color={C.purple} icon="✨" />
              )}
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuizStep({ questions, step, kidAnswers, lang, onAnswer, onFinish }: any) {
  const q = questions[step - 1];
  if (!q) {
    return (
      <View style={{ alignItems: 'center', padding: 12 }}>
        <Text style={{ fontSize: 48, marginBottom: 12 }}>🎉</Text>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>
          {L(lang, 'Hoàn thành!', 'Complete!')}
        </Text>
        <Btn label={L(lang, 'Xem kết quả', 'See results')} onPress={onFinish} color={C.purple} icon="🏆" />
      </View>
    );
  }
  const options = [
    { score: 1, vi: 'Không thích', en: 'Dislike', bg: '#FFE5E5' },
    { score: 2, vi: 'Bình thường', en: 'Neutral', bg: '#FFF4D1' },
    { score: 3, vi: 'Hơi thích', en: 'Somewhat', bg: '#E5F3FF' },
    { score: 4, vi: 'Thích', en: 'Like', bg: '#E5FAEB' },
    { score: 5, vi: 'Rất thích!', en: 'Love it!', bg: '#F3E5FF' },
  ];
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Pill label={`${step} / ${questions.length}`} color={C.purple} />
        <View style={{ flex: 1, height: 6, backgroundColor: C.soft, borderRadius: 99, marginLeft: 12, overflow: 'hidden' }}>
          <View style={{ width: `${(step / questions.length) * 100}%`, height: '100%', backgroundColor: C.purple }} />
        </View>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '700', color: C.ink, marginBottom: 16, lineHeight: 24 }}>
        {L(lang, q.vi, q.en)}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {options.map((opt) => {
          const selected = kidAnswers[q.id] === opt.score;
          return (
            <Pressable
              key={opt.score}
              onPress={() => onAnswer(q.id, opt.score)}
              style={({ pressed }) => ({
                backgroundColor: selected ? C.purple : opt.bg,
                borderRadius: RADIUS.btn,
                paddingVertical: 10,
                paddingHorizontal: 14,
                minWidth: 90,
                alignItems: 'center',
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ color: selected ? '#fff' : C.ink, fontWeight: '700', fontSize: 12 }}>
                {L(lang, opt.vi, opt.en)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function ResultsView({ results, questions, lang, onReset }: any) {
  const top3 = results.slice(0, 3);
  const maxScore = (questions.length / 6) * 5;
  return (
    <View>
      {top3.map((r: any, i: number) => {
        const info = RIASEC_TYPES.find((rt) => rt.type === r.type);
        if (!info) return null;
        return (
          <View
            key={r.type}
            style={{
              backgroundColor: i === 0 ? info.color + '22' : C.soft,
              borderRadius: RADIUS.card,
              padding: 14,
              marginBottom: 10,
              borderWidth: i === 0 ? 2 : 0,
              borderColor: info.color,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 28 }}>{info.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '800', color: info.color }}>
                  #{i + 1} {L(lang, info.vi_name, info.en_name)}
                </Text>
                <Text style={{ fontSize: 11, color: C.sub }}>{L(lang, 'Điểm', 'Score')}: {r.score}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: C.sub, marginTop: 6, lineHeight: 18 }}>
              {L(lang, info.vi_desc, info.en_desc)}
            </Text>
          </View>
        );
      })}

      <Text style={{ fontSize: 12, fontWeight: '700', color: C.mute, marginTop: 8, marginBottom: 6, letterSpacing: 1 }}>
        {L(lang, 'TẤT CẢ 6 LOẠI', 'ALL 6 TYPES')}
      </Text>
      {results.map((r: any) => {
        const info = RIASEC_TYPES.find((rt) => rt.type === r.type);
        return (
          <View key={r.type} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Text style={{ width: 24, textAlign: 'center', fontSize: 14 }}>{info?.emoji}</Text>
            <Text style={{ width: 80, fontSize: 11, fontWeight: '700', color: C.ink }}>
              {L(lang, info?.vi_name || '', info?.en_name || '')}
            </Text>
            <View style={{ flex: 1, height: 12, backgroundColor: C.soft, borderRadius: 99, overflow: 'hidden' }}>
              <View style={{ width: `${(r.score / maxScore) * 100}%`, height: '100%', backgroundColor: info?.color }} />
            </View>
            <Text style={{ width: 24, fontSize: 11, fontWeight: '700', color: C.sub, textAlign: 'right' }}>
              {r.score}
            </Text>
          </View>
        );
      })}

      <View style={{ marginTop: 16 }}>
        <Btn label={L(lang, 'Làm lại', 'Retake')} onPress={onReset} color={C.coral} variant="outline" icon="🔄" />
      </View>
    </View>
  );
}
