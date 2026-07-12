import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { getDocs, DocItem } from '../../services/docs';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';

export default function DocsScreen(): React.JSX.Element {
  const { user } = useAuth();
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;
    getDocs(user.uid)
      .then(setDocs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const renderItem = ({ item }: { item: DocItem }): React.JSX.Element => (
    <Card style={styles.docCard}>
      <Text style={styles.docTitle}>{item.title}</Text>
      <Text style={styles.docDate}>
        {item.createdAt instanceof Date
          ? item.createdAt.toLocaleDateString()
          : new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.docPreview} numberOfLines={2}>{item.extractedText}</Text>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      {docs.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No documents yet. Scan your first document!</Text>
        </View>
      ) : (
        <FlatList
          data={docs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 24 },
  list: { paddingBottom: 24 },
  docCard: { marginBottom: 12 },
  docTitle: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 4 },
  docDate: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  docPreview: { fontSize: 14, color: Colors.textSecondary },
  emptyText: { color: Colors.textSecondary, fontSize: 16, textAlign: 'center' },
});
