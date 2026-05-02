import React from 'react';
import { View, ViewStyle } from 'react-native';
import { C, RADIUS, SHADOW, SP } from '../lib/design';

interface CardProps {
  children: React.ReactNode;
  accent?: string;
  padding?: number;
  style?: ViewStyle;
}

export function Card({ children, accent = C.purple, padding = SP.xl, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: C.paper,
          borderRadius: RADIUS.modal,
          padding,
          marginBottom: SP.md,
          borderTopWidth: 4,
          borderTopColor: accent,
          ...SHADOW.soft,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
