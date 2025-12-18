import { Stack } from "expo-router";
export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Início" }} />
      <Stack.Screen name="detailTrail" options={{ title: "Detalhes" }} />
      <Stack.Screen name="selectTrail" options={{ title: "Sobre" }} />
      <Stack.Screen name="aboutTrail" options={{ title: "Sobre a trilha" }} />
      <Stack.Screen
        name="landmarks"
        options={{ title: "pontos de interesse" }}
      />
      <Stack.Screen
        name="interestPoints"
        options={{ title: "Pontos de interesse" }}
      />
      <Stack.Screen name="endTrail" options={{ title: "Finalizar trilha" }} />
    </Stack>
  );
}
