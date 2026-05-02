import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from './screens/HomeScreen';
import { DiscoveryScreen } from './screens/DiscoveryScreen';
import { ChatScreen } from './screens/ChatScreen';
import { SettingsScreen } from './screens/SettingsScreen';

import { Lang, I18N } from './lib/i18n';
import { C } from './lib/design';
import { load, persist } from './lib/storage';

const Tab = createBottomTabNavigator();

export default function App() {
  const [lang, setLangState] = useState<Lang>('vi');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await load<Lang>('lang', 'vi');
      setLangState(saved);
      setReady(true);
    })();
  }, []);

  const setLang = async (l: Lang) => {
    setLangState(l);
    await persist('lang', l);
  };

  if (!ready) return null;
  const t = I18N[lang];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: C.purple,
              tabBarInactiveTintColor: C.mute,
              tabBarStyle: {
                backgroundColor: C.paper,
                borderTopColor: C.border,
                paddingBottom: 6,
                paddingTop: 6,
                height: 64,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
              },
              tabBarIcon: ({ focused }) => {
                const emoji =
                  route.name === 'Home' ? '🏠' :
                  route.name === 'Discovery' ? '🔮' :
                  route.name === 'Chat' ? '👨‍🏫' :
                  '⚙️';
                return <Text style={{ fontSize: focused ? 24 : 20 }}>{emoji}</Text>;
              },
            })}
          >
            <Tab.Screen name="Home" options={{ title: t.home }}>
              {() => <HomeScreen lang={lang} />}
            </Tab.Screen>
            <Tab.Screen name="Discovery" options={{ title: t.discovery }}>
              {() => <DiscoveryScreen lang={lang} />}
            </Tab.Screen>
            <Tab.Screen name="Chat" options={{ title: t.chat }}>
              {() => <ChatScreen lang={lang} />}
            </Tab.Screen>
            <Tab.Screen name="Settings" options={{ title: t.settings }}>
              {() => <SettingsScreen lang={lang} setLang={setLang} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
