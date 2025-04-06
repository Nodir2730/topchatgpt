import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MenuOverlayProps {
  onClose: () => void;
  onSignIn: () => void;
}

const screenHeight = Dimensions.get('window').height;

const icons = {
  profile: require('../assets/icons/profile.png'),
  ads: require('../assets/icons/ads.png'),
  people: require('../assets/icons/people.png'),
  invite: require('../assets/icons/invite.png'),
  settings: require('../assets/icons/settings.png'),
  wallet: require('../assets/icons/wallet.png'),
  topup: require('../assets/icons/topup.png'),
};

export default function MenuOverlay({ onClose, onSignIn }: MenuOverlayProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      setEmail(storedEmail);
    };
    loadEmail();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    setEmail(null);
    Alert.alert('Tizimdan chiqdingiz');
    onClose();
  };

  return (
    <Animated.View
      entering={SlideInLeft.duration(300)}
      exiting={SlideOutLeft.duration(300)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: screenHeight,
        width: 280,
        backgroundColor: '#e2e2e2',
        paddingHorizontal: 16,
        paddingVertical: 24,
        zIndex: 50,
        elevation: 10,
      }}
    >
      {/* Yopish tugmasi (X) */}
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 60,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>×</Text>
      </TouchableOpacity>

      {/* Profil rasmi va ism */}
      <View className="flex-row items-center mb-6 mt-6">
        <Image
          source={require('../assets/profile.png')}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
        <Text className="ml-3 text-lg font-semibold">Anora</Text>
      </View>

      {/* Balance */}
      <View className="flex-row items-center mb-5">
        <Image source={icons.wallet} style={{ width: 28, height: 28 }} />
        <Text className="ml-3 text-base">Balance: 19,000</Text>
      </View>

      {/* To‘ldirish */}
      <View className="flex-row items-center mb-5">
        <Image source={icons.topup} style={{ width: 28, height: 28 }} />
        <Text className="ml-3 text-base">To‘ldirish</Text>
      </View>

      {[{ iconKey: 'profile', label: 'Profilim' },
        { iconKey: 'ads', label: "E'lonlarim" },
        { iconKey: 'people', label: 'Tanishlar' },
        { iconKey: 'invite', label: 'Tanishlarga yuboring' },
        { iconKey: 'settings', label: 'Sozlamalar' }].map((item, idx) => (
        <View
          key={idx}
          className="flex-row items-center"
          style={{ marginBottom: idx === 4 ? 20 : 12 }}
        >
          <Image
            source={icons[item.iconKey as keyof typeof icons]}
            style={{ width: 28, height: 28 }}
          />
          <Text className="ml-3 text-base">{item.label}</Text>
        </View>
      ))}

      {email ? (
        <View className="mt-8 items-start">
          <Text className="text-xs text-gray-600 mb-1">Email:</Text>
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            {email}
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text className="text-red-500 font-semibold">Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onSignIn} className="mt-4">
          <Text className="text-base text-blue-600 font-semibold">Sign In</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
