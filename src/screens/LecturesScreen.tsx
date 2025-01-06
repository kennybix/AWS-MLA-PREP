// src/screens/LecturesScreen.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LectureList from '../components/LectureList';

export default function LecturesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecture Series</Text>
      <LectureList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12
  }
});
