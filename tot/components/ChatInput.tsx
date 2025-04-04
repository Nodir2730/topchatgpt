import { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log('Yuborildi:', message);
    setMessage('');
  };

  const handleAdd = () => {
    console.log('Fayl qo‘shish tugmasi bosildi');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Savolingizni yozing..."
          multiline
          style={styles.input}
          placeholderTextColor="#999"
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    width: 350,
    height: 100,
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
