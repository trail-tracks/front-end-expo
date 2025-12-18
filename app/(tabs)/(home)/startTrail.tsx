import LandmarkTopic from "@/components/LandmarkTopic";
import QRCodeButton from "@/components/QRCodeButton";
import StartButton from "@/components/StartButton";
import TrailHeader from "@/components/TrailHeader";
import { getImageUrl } from "@/lib/api";
import { useTrailSession } from "@/store/useTrailSession";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Platform,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function startTrail() {
  
  const currentTrail = useTrailSession((s) => s.currentTrail);

  if (!currentTrail) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center" edges={Platform.OS === 'ios' ? ['bottom']: ['top', 'bottom']}>
        <Text>Você não está em nenhuma trilha no momento.</Text>
      </SafeAreaView>
    );
  }
  

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
        <FlatList
          ListHeaderComponent={<View className="mb-10"><TrailHeader name={currentTrail.name} imgSrc={getImageUrl(currentTrail.coverUrl) || ""} parkImage={currentTrail.parkImage}/></View>}
          data={currentTrail.landmarks}
          renderItem={ ({item}) => (
            <View className="px-6">
              <LandmarkTopic 
                title={item.name} 
                id={item.id}
                size={45}
                registered={item.registered}
                disable={item.disable}
                onPress={() => router.push({
                  pathname: "/(tabs)/(home)/detailPoint",
                  params: {
                    landmark: JSON.stringify(item),
                    trail: JSON.stringify(currentTrail),
                    parkImage: currentTrail.parkImage,
                  },
                })}
                
              />
            </View>
            
          )}
          ItemSeparatorComponent={() => <View className="mx-11 pl-0.5"><View className="w-2 h-14 -my-1 bg-forestGreen-500"/></View>}
          ListEmptyComponent={<Text className="px-6 text-lg font-medium">esta trilha não possui pontos de interesse</Text>}
        />

      {currentTrail.finalized? <StartButton text="Finalizar trilha" onPress={() => router.push('/(tabs)/(home)/endTrail')}/> : <QRCodeButton/> }
    </SafeAreaView>
  );
}

export default startTrail;
