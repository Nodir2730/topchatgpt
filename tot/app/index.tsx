import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import CarCard from '../components/CarCard';
import ChatInput from '../components/ChatInput';
import MenuOverlay from '../components/MenuOverlay';

export default function Home() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  // ChatInput ichida yozish boshlansa, Chat sahifasiga o‘tamiz
  const handleInputFocus = () => {
    router.push('/chat');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-white relative">
          {/* Menu ochiq bo‘lsa, fon va menyuni ko‘rsatamiz */}
          {showMenu && (
            <View className="absolute top-0 left-0 w-full h-full z-40">
              {/* Fonni bosganda menyuni yopish */}
              <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
                <View style={{ position: 'absolute', width: '100%', height: '100%' }} />
              </TouchableWithoutFeedback>

              {/* MenuOverlay komponenti */}
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
            <TouchableOpacity onPress={() => router.push('/chat')}>
              <Image
                source={require('../assets/icons/chat1.png')}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* MAIN BODY */}
          <ScrollView
            className="flex-1 px-4 pb-[130px]"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            {/* AI Listings */}
            <TouchableOpacity
              onPress={() => router.push('/ai-listings')}
              className="flex-row items-center mb-3"
            >
              <Image
                source={require('../assets/icons/ai.png')}
                style={{ width: 30, height: 30, marginRight: 9 }}
                resizeMode="contain"
              />
              <Text className="text-[24px] font-semibold text-gray-900">
                Most cheapest by AI
              </Text>
            </TouchableOpacity>

            <View className="flex-row flex-wrap justify-between mb-6">
              <CarCard title="Cobalt" year="2020" mileage="61 526" color="Oq" fuel="Benzin" condition="Bor" price="11 200" />
              <CarCard title="Cobalt" year="2020" mileage="61 526" color="Oq" fuel="Benzin" condition="Bor" price="11 200" />
            </View>

            {/* Listings from friends */}
            <TouchableOpacity
              onPress={() => router.push('/listings-from-friends')}
              className="flex-row items-center mt-[5px] mb-[5px]"
            >
              <Image
                source={require('../assets/icons/friends.png')}
                style={{ width: 30, height: 30, marginRight: 9 }}
                resizeMode="contain"
              />
              <Text className="text-[24px] font-semibold text-gray-900">
                Listings from friends
              </Text>
            </TouchableOpacity>

            <View className="flex-row flex-wrap justify-between mb-6">
              <CarCard title="Spark" year="2019" mileage="85 000" color="Qora" fuel="Gaz" condition="Bor" price="8 300" />
              <CarCard title="Nexia" year="2021" mileage="49 000" color="Oq" fuel="Benzin" condition="Yangi" price="10 500" />
            </View>

            {/* Nearby listings */}
            <TouchableOpacity
              onPress={() => router.push('/nearby-listings')}
              className="flex-row items-center mt-[5px] mb-[5px]"
            >
              <Image
                source={require('../assets/icons/location.png')}
                style={{ width: 30, height: 30, marginRight: 9 }}
                resizeMode="contain"
              />
              <Text className="text-[24px] font-semibold text-gray-900">
                Nearby listings
              </Text>
            </TouchableOpacity>

            <View className="flex-row flex-wrap justify-between mb-6">
              <CarCard title="Lacetti" year="2021" mileage="73 000" color="Oq" fuel="Gaz" condition="Bor" price="9 800" />
              <CarCard title="Nexia 2" year="2018" mileage="105 000" color="Qora" fuel="Benzin" condition="Bor" price="7 300" />
            </View>
          </ScrollView>

          {/* CHAT INPUT */}
          <View className="w-full items-center px-4 pt-2 pb-4">
            <ChatInput
              onSend={() => {}}
              onFocus={handleInputFocus}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
