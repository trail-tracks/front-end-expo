import { View, Image } from "react-native";


const LogoApp = (className:string) => {
  return (
    <View className={`p-2 ${className}`}>
      <Image source={require('../assets/logo-app.png')} />
    </View>
  );
};


export default LogoApp;