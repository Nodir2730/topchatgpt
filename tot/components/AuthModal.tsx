import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AuthModal({ visible, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validatsiyalar
  const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);
  const isStrongPassword = (val: string) => val.length >= 8;

  const emailError = email && !isValidEmail(email) ? 'Email noto‘g‘ri' : '';
  const passwordError =
    password && !isStrongPassword(password)
      ? 'Kamida 8 ta belgidan iborat parol kiriting'
      : '';

  const isFormValid = isValidEmail(email) && isStrongPassword(password);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="bg-white w-full max-w-[380px] rounded-2xl p-6 shadow-xl"
        >
          <Text className="text-center text-[20px] font-bold mb-6">
            {isLogin ? 'Tizimga kirish' : "Ro'yxatdan o'tish"}
          </Text>

          {/* Email */}
          <Text className="text-sm text-gray-700 mb-1">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg px-3 py-2 text-base mb-2"
          />
          {emailError ? (
            <Text className="text-red-500 text-xs mb-2">{emailError}</Text>
          ) : null}

          {/* Parol */}
          <Text className="text-sm text-gray-700 mb-1">Parol</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-3 py-2 text-base mb-2"
          />
          {passwordError ? (
            <Text className="text-red-500 text-xs mb-2">{passwordError}</Text>
          ) : null}

          {/* Kirish / Ro‘yxatdan o‘tish tugmasi */}
          <TouchableOpacity
            disabled={!isFormValid}
            className={`py-3 rounded-lg mb-4 ${
              isFormValid ? 'bg-blue-600' : 'bg-blue-300'
            }`}
            onPress={() => {
              console.log(
                isLogin ? 'Kirish' : 'Ro‘yxatdan o‘tish',
                email,
                password
              );
              onClose();
            }}
          >
            <Text className="text-center text-white font-semibold text-base">
              {isLogin ? 'Kirish' : "Ro'yxatdan o‘tish"}
            </Text>
          </TouchableOpacity>

          {/* Toggle */}
          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
            className="mb-2"
          >
            <Text className="text-center text-blue-600 text-sm">
              {isLogin
                ? "Ro'yxatdan o'tmaganmisiz? Ro'yxatdan o'tish"
                : 'Allaqachon hisobingiz bormi? Kirish'}
            </Text>
          </TouchableOpacity>

          {/* Bekor qilish */}
          <TouchableOpacity onPress={onClose}>
            <Text className="text-center text-gray-400 text-sm mt-2">
              Bekor qilish
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
