import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import ChatInput from '../components/ChatInput';
import MenuOverlay from '../components/MenuOverlay';

// Xabar tipi
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
  
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token"); // 🔐 Tokenni olish
  
      if (!token) {
        throw new Error("Token topilmadi. Iltimos, qayta tizimga kiring.");
      }
  
      const res = await fetch('http://192.168.0.105:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ SHU QATOR MUHIM
        },
        body: JSON.stringify({ message: text }),
      });
  
      if (!res.ok) {
        throw new Error(`Status: ${res.status}`);
      }
  
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);
    } catch (err) {
      console.error('Xatolik:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'AI bilan bog‘lanishda xatolik yuz berdi.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Har bir yangi xabarda avtomatik pastga scroll
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-white relative">
        {/* MENU OVERLAY */}
        {showMenu && (
          <View className="absolute top-0 left-0 w-full h-full z-40">
            <MenuOverlay
              onClose={() => setShowMenu(false)}
              onSignIn={() => {
                setShowMenu(false);
                router.push('/auth');
              }}
            />
          </View>
        )}

        {/* HEADER */}
        <View className="flex-row items-center justify-between px-4 pt-10 pb-3 bg-white z-30">
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Image
              source={require('../assets/icons/menu2.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-800">Suhbat</Text>

          <View style={{ width: 32 }} />
        </View>

        {/* ORTGA TUGMASI */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="ml-4 mt-1"
        >
          <Text className="text-blue-500 text-base underline">← Ortga</Text>
        </TouchableOpacity>

        {/* CHAT MESSAGES */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 mt-2"
          contentContainerStyle={{ paddingBottom: 140 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {messages.map((msg, idx) => (
            <Animated.View
              key={idx}
              entering={FadeInUp.duration(300)}
              className={`mb-3 flex-row ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <Image
                  source={require('../assets/icons/chat1.png')}
                  style={{ width: 26, height: 26, marginRight: 6, marginTop: 4 }}
                />
              )}

              <View
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 rounded-br-none'
                    : 'bg-gray-200 rounded-tl-none'
                }`}
              >
                <Text
                  className={`text-base ${
                    msg.sender === 'user' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {msg.text}
                </Text>
              </View>

              {msg.sender === 'user' && (
                <View style={{ width: 26, height: 26, marginLeft: 6, marginTop: 4 }} />
              )}
            </Animated.View>
          ))}

          {/* LOADING INDICATOR */}
          {isLoading && (
            <View className="flex-row items-center justify-start mb-4 ml-2">
              <Image
                source={require('../assets/icons/chat1.png')}
                style={{ width: 26, height: 26, marginRight: 6 }}
              />
              <View className="bg-gray-200 px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%]">
                <Text className="text-gray-800">AI javob yozmoqda...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* CHAT INPUT */}
        <View className="w-full items-center px-4 pt-2 pb-4">
          <ChatInput onSend={handleSendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
