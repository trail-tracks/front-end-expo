import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import LogoApp from '../components/LogoApp';
import Button from '../components/Button';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-forestGreen-400">
        Welcome to Nativewind!
      </Text>
      <LogoApp/>

      <Button label='iniciar' buttonType='green'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
