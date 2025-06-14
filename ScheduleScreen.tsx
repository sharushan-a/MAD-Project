import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSchedule } from '../context/ScheduleContext';
import { Colors } from '../constants/theme';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

const ScheduleScreen = () => {
  const { schedule } = useSchedule();
  const [localSchedule, setLocalSchedule] = useState(schedule);

  const [className, setClassName] = useState('');
  const [day, setDay] = useState(daysOfWeek[0]);
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!className.trim() || !time.trim()) return;

    if (editingId) {
      const updated = localSchedule.map((item) =>
        item.id === editingId
          ? { ...item, className, day, time }
          : item
      );
      setLocalSchedule(updated);
      setEditingId(null);
    } else {
      const newClass = {
        id: Date.now().toString(),
        className,
        day,
        time,
      };
      setLocalSchedule((prev) => [...prev, newClass]);
    }

    setClassName('');
    setTime('');
    setDay(daysOfWeek[0]);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setClassName(item.className);
    setDay(item.day);
    setTime(item.time);
  };

  const handleDelete = (id: string) => {
    setLocalSchedule((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) handleCancel();
  };

  const handleCancel = () => {
    setEditingId(null);
    setClassName('');
    setDay(daysOfWeek[0]);
    setTime('');
  };

  const onTimeSelected = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formatted =
        (hours % 12 || 12) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ' ' +
        (hours >= 12 ? 'PM' : 'AM');
      setTime(formatted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Class Schedule</Text>

      <TextInput
        style={styles.input}
        placeholder="Class Name"
        value={className}
        onChangeText={setClassName}
        placeholderTextColor="#999"
      />

      <View style={styles.dayPickerWrapper}>
        <Text style={styles.label}>Day</Text>
        <View style={styles.compactPickerContainer}>
          <Picker
            selectedValue={day}
            onValueChange={(value: string) => setDay(value)}
            style={styles.compactPicker}
            dropdownIconColor="#888"
          >
            {daysOfWeek.map((d) => (
              <Picker.Item label={d} value={d} key={d} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            style={styles.input}
            placeholder="Select Time"
            value={time}
            editable={false}
            placeholderTextColor="#999"
          />
        </View>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={false}
          display="default"
          onChange={onTimeSelected}
        />
      )}

      <TouchableOpacity style={styles.customButton} onPress={handleAddOrUpdate}>
        <Text style={styles.buttonText}>{editingId ? 'Update Class' : 'Add Class'}</Text>
      </TouchableOpacity>

      {editingId && (
        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#999' }]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={localSchedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <View style={styles.card}>
              <Text style={styles.className}>{item.className}</Text>
              <Text style={styles.details}>
                {item.day} • {item.time}
              </Text>
              <TouchableOpacity
                style={[styles.customButton, { backgroundColor: '#f44336', marginTop: 10 }]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: '#000',
  },
  dayPickerWrapper: {
    marginBottom: 10,
  },
  compactPickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 56, // 🔼 taller than before
    justifyContent: 'center',
  },
  compactPicker: {
    height: 56, // 🔼 match container
    width: '100%',
    fontSize: 18, // 🔼 larger font
    color: '#000',
  },
  label: {
    fontSize: 16, // 🔼 slightly larger label
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  details: {
    color: Colors.textPrimary,
    marginTop: 4,
    marginBottom: 8,
  },
  customButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
