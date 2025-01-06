// src/screens/QuizzesScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { getRandomQuizQuestions } from '../services/questionService'; // your service
import QuestionCard from '../components/QuestionCard'; // card with "Check Answer"
import {
  RootStackParamList,
  QuestionData
} from '../navigation/RootNavigator';

type QuizNavProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function QuizzesScreen() {
  const navigation = useNavigation<QuizNavProp>();

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [started, setStarted] = useState(false);

  /** Start quiz with either 5 or 10 random questions */
  const startQuiz = (numQ: number) => {
    const raw = getRandomQuizQuestions(numQ);
    const withSelection = raw.map(q => ({
      ...q,
      selectedOption: null
    }));
    setQuestions(withSelection);
    setStarted(true);
  };

  /** Called by each QuestionCard when user selects an option */
  const handleSelectOption = (questionId: string, selectedIdx: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, selectedOption: selectedIdx } : q
      )
    );
  };

  /** Finish => calculate correct => go to ScoreScreen */
  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (q.selectedOption === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    navigation.navigate('ScoreScreen', {
      correct: correctCount,
      total: questions.length,
      mode: 'quiz',
      questions
    });
  };

  if (!started) {
    return (
      <View style={styles.container}>
        <Button title="Start 5-Question Quiz" onPress={() => startQuiz(5)} />
        <View style={{ marginVertical: 8 }} />
        <Button title="Start 10-Question Quiz" onPress={() => startQuiz(10)} />
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
      <Button title="Finish Quiz" onPress={finishQuiz} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
