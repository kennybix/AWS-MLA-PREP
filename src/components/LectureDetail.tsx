// src/components/LectureDetail.tsx
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';

interface Lecture {
  id: string;
  title: string;
  content: string;
}

interface Props {
  lecture: Lecture;
  onClose: () => void;
}

export default function LectureDetail({ lecture, onClose }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lecture.title}</Text>
      <ScrollView style={styles.contentContainer}>
        {/* 
          If you have HTML, parse with e.g. react-native-render-html or 
          just show it as text. Here we assume simple text for brevity.
        */}
        <Text style={styles.contentText}>{lecture.content}</Text>
      </ScrollView>
      <Button title="Close" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 4,
    marginTop: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  contentContainer: {
    maxHeight: 200,
    marginBottom: 8
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20
  }
});
