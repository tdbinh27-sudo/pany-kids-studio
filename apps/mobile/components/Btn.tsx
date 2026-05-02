import React from 'react';
import { Pressable, Text, ViewStyle, ActivityIndicator } from 'react-native';
import { C, RADIUS, SP } from '../lib/design';

interface BtnProps {
  label: string;
  onPress: () => void;
  color?: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
}

export function Btn({
  label,
  onPress,
  color = C.pink,
  variant = 'solid',
  size = 'md',
  disabled,
  loading,
  icon,
  style,
}: BtnProps) {
  const padding = size === 'sm' ? { paddingVertical: 6, paddingHorizontal: 14 } : size === 'lg' ? { paddingVertical: 14, paddingHorizontal: 24 } : { paddingVertical: 10, paddingHorizontal: 18 };
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: variant === 'solid' ? color : 'transparent',
          borderWidth: 2,
          borderColor: color,
          borderRadius: RADIUS.btn,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SP.sm,
          ...padding,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'solid' ? '#fff' : color} size="small" />
      ) : (
        <>
          {icon ? <Text style={{ fontSize: fontSize + 2 }}>{icon}</Text> : null}
          <Text
            style={{
              color: variant === 'solid' ? '#fff' : color,
              fontWeight: '700',
              fontSize,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
