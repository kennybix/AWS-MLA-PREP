// RootNavigator.tsx
import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LecturesScreen from '../screens/LecturesScreen';
import QuizzesScreen from '../screens/QuizzesScreen';
import PracticalExamScreen from '../screens/PracticalExamScreen';
import ScoreScreen from '../screens/ScoreScreen';
import ReviewAnswersScreen from '../screens/ReviewAnswersScreen';

// The shape for each question
export interface QuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  selectedOption?: number | null;
}

// 1) Define the tab routes
export type TabParamList = {
  Home: undefined;
  Lectures: undefined;
  Quizzes: undefined;       // Must include "Quizzes"
  Exam: undefined;          // Must include "Exam"
};

// 2) Define the root stack routes
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;  // Must be typed this way
  ScoreScreen: {
    correct: number;
    total: number;
    mode: 'quiz' | 'exam';
    questions: QuestionData[];
  };
  ReviewAnswersScreen: {
    questions: QuestionData[];
  };
};

// Create typed navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Lectures') {
            iconName = 'book-outline';
          } else if (route.name === 'Quizzes') {
            iconName = 'help-circle-outline';
          } else if (route.name === 'Exam') {
            iconName = 'clipboard-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lectures" component={LecturesScreen} />
      <Tab.Screen name="Quizzes" component={QuizzesScreen} />
      <Tab.Screen
        name="Exam"
        component={PracticalExamScreen}
        options={{ title: 'Practical Exam' }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    // <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />

        <RootStack.Screen
          name="ScoreScreen"
          component={ScoreScreen}
          options={{ headerShown: true, title: 'Your Score' }}
        />

        <RootStack.Screen
          name="ReviewAnswersScreen"
          component={ReviewAnswersScreen}
          options={{ headerShown: true, title: 'Review Answers' }}
        />
      </RootStack.Navigator>
    // {/* </NavigationContainer> */}
  );
}
