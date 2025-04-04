import { View, Text, ScrollView } from 'react-native';
import CarCard from '../components/CarCard';
import { Image } from 'react-native';

export default function AIListings() {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center mb-3">
        <Image
          source={require('../assets/icons/ai.png')}
          style={{ width: 20, height: 20, marginRight: 6 }}
          resizeMode="contain"
        />
        <Text className="text-base font-semibold text-gray-900">
          Most cheapest by AI
        </Text>
      </View>

      <View className="flex-row justify-between flex-wrap">
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
    </ScrollView>
  );
}
