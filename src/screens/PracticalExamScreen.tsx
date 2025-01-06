// src/screens/PracticalExamScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { getWeightedExamQuestions } from '../services/questionService';
import QuestionCard from '../components/QuestionCard';
import {
  RootStackParamList,
  QuestionData
} from '../navigation/RootNavigator';

type ExamNavProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function PracticalExamScreen() {
  const navigation = useNavigation<ExamNavProp>();

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [started, setStarted] = useState(false);

  const startExam = () => {
    const raw = getWeightedExamQuestions('MLA-Associate', 50);
    const withSelection = raw.map(q => ({
      ...q,
      selectedOption: null
    }));
    setQuestions(withSelection);
    setStarted(true);
  };

  const handleSelectOption = (questionId: string, selectedIdx: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, selectedOption: selectedIdx } : q
      )
    );
  };

  const finishExam = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (q.selectedOption === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    navigation.navigate('ScoreScreen', {
      correct: correctCount,
      total: questions.length,
      mode: 'exam',
      questions
    });
  };

  if (!started) {
    return (
      <View style={styles.container}>
        <Button title="Start 50-Question Exam" onPress={startExam} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <QuestionCard
            question={item}
            questionNumber={index + 1}
            onSelectOption={handleSelectOption}
          />
        )}
      />
      <Button title="Finish Exam" onPress={finishExam} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
