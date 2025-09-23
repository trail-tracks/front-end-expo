import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "./CardButton";

type ParkCardProps = {
  image?: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function ParkCard({
  image,
  title,
  subtitle,
  onPress,
}: ParkCardProps) {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`flex-row items-center rounded-xl p-3 mb-3 border mr-9 ml-9 ${selected ? "border-butterYellow" : "border-gray-300"}`}
    >
      {image && (
        <Image
          source={image}
          className="w-12 h-12 rounded-md mr-3"
          resizeMode="cover"
        />
      )}
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900">{title}</Text>
        {selected && (
          <Text className="text-xs text-gray-500 mb-2">{subtitle}</Text>
        )}
      </View>
      <View className="ml-3">
        <Button />
      </View>
    </TouchableOpacity>
  );
}