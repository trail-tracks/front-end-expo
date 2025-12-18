import LevelIcon from "@/assets/level_icon.svg";
import StartButton from "@/components/StartButton";
import TrailHeader from "@/components/TrailHeader";
import { useStartTrail } from "@/hooks/useStartTrail";
import { entitiesService, getImageUrl, trailsService } from "@/lib/api";
import { EntityProps } from "@/types/Entity";
import { TrailProps } from "@/types/Trail";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { StatusBar } from 'expo-status-bar';


import { SafeAreaView } from "react-native-safe-area-context";
function detailTrail() {
  const { trailId, parkImage, entityId } = useLocalSearchParams<{
    trailId: string;
    parkImage: string;
    entityId?: string;
  }>();

  const idTrail = Number(trailId);
  const idPark = entityId ? Number(entityId) : undefined;
  const [trail, setTrail] = useState<TrailProps | null>(null);
  const [park, setPark] = useState<EntityProps | null>(null);
  const { start, buttonText } = useStartTrail();

  useEffect(() => {
    async function fetchTrailData() {
      if (!idTrail) return;
      const data = await trailsService.getById(idTrail);
      setTrail(data);
    }
    fetchTrailData();
  }, [idTrail]);

  useEffect(() => {
    async function fetchParkData() {
      if (!idPark) return;
      const data = await entitiesService.getById(idPark);
      setPark(data);
    }
    fetchParkData();
  }, [idPark]);

  const renderItem = ({ item }: { item: TrailProps["gallery"][0] }) => {
    console.log(item.url);
    return (
      <Image
        className="rounded-2xl mr-2"
        source={{ uri: getImageUrl(item.url) || undefined }}
        style={{ width: 150, height: 190 }}
      />
    );
  };

  return (
    <SafeAreaView
      className="flex-1"
      edges={["bottom"]}
    >

      <StatusBar style="auto" />
      <ScrollView>
        <TrailHeader
          name={trail?.name}
          imgSrc={getImageUrl(trail?.coverUrl)}
          parkImage={parkImage || getImageUrl(park?.coverUrl) || ""}
        />
        <View className="bg-white p-6 gap-2">
          <View className="flex-row items-center ">
            <MaterialCommunityIcons name="clock" size={14} color="#BF360C" />
            <Text className="text-forestGreen-500 font-medium ml-2">
              {trail?.duration} min
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={14}
              color="#BF360C"
            />
            <Text className="text-forestGreen-500 font-medium ml-2">
              {trail?.distance} km
            </Text>
          </View>
          <View className="flex-row items-center">
            <LevelIcon width={14} height={14} />
            <Text className="text-forestGreen-500 font-medium ml-2">
              {trail?.difficulty}
            </Text>
          </View>
        </View>
        <View className="bg-[#F0EEEEAB] p-6">
          <Text className="text-forestGreen-500 font-semibold m-1">
            Descrição
          </Text>
          <Text className="text-black font-semibold m-1 text-justify text-xs">
            {trail?.shortDescription}
          </Text>
        </View>
        <View className="bg-[#FFE489] pl-6 pt-6 pb-12">
          <Text className="text-forestGreen-500 font-semibold m-1 mb-4">
            Imagens
          </Text>
          <FlatList
            data={trail?.gallery}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        <TouchableOpacity
          className="bg-forestGreen-500 p-6 flex-row items-center justify-between"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/(home)/landmarks",
              params: {
                trail: JSON.stringify(trail),
                parkImage: parkImage || getImageUrl(park?.coverUrl) || "",
              },
            })
          }
        >
          <View className="flex-row items-center gap-4">
            <Ionicons name="analytics-outline" size={24} color="white" />
            <Text className="text-white">Pontos de interesse</Text>
          </View>

          <Octicons
            className="mr-4"
            name="chevron-right"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#FFC500] p-6 flex-row items-center justify-between"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/(home)/aboutTrail",
              params: {
                trail: JSON.stringify(trail),
                parkImage: parkImage || getImageUrl(park?.coverUrl) || "",
              },
            })
          }
        >
          <View className="flex-row items-center gap-4">
            <Foundation name="info" size={24} color="#113D31" />
            <Text className="text-forestGreen-500 font-semibold">
              Sobre a trilha
            </Text>
          </View>
          <Octicons
            className="mr-4"
            name="chevron-right"
            size={24}
            color="#113D31"
          />
        </TouchableOpacity>
        <View className="border border-forestGreen-500/50 p-6 m-10 rounded-2xl gap-4">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={24}
              color="#FF3C00"
            />
            <Text className="text-forestGreen-500 font-semibold m-1">
              Dicas de seguança
            </Text>
          </View>

          <Text className=" font-semibold text-xs  m-1">
            {trail?.safetyTips}
          </Text>
        </View>
      </ScrollView>
      <StartButton text={buttonText} onPress={() => start(trail, parkImage)} />
    </SafeAreaView>
  );
}

export default detailTrail;
