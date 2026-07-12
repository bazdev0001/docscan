import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { saveDoc } from '../../services/docs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';

export default function ScanScreen(): React.JSX.Element {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [ocrText, setOcrText] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    // Mock OCR: in production this would call a real OCR API
    if (imageUri) {
      const mockText = `Document scanned successfully.\n\nDocument Type: Invoice\nDate: ${new Date().toLocaleDateString()}\nAmount: $0.00\nReference: DOC-${Date.now().toString().slice(-6)}\n\n[OCR placeholder — integrate real OCR service here]`;
      setOcrText(mockText);
    }
  }, [imageUri]);

  const handleSave = async (): Promise<void> => {
    if (!user) return;
    try {
      setSaving(true);
      await saveDoc(user.uid, {
        title: `Scan ${new Date().toLocaleDateString()}`,
        imageUri: imageUri ?? '',
        extractedText: ocrText,
        createdAt: new Date(),
      });
      Alert.alert('Saved', 'Document saved to your library.', [
        { text: 'OK', onPress: (): void => { router.push('/(tabs)/docs'); } },
      ]);
    } catch (_error) {
      Alert.alert('Error', 'Could not save document. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Scan Result</Text>

      <Card style={styles.card}>
        <Text style={styles.label}>EXTRACTED TEXT</Text>
        <Text style={styles.ocrText}>{ocrText || 'Processing...'}</Text>
      </Card>

      <Button title="Save Document" onPress={handleSave} loading={saving} style={styles.saveButton} />
      <Button title="Rescan" onPress={() => router.back()} variant="outline" style={styles.rescanButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 24 },
  card: { marginBottom: 24 },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  ocrText: { fontSize: 15, color: Colors.text, lineHeight: 22 },
  saveButton: { marginBottom: 12 },
  rescanButton: {},
});
