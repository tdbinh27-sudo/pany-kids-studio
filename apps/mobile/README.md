# Pany Kids Studio — Mobile (Expo + React Native)

Native mobile companion to the web app. Targets App Store + Google Play (kids 6-15) for launch 8/2026.

## Status

**v0.1.0** — Sprint 1 Day 6-7 scaffold (2026-05-02). 4 starter screens. NOT yet tested on device.

## Stack

- **Expo SDK 53** + React Native 0.79 + React 19
- **TypeScript** strict mode
- **React Navigation v7** bottom tabs
- **AsyncStorage** for persistence (mirrors web `pks3-*` keys for export/import compat)
- **Đại Ka API** = same `/api/chat` endpoint as web (Vercel + VPS)

## Structure

```
apps/mobile/
├── App.tsx                  # Root, NavigationContainer, 4-tab bar
├── app.json                 # Expo config (bundle id: io.panykids.app)
├── package.json             # Deps
├── lib/
│   ├── design.ts            # Color tokens — mirrors web's C constants
│   ├── storage.ts           # AsyncStorage wrapper (same API as web)
│   ├── api.ts               # Đại Ka /api/chat fetch helper
│   ├── i18n.ts              # vi/en translations
│   ├── kids.ts              # Kid type + DEFAULT_KIDS
│   ├── riasec-junior.ts     # COPY of web — 36+48 questions, 6 types, scoring
│   ├── careers-v2.ts        # COPY of web — 60 careers
│   └── family-prompts.ts    # COPY of web — ask-parent + weekly review
├── components/
│   ├── Card.tsx             # Top-accent card
│   ├── Btn.tsx              # Pressable button (solid/outline, 3 sizes)
│   ├── Pill.tsx             # Inline tag chip
│   └── KidSelector.tsx      # Horizontal scroll of kid avatars
└── screens/
    ├── HomeScreen.tsx       # Welcome + kid select + streak + mood + tip
    ├── DiscoveryScreen.tsx  # Mood (5 emoji) + RIASEC quiz + results
    ├── ChatScreen.tsx       # Đại Ka chat with KeyboardAvoidingView
    └── SettingsScreen.tsx   # Lang toggle + privacy + about
```

## First-time setup

```bash
cd apps/mobile
pnpm install                  # or npm install
pnpm start                    # opens Expo dev server
# Then press:
#   i  — open iOS simulator
#   a  — open Android emulator
#   w  — open web (limited support)
#   scan QR code with Expo Go app on phone
```

## Required before first run

1. **Install Expo Go** on your phone (iOS App Store / Play Store)
2. **Phone + computer on same Wi-Fi** for QR code to work
3. **Add placeholder assets** in `assets/`:
   - `icon.png` (1024×1024)
   - `splash.png` (1284×2778 or vector)
   - `adaptive-icon.png` (1024×1024 with 25% padding)
   - `favicon.png` (48×48)

   Quick placeholder: any 🌸 emoji exported as PNG works for dev.

## API connection

`lib/api.ts` calls `https://pany-kids-studio.vercel.app/api/chat` by default. Override in `app.json`:

```json
"extra": {
  "apiBaseUrl": "https://your-domain.com"
}
```

## Sync with web

Mobile + web share **identical localStorage/AsyncStorage keys** (`pks3-*`). The web's Export JSON file imports cleanly into mobile and vice versa — once Import is wired (TODO).

Pure-data lib files (`riasec-junior.ts`, `careers-v2.ts`, `family-prompts.ts`) are currently **copied** between web and mobile. After v0.2 we'll extract to `packages/shared/` workspace.

## Build for App Store / Play Store

After EAS init:

```bash
eas build --platform ios
eas build --platform android
eas submit --platform ios       # requires Apple Developer ($99/yr)
eas submit --platform android   # requires Google Play Console ($25 once)
```

Submission target: **8/2026** per `strategy-v2.md` Q5.

## Day 6-7 deliverables (2026-05-02)

- ✅ Full Expo scaffold + config
- ✅ 4 atom components (Card/Btn/Pill/KidSelector)
- ✅ 4 starter screens (Home/Discovery/Chat/Settings)
- ✅ AsyncStorage wrapper compatible with web's data shape
- ✅ Đại Ka chat wired to existing `/api/chat`
- ✅ RIASEC quiz fully functional (port of web SelfDiscoveryTab)
- ✅ Bilingual VI/EN
- ⏸️ Assets (icon/splash) — placeholder paths only
- ⏸️ Not tested on device yet — anh cần `pnpm install && pnpm start`

## Known TODOs (Sprint 2)

- [ ] Add real assets (icon.png, splash.png — design via Claude Design)
- [ ] Add screens for: Calendar, Library, Career Compass, Family Bridge
- [ ] Add Studio Sáng tạo (canvas) — use `react-native-skia` or `@shopify/react-native-skia`
- [ ] Add Body Movement timer (use expo-haptics for tick feedback)
- [ ] Move shared data to `packages/shared/` workspace
- [ ] Extract Đại Ka system prompt to a shared `prompts/` package
- [ ] Add expo-font: Fredoka, Quicksand, Caveat
- [ ] Add expo-notifications for daily streak reminder
- [ ] EAS init + obtain projectId
- [ ] Internal beta via TestFlight + Play Internal Testing
```
