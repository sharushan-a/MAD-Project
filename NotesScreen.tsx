import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/theme';

type Note = {
  id: string;
  subject: string;
  text: string;
};

const NotesScreen = () => {
  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!text.trim() || !subject.trim()) return;

    if (editingId) {
      // ✏️ Update existing note
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId ? { ...note, subject, text } : note
        )
      );
      setEditingId(null);
    } else {
      // ➕ Add new note
      const newNote: Note = {
        id: Date.now().toString(),
        subject,
        text,
      };
      setNotes((prev) => [...prev, newNote]);
    }

    setText('');
    setSubject('');
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setText(note.text);
    setSubject(note.subject);
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setText('');
      setSubject('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setText('');
    setSubject('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject Name"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={text}
        onChangeText={setText}
      />

      <View style={styles.buttonGroup}>
        <Button
          title={editingId ? 'Update Note' : 'Add Note'}
          onPress={handleAddOrUpdate}
          color={Colors.primary}
        />
        {editingId && (
          <View style={{ marginTop: 10 }}>
            <Button title="Cancel" onPress={handleCancel} color="#999" />
          </View>
        )}
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <View style={styles.card}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.noteText}>{item.text}</Text>
              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
                color="#f44336"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  card: { backgroundColor: Colors.card, padding: 12, borderRadius: 8, marginVertical: 6 },
  subject: { fontSize: 14, fontWeight: 'bold', color: Colors.primary },
  noteText: { fontSize: 16, color: Colors.textPrimary, marginTop: 4 },
  buttonGroup: { marginBottom: 16 },
});
