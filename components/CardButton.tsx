import { router } from 'expo-router';
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface CardButtonProps {
  buttonClassName?: string;
  children?: string | React.ReactNode;
  buttonType?: 'primary' | 'secondary';
  onPress?: () => void;
  selected?: boolean; // Adiciona a prop selected
}

const CardButton = ({
  buttonClassName,
  children,
  buttonType = "primary",
  onPress,
  selected = false, // Default false
}: CardButtonProps) => {

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/index');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`h-11 w-11 items-center justify-center rounded-lg ${buttonClassName}`}
    >
      <View className='h-full w-full items-center justify-center'>
        {/* {selected ? (    Falta implementar o ícone do botão selecionado
          <View style={{ backgroundColor: '#007AFF', width: 24, height: 24, borderRadius: 12 }} />
        ) : (
          <View style={{ backgroundColor: '#CCCCCC', width: 24, height: 24, borderRadius: 12 }} />
        )} */}
      </View>
    </TouchableOpacity>
  );
};


export default CardButton;