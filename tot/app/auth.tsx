import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import { useRouter } from 'expo-router';
  
  export default function AuthScreen() {
    const router = useRouter();
  
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);
    const isStrongPassword = (val: string) => val.length >= 8;
  
    const isFormValid = isLogin
      ? email.trim() !== '' && password.trim() !== ''
      : isValidEmail(email) && isStrongPassword(password);
  
    return (
      <KeyboardAvoidingView
        className="flex-1 bg-white justify-center items-center px-5"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="w-full max-w-[380px] bg-white px-6 py-8 rounded-xl shadow-xl">
          {/* Header */}
          <Text className="text-[24px] font-bold text-center mb-6 text-gray-900">
            {isLogin ? 'Tizimga kirish' : "Ro'yxatdan o'tish"}
          </Text>
  
          {/* Email */}
          <Text className="text-[17px] font-medium mb-1 text-gray-800">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2 text-[16px]"
          />
          {!isLogin && email && !isValidEmail(email) && (
            <Text className="text-red-500 text-sm mb-2">Email noto‘g‘ri</Text>
          )}
  
          {/* Password */}
          <Text className="text-[17px] font-medium mb-1 text-gray-800">Parol</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2 text-[16px]"
          />
          {!isLogin && password && !isStrongPassword(password) && (
            <Text className="text-red-500 text-sm mb-2">
              Kamida 8 ta belgidan iborat parol kiriting
            </Text>
          )}
  
          {/* Submit button */}
          <TouchableOpacity
            disabled={!isFormValid}
            onPress={() => {
              console.log(isLogin ? 'Kirish:' : 'Ro‘yxat:', email, password);
              router.back();
            }}
            className={`py-3 rounded-lg mt-4 ${
              isFormValid ? 'bg-blue-600' : 'bg-blue-300'
            }`}
          >
            <Text className="text-white text-center text-base font-semibold">
              {isLogin ? 'KIRISH' : "RO'YXATDAN O'TISH"}
            </Text>
          </TouchableOpacity>
  
          {!isLogin && (
  <TouchableOpacity onPress={() => setIsLogin(true)} className="mt-6">
    <Text className="text-center text-blue-600 text-sm">
       Hisobingiz bormi?
    </Text>
    <Text className="text-center text-blue-600 text-lg mt-6">
      KIRISH
    </Text>
  </TouchableOpacity>
)}

  
          {isLogin && (
            <TouchableOpacity onPress={() => setIsLogin(false)} className="mt-6">
              <Text className="text-blue-600 text-center text-[14px] font-bold uppercase">
                RO'YXATDAN O'TISH
              </Text>
            </TouchableOpacity>
          )}
  
          {/* Back icon */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 items-center"
          >
            <Image
              source={require('../assets/icons/backauth.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  