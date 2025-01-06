// src/components/QuestionCard.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

// interface Props {
//   question: Question;
//   questionNumber: number;
//   onAnswerChecked?: (isCorrect: boolean) => void; // new
// }

interface Props {
  question: Question;
  questionNumber: number;
  onSelectOption?: (questionId: string, selectedIdx: number) => void;
}


export default function QuestionCard({ question, questionNumber, onSelectOption }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    onSelectOption?.(question.id, index);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const isCorrect = selectedOption === question.correctAnswerIndex;


  
  return (
    <View style={styles.card}>
      <Text style={styles.questionNumber}>Question {questionNumber}</Text>
      <Text style={styles.questionText}>{question.question}</Text>

      {question.options.map((option, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.optionButton,
            selectedOption === idx && styles.optionSelected
          ]}
          onPress={() => handleOptionSelect(idx)}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}

      {!showAnswer ? (
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckAnswer}>
          <Text style={styles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.answerSection}>
          {selectedOption === null ? (
            <Text style={styles.incorrectText}>
              No option selected yet.
            </Text>
          ) : isCorrect ? (
            <Text style={styles.correctText}>Correct!</Text>
          ) : (
            <Text style={styles.incorrectText}>Incorrect.</Text>
          )}

          {question.explanation && (
            <Text style={styles.explanation}>
              Explanation: {question.explanation}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 6,
    elevation: 1
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  questionText: {
    fontSize: 14,
    marginBottom: 10
  },
  optionButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 4,
    borderRadius: 4
  },
  optionSelected: {
    backgroundColor: '#d6eaff'
  },
  checkButton: {
    marginTop: 10,
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center'
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  answerSection: {
    marginTop: 10
  },
  correctText: {
    color: 'green',
    fontWeight: '600'
  },
  incorrectText: {
    color: 'red',
    fontWeight: '600'
  },
  explanation: {
    marginTop: 8,
    fontStyle: 'italic'
  }
});
