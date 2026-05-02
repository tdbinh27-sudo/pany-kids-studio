import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { C, RADIUS } from '../lib/design';

interface PillProps {
  label: string;
  color?: string;
  style?: ViewStyle;
}

export function Pill({ label, color = C.pink, style }: PillProps) {
  return (
    <View
      style={[
        {
          backgroundColor: color + '22',
          borderRadius: RADIUS.pill,
          paddingHorizontal: 10,
          paddingVertical: 4,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text style={{ color, fontSize: 11, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}
