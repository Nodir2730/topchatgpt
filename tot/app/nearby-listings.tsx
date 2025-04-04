import { View, Text, ScrollView } from 'react-native';
import CarCard from '../components/CarCard';

export default function NearbyListings() {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      <Text className="text-[24px] font-bold text-gray-800 mb-4">
        Nearby Listings
      </Text>

      <View className="flex-row flex-wrap justify-between">
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
  );
}
