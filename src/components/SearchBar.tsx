import { useState } from "react";
import { View, Text, TextInput} from "react-native";
import Feather from '@expo/vector-icons/Feather';

interface SearchBarProps {
  className: string;
  label: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({ className, label, onChangeText, placeholder}: SearchBarProps) => {
    const [value, setValue] = useState('')

    const handleChange = (text: string) => {
      onChangeText(text);
      setValue(text);

    }

  return (
   <View className="w-full my-3 px-12">
    <Feather name="search" size={24} color="black" />
    <TextInput 
      className={`w-full h-14 px-5 rounded-2xl border bg-white ${className}`}
      placeholder={label}
      onChangeText={handleChange}
      value={value}
    />
    
   </View>
  );
};


export default SearchBar;