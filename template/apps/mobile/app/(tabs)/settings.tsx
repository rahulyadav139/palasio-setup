import { Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Settings</Text>
      <Text className="mt-2 text-base text-gray-500">
        Configure your app preferences here.
      </Text>
    </View>
  );
}
