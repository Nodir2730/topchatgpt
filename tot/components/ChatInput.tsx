import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface ChatInputProps {
  onSend: (text: string) => void;
  onFocus?: () => void; // 🔥 yangi props — input bosilganda chaqiriladi
}

export default function ChatInput({ onSend, onFocus }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage('');
  };

  const handleAdd = () => {
    console.log('Fayl qo‘shish tugmasi bosildi');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Savolingizni yozing..."
        multiline
        style={styles.input}
        placeholderTextColor="#999"
        onFocus={onFocus} 
        // ✅ input bosilganda router.push('/chat') ishlaydi
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />

      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleAdd}>
          <Image
            source={require('../assets/icons/add.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSend}>
          <Image
            source={require('../assets/icons/send.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    minHeight: 100,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    textAlignVertical: 'top',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
