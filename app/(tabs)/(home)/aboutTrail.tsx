import StartButton from "@/components/StartButton";
import TrailHeader from "@/components/TrailHeader";
import { useStartTrail } from "@/hooks/useStartTrail";
import { getImageUrl } from "@/lib/api";
import { TrailProps } from "@/types/Trail";
import Foundation from "@expo/vector-icons/Foundation";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

function aboutTrail() {
  const { trail, parkImage } = useLocalSearchParams<{
    trail: string;
    parkImage: string;
  }>();

  if (!trail) {
    router.back();
    return null;
  }
  const trailData: TrailProps = JSON.parse(trail);

  const { start, buttonText } = useStartTrail();

  return (
    <SafeAreaView
      className="flex-1"
      edges={["bottom"]}
    >
      <TrailHeader
        name={trailData.name}
        parkImage={parkImage}
        imgSrc={getImageUrl(trailData.coverUrl)}
      />
      <View className="bg-[#FFC500] flex-row p-6 items-center gap-4">
        <Foundation name="info" size={24} color="#113D31" />
        <Text className="font-bold text-forestGreen-500">Sobre a Trilha</Text>
      </View>
      <View className="flex-1 bg-white">
        <WebView
          originWhitelist={["*"]}
          style={{ background: "black" }}
          source={{
            html: `
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap" rel="stylesheet">
            <div style='padding: 24px; font-size: 30px; font-family: Gabarito, Roboto, sans-serif'>
              ${trailData.description || "Sem descrição disponível."}
            </div>
            `,
          }}
        />
      </View>

      <StartButton text={buttonText} onPress={() => start(trailData, parkImage)} />
    </SafeAreaView>
  );
}

export default aboutTrail;