import { Children } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

interface ButtonProps {
  viewClassName: string;
  buttonClassName: string;
  children: string | React.ReactNode;
  buttonType?: 'primary' | 'secondary';
  onPress?: () => void;
}

const Button = ({ buttonClassName, viewClassName, children, buttonType = "primary", onPress}: ButtonProps ) => {
  return (
  <View className={`w-full items-center px-16 ${viewClassName}`}>
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} className={`w-full h-14 px-5 items-center justify-center rounded-2xl border-b-4 border-x-hairline ${buttonType === 'primary'? "bg-forestGreen-500  border-forestGreen-600": "bg-butterYellow border-[#BC9F43]"} ${buttonClassName}`}>
        <Text className={`font-semibold text-2xl ${buttonType === 'primary' ? "text-white" : "text-forestGreen-600"}`}>{children}</Text>
  </TouchableOpacity>
  </View>
  );
};


export default Button;