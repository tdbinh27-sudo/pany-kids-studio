import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pill } from '../components/Pill';
import { KidSelector } from '../components/KidSelector';
import { DEFAULT_KIDS, Kid } from '../lib/kids';
import { I18N, Lang, L } from '../lib/i18n';
import { C, RADIUS, SP } from '../lib/design';
import { sendChat, ChatMessage } from '../lib/api';
import { load } from '../lib/storage';

interface ChatScreenProps {
  lang: Lang;
}

export function ChatScreen({ lang }: ChatScreenProps) {
  const t = I18N[lang];
  const [kids, setKids] = useState<Kid[]>(DEFAULT_KIDS);
  const [activeKidId, setActiveKidId] = useState<string>(DEFAULT_KIDS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      const k = await load<Kid[]>('kids', DEFAULT_KIDS);
      setKids(k);
    })();
  }, []);

  const kid = kids.find((k) => k.id === activeKidId);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    const result = await sendChat(newMessages, {
      kidId: activeKidId,
      kidName: kid?.name || null,
      kidAge: kid?.age || null,
      lang,
      currentTab: 'chat',
    });

    if (result.error) {
      setError(result.error);
    } else if (result.text) {
      setMessages([...newMessages, { role: 'assistant', content: result.text }]);
    }
    setLoading(false);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgEnd }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={{ padding: SP.lg, paddingBottom: SP.sm }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: C.purple }}>👨‍🏫 Đại Ka</Text>
          <Text style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>
            {L(lang, 'Đại diện AI của bố Bình', "Bố Bình's AI representative")}
          </Text>
          <View style={{ marginTop: SP.sm }}>
            <KidSelector kids={kids} selectedId={activeKidId} onSelect={setActiveKidId} />
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ padding: SP.lg, paddingTop: SP.sm }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            <View style={{ alignItems: 'center', padding: SP.xl }}>
              <Text style={{ fontSize: 56, marginBottom: 12 }}>👋</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: C.ink, textAlign: 'center', marginBottom: 8 }}>
                {L(lang, `Chào ${kid?.name || 'con'}! Đại Ka đây.`, `Hi ${kid?.name || 'kid'}! Đại Ka here.`)}
              </Text>
              <Text style={{ fontSize: 13, color: C.sub, textAlign: 'center', lineHeight: 20 }}>
                {L(
                  lang,
                  'Hỏi em bất cứ điều gì — học bài, ý tưởng dự án, cảm xúc, hoặc chỉ cần trò chuyện.',
                  'Ask me anything — homework, project ideas, feelings, or just chat.'
                )}
              </Text>
            </View>
          ) : (
            messages.map((m, i) => (
              <View
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: m.role === 'user' ? kid?.color || C.pink : C.paper,
                  borderRadius: RADIUS.card,
                  padding: 12,
                  maxWidth: '85%',
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: m.role === 'user' ? '#fff' : C.ink, fontSize: 14, lineHeight: 20 }}>
                  {m.content}
                </Text>
              </View>
            ))
          )}

          {loading && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12 }}>
              <ActivityIndicator color={C.purple} size="small" />
              <Text style={{ color: C.sub, fontSize: 13 }}>{t.typing}</Text>
            </View>
          )}

          {error && (
            <View style={{ backgroundColor: '#FFE5E5', borderRadius: RADIUS.card, padding: 12, marginTop: 8 }}>
              <Text style={{ color: C.coral, fontSize: 12 }}>⚠️ {t.networkError}</Text>
              <Text style={{ color: C.mute, fontSize: 11, marginTop: 4 }}>{error}</Text>
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            padding: SP.md,
            backgroundColor: C.paper,
            borderTopWidth: 1,
            borderTopColor: C.border,
            gap: SP.sm,
            alignItems: 'flex-end',
          }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={t.askDaiKa}
            placeholderTextColor={C.mute}
            multiline
            maxLength={500}
            style={{
              flex: 1,
              backgroundColor: C.soft,
              borderRadius: RADIUS.pill,
              paddingHorizontal: 14,
              paddingVertical: 10,
              fontSize: 14,
              color: C.ink,
              maxHeight: 100,
            }}
          />
          <Pressable
            onPress={send}
            disabled={!input.trim() || loading}
            style={({ pressed }) => ({
              backgroundColor: input.trim() && !loading ? C.purple : C.mute,
              borderRadius: 999,
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
