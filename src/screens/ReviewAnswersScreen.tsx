// src/screens/ReviewAnswersScreen.tsx

import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, QuestionData } from '../navigation/RootNavigator';

type ReviewRouteProp = RouteProp<RootStackParamList, 'ReviewAnswersScreen'>;

export default function ReviewAnswersScreen() {
  const route = useRoute<ReviewRouteProp>();
  const { questions } = route.params;

  const renderReviewItem = ({ item, index }: { item: QuestionData; index: number }) => {
    const isCorrect = item.selectedOption === item.correctAnswerIndex;
    return (
      <View style={styles.card}>
        <Text style={styles.questionNumber}>Question {index + 1}</Text>
        <Text style={styles.questionText}>{item.question}</Text>

        <Text style={styles.selection}>
          You chose: {item.selectedOption != null ? item.options[item.selectedOption] : 'No Selection'}
        </Text>

        {isCorrect ? (
          <Text style={styles.correctText}>Correct!</Text>
        ) : (
          <Text style={styles.incorrectText}>Incorrect</Text>
        )}

        <Text style={styles.answerText}>
          Correct answer: {item.options[item.correctAnswerIndex]}
        </Text>

        {item.explanation && (
          <Text style={styles.explanation}>Explanation: {item.explanation}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Answers</Text>
      <FlatList
        data={questions}
        keyExtractor={q => q.id}
        renderItem={renderReviewItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 6,
    padding: 14,
    elevation: 1
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600'
  },
  questionText: {
    marginVertical: 6
  },
  selection: {
    marginVertical: 6
  },
  correctText: {
    color: 'green',
    fontWeight: '600'
  },
  incorrectText: {
    color: 'red',
    fontWeight: '600'
  },
  answerText: {
    marginTop: 4,
    fontWeight: '500'
  },
  explanation: {
    marginTop: 8,
    fontStyle: 'italic'
  }
});
