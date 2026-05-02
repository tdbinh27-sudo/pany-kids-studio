import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { KidSelector } from '../components/KidSelector';
import { Pill } from '../components/Pill';
import { DEFAULT_KIDS, Kid } from '../lib/kids';
import { I18N, Lang } from '../lib/i18n';
import { C, SP } from '../lib/design';
import { load } from '../lib/storage';

interface HomeScreenProps {
  lang: Lang;
}

export function HomeScreen({ lang }: HomeScreenProps) {
  const t = I18N[lang];
  const [kids, setKids] = useState<Kid[]>(DEFAULT_KIDS);
  const [activeKidId, setActiveKidId] = useState<string>(DEFAULT_KIDS[0].id);
  const [refreshing, setRefreshing] = useState(false);
  const [moodLog, setMoodLog] = useState<Record<string, any>>({});
  const [streaks, setStreaks] = useState<Record<string, any>>({});

  const loadAll = async () => {
    const loadedKids = await load<Kid[]>('kids', DEFAULT_KIDS);
    const loadedMood = await load<Record<string, any>>('moodLog', {});
    const loadedStreaks = await load<Record<string, any>>('streaks', {});
    setKids(loadedKids);
    setMoodLog(loadedMood);
    setStreaks(loadedStreaks);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  };

  const activeKid = kids.find((k) => k.id === activeKidId) || kids[0];
  const today = new Date().toISOString().slice(0, 10);
  const todayMood = moodLog[`${activeKidId}-${today}`];
  const streak = streaks[activeKidId]?.count || 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgStart }}>
      <ScrollView
        contentContainerStyle={{ padding: SP.lg }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ marginBottom: SP.lg }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: C.mute, letterSpacing: 1 }}>
            🌸 {t.appTitle.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 28, fontWeight: '800', color: C.purple, marginTop: 4 }}>
            {t.welcome}, {activeKid?.name} {activeKid?.emoji}
          </Text>
          <Text style={{ fontSize: 13, color: C.sub, marginTop: 4 }}>{t.appSubtitle}</Text>
        </View>

        <Text style={{ fontSize: 11, fontWeight: '700', color: C.mute, marginBottom: SP.sm, letterSpacing: 1 }}>
          {t.selectKid.toUpperCase()}
        </Text>
        <KidSelector kids={kids} selectedId={activeKidId} onSelect={setActiveKidId} />

        <View style={{ marginTop: SP.lg }}>
          <Card accent={C.coral}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: C.coral, marginBottom: 8 }}>
              🔥 {t.streak}
            </Text>
            <Text style={{ fontSize: 32, fontWeight: '800', color: C.ink }}>
              {streak} <Text style={{ fontSize: 14, color: C.sub }}>{t.days}</Text>
            </Text>
          </Card>

          <Card accent={C.sunny}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: C.gold, marginBottom: 8 }}>
              ☀️ {t.moodToday}
            </Text>
            {todayMood ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Text style={{ fontSize: 40 }}>
                  {['', '⛈️', '🌧️', '⛅', '🌤️', '☀️'][todayMood.mood] || '⛅'}
                </Text>
                <Text style={{ fontSize: 13, color: C.sub, flex: 1 }}>
                  {todayMood.note || (lang === 'vi' ? 'Đã ghi nhận!' : 'Recorded!')}
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: 13, color: C.mute, fontStyle: 'italic' }}>
                {lang === 'vi'
                  ? 'Chưa ghi nhận. Vào tab Khám phá để chọn cảm xúc.'
                  : 'Not recorded. Go to Discover tab to log mood.'}
              </Text>
            )}
          </Card>

          <Card accent={C.sky}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: C.sky, marginBottom: 8 }}>
              💡 {lang === 'vi' ? 'Gợi ý hôm nay' : "Today's tip"}
            </Text>
            <Text style={{ fontSize: 13, color: C.ink, lineHeight: 20 }}>
              {lang === 'vi'
                ? 'Mở tab Đại Ka để hỏi bất cứ điều gì — em luôn sẵn sàng giúp con!'
                : 'Open Đại Ka tab to ask anything — I am always here to help!'}
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 10 }}>
              <Pill label={lang === 'vi' ? 'Học bài' : 'Homework'} color={C.purple} />
              <Pill label={lang === 'vi' ? 'Trò chơi' : 'Games'} color={C.pink} />
              <Pill label={lang === 'vi' ? 'Sáng tạo' : 'Create'} color={C.mint} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
