import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme';

const DashboardScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Schedule')}>
        <Text style={styles.cardTitle}>📅 Class Schedule</Text>
        <Text style={styles.cardSubtitle}>View or edit your weekly classes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pomodoro Timer')}>
        <Text style={styles.cardTitle}>⏱️ Pomodoro Timer</Text>
        <Text style={styles.cardSubtitle}>Boost focus with timed sessions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Notes')}>
        <Text style={styles.cardTitle}>📝 Notes</Text>
        <Text style={styles.cardSubtitle}>Capture important thoughts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Reminders')}>
        <Text style={styles.cardTitle}>🔔 Reminders</Text>
        <Text style={styles.cardSubtitle}>Never miss what matters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
