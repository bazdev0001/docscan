import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import React from 'react';

export default function App(): React.JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctx = (require as any).context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
