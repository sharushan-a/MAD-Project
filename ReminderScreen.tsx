import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import * as Notifications from 'expo-notifications';
import { Colors } from '../constants/theme';

type Reminder = {
  id: string;
  title: string;
  datetime: Date;
  // notificationId?: string;
};

const ReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const handleSchedule = async () => {
    if (!title) return;

    // let notificationId = 'web-placeholder';

    if (Platform.OS !== 'web') {
      Alert.alert('Reminder Set', 'Notifications are not supported in Expo Go on this SDK version. Please use a development build.');
    } else {
      Alert.alert('Reminder Set', 'Notifications are not supported on web.');
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      datetime,
      // notificationId,
    };

    setReminders((prev) => [...prev, newReminder]);
    setTitle('');
  };

  const handleDelete = (id: string) => {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Set a Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Reminder Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />

      <Button title="Pick Date & Time" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={datetime}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === 'dismissed') {
              setShowPicker(false);
              return;
            }
            setShowPicker(false);
            if (selectedDate) setDatetime(selectedDate);
          }}
        />
      )}

      <Button
        title="Send Reminder Now"
        onPress={handleSchedule}
        color={Colors.primary}
      />

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <Text>{item.datetime.toLocaleString()}</Text>
            <Button
              title="Delete"
              onPress={() => handleDelete(item.id)}
              color="#f44336"
            />
          </View>
        )}
      />
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: '#000',
  },
  item: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  reminderTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
});
