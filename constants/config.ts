export const Collections = {
  USERS: 'users',
  SCANNED_DOCS: 'scanned_docs',
  NOTIFICATIONS: 'notifications',
} as const;

export const AppConfig = {
  appName: 'DocScan',
  appSlug: 'docscan',
  bundleId: 'com.apex.docscan',
  version: '1.0.0',
  sentryDsn: process.env.SENTRY_DSN ?? '',
} as const;
