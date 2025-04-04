import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import CarCard from '../components/CarCard';
import ChatInput from '../components/ChatInput';
import MenuOverlay from '../components/MenuOverlay';

export default function Home() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
      <View className="flex-1 bg-white relative">
        {/* Slide-in Menu */}
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

        {/* Scrollable content */}
        <ScrollView className="flex-1 px-4 pt-10 pb-[130px]">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <Image
                source={require('../assets/icons/menu2.png')}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Image
              source={require('../assets/icons/chat1.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </View>

          {/* Most cheapest by AI */}
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
            <CarCard
              title="Cobalt"
              year="2020"
              mileage="61 526"
              color="Oq"
              fuel="Benzin"
              condition="Bor"
              price="11 200"
            />
            <CarCard
              title="Cobalt"
              year="2020"
              mileage="61 526"
              color="Oq"
              fuel="Benzin"
              condition="Bor"
              price="11 200"
            />
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
            <CarCard
              title="Spark"
              year="2019"
              mileage="85 000"
              color="Qora"
              fuel="Gaz"
              condition="Bor"
              price="8 300"
            />
            <CarCard
              title="Nexia"
              year="2021"
              mileage="49 000"
              color="Oq"
              fuel="Benzin"
              condition="Yangi"
              price="10 500"
            />
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
            <CarCard
              title="Lacetti"
              year="2021"
              mileage="73 000"
              color="Oq"
              fuel="Gaz"
              condition="Bor"
              price="9 800"
            />
            <CarCard
              title="Nexia 2"
              year="2018"
              mileage="105 000"
              color="Qora"
              fuel="Benzin"
              condition="Bor"
              price="7 300"
            />
          </View>
        </ScrollView>

        {/* ChatInput */}
        <View className="absolute bottom-6 w-full items-center z-20">
          <ChatInput />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
