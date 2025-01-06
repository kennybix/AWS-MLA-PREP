
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useRoute, RouteProp, useNavigation  } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import type { StackNavigationProp } from '@react-navigation/stack';

type ScoreScreenRouteProp = RouteProp<RootStackParamList, 'ScoreScreen'>;

type ScoreRouteProp = RouteProp<RootStackParamList, 'ScoreScreen'>;
type ScoreNavProp = StackNavigationProp<RootStackParamList, 'ScoreScreen'>;

export default function ScoreScreen() {
  const route = useRoute<ScoreRouteProp>();
  const navigation = useNavigation<ScoreNavProp>();

  const { correct, total, mode, questions } = route.params;

  const percentage = Math.round((correct / total) * 100);

  // Decide circle color
  let circleColor = '#00b300'; // green by default
  if (percentage < 50) {
    circleColor = '#ff4d4d'; // red for less than 50%
  } else if (percentage < 80) {
    circleColor = '#ffcc00'; // yellow for 50-79%
  }

  const handleRestart = () => {
    if (mode === 'quiz') {
    // Jump to the "Quizzes" tab
    navigation.replace('MainTabs', { screen: 'Quizzes' });

    } else {
    // Jump to the "Exam" tab
    navigation.replace('MainTabs', { screen: 'Exam' });

    }
  };

  const handleReview = () => {
    navigation.navigate('ReviewAnswersScreen', { questions });
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Score</Text>
      <Text style={styles.subtitle}>
        You answered {correct} out of {total} questions correctly ({percentage}%).
      </Text>

      {/* Circular progress indicator */}
      <CircularProgress
        value={percentage}
        maxValue={100}
        radius={80}
        duration={1500}
        progressValueColor="#333"       // <-- replaces textColor
        progressValueFontSize={24}      // <-- replaces fontSize
        valueSuffix="%"
        inActiveStrokeColor="#f0f0f0"
        activeStrokeColor={circleColor}
        activeStrokeWidth={12}
        inActiveStrokeWidth={12}
      />
      <View style={styles.buttonContainer}>
        <Button title="Restart" onPress={handleRestart} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Review Answers" onPress={handleReview} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%'
  }
});
