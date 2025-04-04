import { View, Text, Image } from 'react-native';

interface CarCardProps {
  title: string;
  year: string;
  mileage: string;
  color: string;
  fuel: string;
  condition: string;
  price: string;
}

export default function CarCard({
  title,
  year,
  mileage,
  color,
  fuel,
  condition,
  price,
}: CarCardProps) {
  return (
    <View className="w-[264px] h-[192px] bg-white border border-gray-300 rounded-[13px] px-3 py-2 m-2">
      {/* Title */}
      <View className="flex-row items-center justify-start mb-2">
        <Image
          source={require('../assets/icons/chevrolet.png')}
          style={{ width: 38, height: 38, marginRight: 10 }}
          resizeMode="contain"
        />
        <Text className="text-[24px] font-bold text-gray-900">{title}</Text>
      </View>

      {/* Info rows */}
      <View className="flex-row justify-between">
        <View className="space-y-2">
          <Row icon="calendar.png" text={year} />
          <Row icon="color.png" text={color} />
          <Row icon="condition.png" text={condition} />
        </View>
        <View className="space-y-2">
          <Row icon="speed.png" text={mileage} />
          <Row icon="fuel.png" text={fuel} />
          <Row icon="price.png" text={price} />
        </View>
      </View>
    </View>
  );
}

function Row({ icon, text }: { icon: string; text: string }) {
  const iconMap: Record<string, any> = {
    'calendar.png': require('../assets/icons/calendar.png'),
    'speed.png': require('../assets/icons/speed.png'),
    'color.png': require('../assets/icons/color.png'),
    'fuel.png': require('../assets/icons/fuel.png'),
    'condition.png': require('../assets/icons/condition.png'),
    'price.png': require('../assets/icons/price.png'),
  };

  const iconSource = iconMap[icon];

  return (
    <View className="flex-row items-center">
      <Image
        source={iconSource}
        style={{ width: 22, height: 22, marginRight: 10 }}
        resizeMode="contain"
      />
      <Text className="text-[20px] text-gray-800" style={{ paddingRight: 12 }}>
        {text}
      </Text>
    </View>
  );
}
