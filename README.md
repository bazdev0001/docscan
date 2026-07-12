# docscan

> AI-powered document scanner mobile app using Expo React Native and Claude Vision.

## What It Does
docscan is a mobile application that captures documents through the device camera and uses Anthropic's Claude Vision API to extract and analyze text and structured data fields. It outputs structured JSON results that can be exported or displayed in-app. It is a sibling project to docscan-camera, using the official `@anthropic-ai/sdk` npm package rather than raw fetch.

## Tech Stack
- Language: TypeScript
- Framework: Expo ~55 / React Native 0.83.6 / React 19
- Key deps: `@anthropic-ai/sdk ^0.27.0`, `expo-camera ~16.0`, `@react-navigation/native-stack ^7`

## Key Features
- Camera capture with expo-camera (full-screen, portrait)
- Claude Vision API integration for structured field extraction
- JSON export of extracted document data
- React Navigation stack (Home → Scan flow)
- TypeScript strict mode throughout

## How to Run
```bash
npm install
# Set EXPO_PUBLIC_ANTHROPIC_API_KEY in .env
npm start        # Expo dev server
npm run ios      # iOS (macOS only)
npm run android  # Android emulator
npm run web      # Web (experimental)
```

## Status
Prototype — project scaffold with Anthropic SDK integration; feature parity with docscan-camera unclear as src/App.tsx was not populated at last check.
