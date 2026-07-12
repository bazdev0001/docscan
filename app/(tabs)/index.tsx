import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';

export default function CaptureScreen(): React.JSX.Element {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickFromGallery = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: false,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async (): Promise<void> => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission Required', 'Camera access is needed to scan documents.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: false,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const handleScan = (): void => {
    if (!image) {
      Alert.alert('No Image', 'Please capture or select a document first.');
      return;
    }
    router.push({ pathname: '/(tabs)/scan', params: { imageUri: image } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Document</Text>
      <Text style={styles.subtitle}>Take a photo or pick from gallery</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No document selected</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <Button title="Camera" onPress={takePhoto} style={styles.halfButton} />
        <Button title="Gallery" onPress={pickFromGallery} variant="outline" style={styles.halfButton} />
      </View>

      {image && (
        <Button title="Scan Document" onPress={handleScan} style={styles.scanButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.background },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 24 },
  preview: { width: '100%', height: 280, borderRadius: 12, marginBottom: 24 },
  placeholder: {
    width: '100%', height: 280, borderRadius: 12, backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed',
  },
  placeholderText: { color: Colors.textSecondary, fontSize: 16 },
  buttonRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  halfButton: { flex: 1 },
  scanButton: { marginTop: 8 },
});
