import axios from 'axios';
import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.0.105:8000/login', {
        email,
        password,
      });

      const token = res.data.access_token;

      await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Tizimga muvaffaqiyatli kirdingiz!');
      router.push('/'); // asosiy sahifaga o'tish
    } catch (err) {
      Alert.alert('Xatolik', 'Email yoki parol noto‘g‘ri!');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <Text>Parol</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Kirish" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
