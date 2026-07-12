import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  name: 'DocScan',
  slug: 'docscan',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.apex.docscan',
    infoPlist: {
      NSCameraUsageDescription: 'DocScan needs camera access to scan documents.',
      NSPhotoLibraryUsageDescription: 'DocScan needs photo access to import documents.',
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000000',
    },
    package: 'com.apex.docscan',
    permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE'],
  },
  plugins: [
    'expo-router',
    'expo-font',
    ['expo-camera', { cameraPermission: 'DocScan needs camera access to scan documents.' }],
    ['expo-image-picker', { photosPermission: 'DocScan needs photo access to import documents.' }],
    ['expo-notifications', { sounds: [] }],
    [
      'expo-splash-screen',
      {
        image: './assets/splash.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#000000',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: { projectId: '68808124-911a-4682-9003-a5fe05e9287b' },
  },
});
