// src/components/LectureList.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import lecturesData from '../data/lectures.json';
import LectureDetail from './LectureDetail';

interface Lecture {
  id: string;
  title: string;
  content: string;
}

export default function LectureList() {
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={lecturesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => setSelectedLecture(item)}
          >
            <Text style={styles.listItemText}>{item.title}</Text>
          </Pressable>
        )}
      />
      {selectedLecture && (
        <LectureDetail lecture={selectedLecture} onClose={() => setSelectedLecture(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 6,
    borderRadius: 4,
    elevation: 1
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
