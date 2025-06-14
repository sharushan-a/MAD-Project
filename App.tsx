import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Platform, View, ActivityIndicator, Text } from 'react-native';
import { ScheduleProvider } from './context/ScheduleContext';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  return (
    <ScheduleProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ScheduleProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'web' ? '#f8f8f8' : '#121212',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Platform.OS === 'web' ? '#333' : '#ccc',
  },
});
