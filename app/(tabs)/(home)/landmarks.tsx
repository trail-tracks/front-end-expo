import { LandmarkCard } from "@/components/LandmarkCard";
import StartButton from "@/components/StartButton";
import TrailHeader from "@/components/TrailHeader";
import { useStartTrail } from "@/hooks/useStartTrail";
import { getImageUrl } from "@/lib/api";
import { LandMarkProps } from "@/types/Landmark";
import { TrailProps } from "@/types/Trail";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function landmarks() {
  const { start, buttonText } = useStartTrail();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, [buttonText]);

  const { trail, parkImage } = useLocalSearchParams<{
    trail: string;
    parkImage: string;
  }>();

  if (!trail) {
    router.back();
    return null;
  }
  const trailData: TrailProps = JSON.parse(trail);

  const landmarks: LandMarkProps[] = trailData?.pointsOfInterest || [];

  useEffect(() => {
    // Simula carregamento dos dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const LandmarksHeader = () => {
    return (
      <View className="mb-6">
      
      <TrailHeader
        name={trailData?.name}
        parkImage={parkImage}
        imgSrc={getImageUrl(trailData?.coverUrl)}
        />

      <View className="bg-forestGreen-500 justtfy-center">
        <View className="flex-row items-center mb-4 pt-3 pl-3">
          <Ionicons name="analytics-outline" size={40} color="white" />
          <Text className="ml-2 text-white font-semibold">
            Pontos de interesse
          </Text>
        </View>
      </View>
      </View>
    );
  }


  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
     
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#113D31" />
        </View>
      ) : (
        <>
          <FlatList
            data={landmarks}
            ListHeaderComponent={LandmarksHeader}
            keyExtractor={(item: LandMarkProps, index: number) => String(item?.id)}
            renderItem={({ item }) => (
              <LandmarkCard
                landmark={item}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/(home)/detailPoint",
                    params: {
                      landmark: JSON.stringify(item),
                      trail: trail,
                      parkImage: parkImage,
                    },
                  })
                }
              />
            )}
          />
          <StartButton
            text={buttonText}
            onPress={() => start(trailData, parkImage)}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default landmarks;
