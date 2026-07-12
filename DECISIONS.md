# DocScan — Phase 2 Decisions

## Date: 2026-07-12

## Build Status

### TypeScript check: PASS
- Zero errors after fix: renamed `index.ts` → `index.tsx` (JSX in .ts file caused parse error)
- Added `(require as any).context` cast to suppress `Property 'context' does not exist on type 'NodeRequire'`

### ESLint check: PASS (0 errors, 0 warnings)
- Fixed: `catch (error)` → `catch (_error)` in sign-in, sign-up, profile, scan, docs services
- Fixed: Removed unused `View` import from scan.tsx
- Fixed: Added `caughtErrorsIgnorePattern: '^_'` to ESLint config so `_error` catch bindings are allowed
- Fixed: Added explicit return type to Alert onPress callback in scan.tsx

### Jest check: PASS
- 2 test suites, 6 tests, 0 failures
- Button component tests: 4 tests pass
- useAuth hook tests: 2 tests pass

### EAS Build: BLOCKED — Expo account login required
- `eas build` requires `eas login` or `EXPO_TOKEN` env var
- EAS projectId is placeholder in app.config.ts — needs real Expo project registration

## Git

- Commit: 27c56bbcc842716a8ef9b0af711397b6cd17a7a8
- GitHub: https://github.com/bazdev0001/docscan
- Branch: main
- Pre-push hook ran all checks before push — all passed

## Architecture Decisions

- Used Expo Router `app/` directory structure (not old src/ layout)
- Expo Router entry: `index.tsx` with `ExpoRoot` + `require.context` pattern
- Auth flow: `_layout.tsx` uses `useSegments` to redirect unauthenticated users to sign-in
- Tabs: Capture (camera/gallery), Scan (OCR result + save), Documents (list), Profile (sign out)
- OCR is mocked — placeholder text returned; production would call a real OCR API
- Firebase: separate services for firebase init, auth, firestore, and docs collection
- Push notifications: registered via `registerForPushNotifications` in services/notifications.ts
- Colors: dark-themed with indigo primary (#6366f1)
- Bundle IDs: `com.apex.docscan` (iOS + Android)
