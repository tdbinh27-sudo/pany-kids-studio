import React from 'react';
import { ScrollView, Pressable, Text, View } from 'react-native';
import { Kid } from '../lib/kids';
import { C, RADIUS, SP } from '../lib/design';

interface KidSelectorProps {
  kids: Kid[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function KidSelector({ kids, selectedId, onSelect }: KidSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: SP.sm, paddingVertical: SP.sm }}
    >
      {kids.map((k) => {
        const active = selectedId === k.id;
        return (
          <Pressable
            key={k.id}
            onPress={() => onSelect(k.id)}
            style={({ pressed }) => ({
              backgroundColor: active ? k.color : '#fff',
              borderWidth: 2,
              borderColor: k.color,
              borderRadius: RADIUS.pill,
              paddingVertical: 6,
              paddingHorizontal: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text style={{ fontSize: 16 }}>{k.emoji}</Text>
            <Text style={{ color: active ? '#fff' : k.color, fontWeight: '700', fontSize: 13 }}>
              {k.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
