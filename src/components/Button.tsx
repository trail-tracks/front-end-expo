import { View, Text, Pressable, TouchableOpacity } from "react-native";

interface ButtonProps {
  className: string;
  label: string;
  buttonType?: 'green' | 'yellow';
  onPress?: () => void;
}

const Button = ({ className, label, buttonType, onPress}: ButtonProps) => {
  return (
    <View className="w-full items-center mx-10">
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} className={`w-64 h-14  items-center justify-center rounded-2xl border-b-hairline ${buttonType === 'green'? "bg-forestGreen-500  border-forestGreen-600": "bg-butterYellow-500 border-[#BC9F43]"} ${className}`}>
        <Text className={`font-semibold text-xl ${buttonType === 'green' ? "text-white" : "text-forestGreen-600"}`}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Button;