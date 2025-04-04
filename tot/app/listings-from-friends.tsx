import { View, Text, ScrollView } from 'react-native';
import CarCard from '../components/CarCard';

export default function ListingsFromFriends() {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      <Text className="text-[24px] font-bold text-gray-800 mb-4">
        Listings from Friends
      </Text>

      <View className="flex-row flex-wrap justify-between">
        <CarCard
          title="Malibu"
          year="2022"
          mileage="15 000"
          color="Qora"
          fuel="Benzin"
          condition="Yangi"
          price="27 000"
        />
        <CarCard
          title="Spark"
          year="2020"
          mileage="45 000"
          color="Oq"
          fuel="Gaz"
          condition="Bor"
          price="8 000"
        />
      </View>
    </ScrollView>
  );
}

