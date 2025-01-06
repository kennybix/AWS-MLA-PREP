// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AWS ML Prep!</Text>
      <Text style={styles.subtitle}>
        Get ready to ace your AWS Machine Learning Specialty exam.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Learning"
          onPress={() => navigation.navigate('Lectures')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Take a Quick Quiz"
          onPress={() => navigation.navigate('Quizzes')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Full-Length Exam"
          onPress={() => navigation.navigate('Exam')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 12,
    color: '#555'
  },
  buttonContainer: {
    marginVertical: 6,
    width: '80%'
  }
});
