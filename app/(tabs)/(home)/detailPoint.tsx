import LandmarkTopic from "@/components/LandmarkTopic";
import ReturnButton from "@/components/ReturnButton";
import StartButton from "@/components/StartButton";
import { useRegisterLandmark } from "@/hooks/useRegisterLandmark";
import { getImageUrl } from "@/lib/api";

import { LandMarkProps } from "@/types/Landmark";
import { TrailProps } from "@/types/Trail";
import { Foundation } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

function detailPoint() {
  const { landmark, parkImage, trail } = useLocalSearchParams<{
    landmark: string;
    trail: string;
    parkImage: string;
  }>();
  const parkImg = parkImage;
  const landmarkData: LandMarkProps = JSON.parse(landmark);
  const trailData: TrailProps = JSON.parse(trail);
  
  const { register, currentTrail } = useRegisterLandmark();
  const [isRegistered, setIsRegistered] = useState(false);

  const checkRegistered = useCallback(() => {
    if (currentTrail === undefined) {
      return false;
    } else if (currentTrail?.id !== trailData.id) {
      return false;
    }
    const landmark = currentTrail.landmarks.find(lm => lm.id === landmarkData.id);
    return landmark?.registered || false;
  }, [currentTrail, trailData.id, landmarkData.id]);

  useFocusEffect(
    useCallback(() => {
      setIsRegistered(checkRegistered());
    }, [checkRegistered])
  );

  

  const renderItem = ({
    item,
  }: {
    item: { id: number; url: string; uuid: string };
  }) => {
    return (
      <Image
        className="rounded-2xl mr-2"
        source={{ uri: getImageUrl(item.url) || undefined }}
        style={{ width: 150, height: 190 }}
      />
    );
  };

  function handlePress() {
    register(trailData, landmarkData.id, parkImage);
  }

    

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <ScrollView>
        <ImageBackground
          style={{ height: "auto", width: "auto" }}
          source={{ uri: getImageUrl(landmarkData.coverUrl) || "" }}
          resizeMode="cover"
        >
          <View className="mx-16 py-6 pb-72">
            <View className="flex-row gap-4 items-center justify-center mt-10">
              <ReturnButton buttonType="secondary" />

              <View className="bg-white items-center py-1 justify-between pl-6 gap-4 pr-2 rounded-3xl flex-row overflow-hidden">
                <Text className="flex-1 text-forestGreen-500 font-bold text-center" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                  {trailData.name}
                </Text>
                <Image
                  source={parkImg ? { uri: parkImg } : undefined}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <View className="bg-butterYellow/35 flex-row items-center px-6 py-4 gap-3">
            <LandmarkTopic title={landmarkData.name} id={landmarkData.id} animated={false} size={40} registered={isRegistered}/>
        </View>

        <View className="p-6">
          <Text className="text-forestGreen-500 font-semibold m-1">
            Descrição
          </Text>
          <Text className="text-black font-semibold m-1 text-justify text-xs">
            {landmarkData.shortDescription || "Descrição não disponível."}
          </Text>
        </View>
        <View className="bg-[#FFE489] pl-6 pt-6 pb-12">
          <Text className="text-forestGreen-500 font-semibold m-1 mb-4">
            Imagens
          </Text>
          <FlatList
            data={landmarkData.gallery}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
        <View className="bg-white flex-row p-6 items-center gap-4">
          <Foundation name="info" size={24} color="#113D31" />
          <Text className="font-bold text-forestGreen-500">Sobre o Ponto</Text>
        </View>
        <View className="bg-white h-96 w-full">
          <WebView
            originWhitelist={["*"]}
            style={{ background: "white" }}
            source={{
              html: `
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap" rel="stylesheet">
            <div style='padding: 24px; font-family: Gabarito, Roboto, sans-serif; font-size: 30px; width: calc(100% - 48px); word-wrap: break-word;'>
              ${landmarkData.description || "Sem descrição disponível."}
            </div>
            `,
            }}
          />
        </View>
      </ScrollView>
      <StartButton text="Registrar" onPress={handlePress} />
    </SafeAreaView>
  );
}

export default detailPoint;
