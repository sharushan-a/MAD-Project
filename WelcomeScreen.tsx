import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Start fade animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false, 
    }).start();

    // Navigate to Main drawer after 5 seconds
    const timer = setTimeout(() => {
      console.log('✅ Resetting to Main drawer...');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        📚 Study Buddy
      </Animated.Text>
      <Text style={styles.credit}>Created by Sharushan & Jibran</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  credit: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
