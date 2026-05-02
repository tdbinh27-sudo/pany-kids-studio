import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { Btn } from '../components/Btn';
import { I18N, Lang, L } from '../lib/i18n';
import { C, RADIUS, SP } from '../lib/design';
import Constants from 'expo-constants';

interface SettingsScreenProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export function SettingsScreen({ lang, setLang }: SettingsScreenProps) {
  const t = I18N[lang];
  const version = Constants.expoConfig?.version || '0.1.0';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgStart }}>
      <ScrollView contentContainerStyle={{ padding: SP.lg }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: C.purple, marginBottom: SP.md }}>
          ⚙️ {t.settings}
        </Text>

        <Card accent={C.sky}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: C.sky, marginBottom: 12 }}>
            🌐 {t.language}
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              onPress={() => setLang('vi')}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: lang === 'vi' ? C.purple : '#fff',
                borderWidth: 2,
                borderColor: C.purple,
                borderRadius: RADIUS.btn,
                padding: 12,
                alignItems: 'center',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: lang === 'vi' ? '#fff' : C.purple, fontWeight: '700' }}>
                🇻🇳 Tiếng Việt
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setLang('en')}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: lang === 'en' ? C.purple : '#fff',
                borderWidth: 2,
                borderColor: C.purple,
                borderRadius: RADIUS.btn,
                padding: 12,
                alignItems: 'center',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: lang === 'en' ? '#fff' : C.purple, fontWeight: '700' }}>
                🇬🇧 English
              </Text>
            </Pressable>
          </View>
        </Card>

        <Card accent={C.mint}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: C.mint, marginBottom: 8 }}>
            🔒 {L(lang, 'Quyền riêng tư', 'Privacy')}
          </Text>
          <Text style={{ fontSize: 13, color: C.sub, lineHeight: 20 }}>{t.privacyNote}</Text>
        </Card>

        <Card accent={C.purple}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: C.purple, marginBottom: 8 }}>
            ℹ️ {t.about}
          </Text>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 13, color: C.ink }}>
              <Text style={{ fontWeight: '700' }}>{L(lang, 'Phiên bản', 'Version')}:</Text> {version}
            </Text>
            <Text style={{ fontSize: 13, color: C.ink }}>
              <Text style={{ fontWeight: '700' }}>{L(lang, 'Tác giả', 'Author')}:</Text> Bố Bình 💖
            </Text>
            <Text style={{ fontSize: 13, color: C.ink }}>
              <Text style={{ fontWeight: '700' }}>{L(lang, 'Cho', 'For')}:</Text> Phúc · An · Y
            </Text>
          </View>
          <View style={{ backgroundColor: C.soft, borderRadius: 12, padding: 10, marginTop: 12 }}>
            <Text style={{ fontSize: 12, color: C.sub, fontStyle: 'italic', lineHeight: 18 }}>
              {L(
                lang,
                '"Pany Kids Studio không phải lớp học. Đây là studio gia đình."',
                '"Pany Kids Studio is not a classroom. It\'s a family studio."'
              )}
            </Text>
          </View>
        </Card>

        <Card accent={C.coral}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: C.coral, marginBottom: 8 }}>
            🌐 {L(lang, 'Phiên bản web đầy đủ', 'Full web version')}
          </Text>
          <Text style={{ fontSize: 12, color: C.sub, marginBottom: 8 }}>
            {L(
              lang,
              'Mobile có 4 màn hình. Web có đầy đủ 12 trụ cột phát triển.',
              'Mobile has 4 screens. Web has all 12 development pillars.'
            )}
          </Text>
          <Text style={{ fontSize: 11, color: C.mute }}>https://pany-kids-studio.vercel.app</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
