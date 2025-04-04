import { View, TextInput, Text } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  error?: string;
}

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  error = '',
}: InputFieldProps) {
  return (
    <View className="mb-4 w-full">
      {/* Label */}
      <Text className="text-gray-800 text-sm font-medium mb-1">{label}</Text>

      {/* Input box */}
      <TextInput
        className={`border rounded-lg px-3 py-2 text-base ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />

      {/* Error */}
      {error ? <Text className="text-red-500 text-xs mt-1">{error}</Text> : null}
    </View>
  );
}
