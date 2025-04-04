import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

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
};

export default function MenuOverlay({ onClose, onSignIn }: MenuOverlayProps) {
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
      {/* Profil */}
      <View className="flex-row items-center mb-6">
        <Image
          source={require('../assets/profile.png')}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
        <Text className="ml-3 text-lg font-semibold">Anora</Text>
      </View>

      {/* Balance */}
      <View className="flex-row items-center mb-5">
        <Image
          source={require('../assets/icons/wallet.png')}
          style={{ width: 28, height: 28 }}
        />
        <Text className="ml-3 text-base">Balance: 19,000</Text>
      </View>

      {/* To‘ldirish */}
      <View className="flex-row items-center mb-5">
        <Image
          source={require('../assets/icons/topup.png')}
          style={{ width: 28, height: 28 }}
        />
        <Text className="ml-3 text-base">To‘ldirish</Text>
      </View>

      {/* Menyular */}
      {[
        { iconKey: 'profile', label: 'Profilim' },
        { iconKey: 'ads', label: "E'lonlarim" },
        { iconKey: 'people', label: 'Tanishlar' },
        { iconKey: 'invite', label: 'Tanishlarga yuboring' },
        { iconKey: 'settings', label: 'Sozlamalar' },
      ].map((item, idx) => (
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

      {/* Sign In (navigatsiyani boshqaruvchiga topshiradi) */}
      <TouchableOpacity onPress={onSignIn} className="mt-4">
        <Text className="text-base text-blue-600 font-semibold">Sign In</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
