import { colours, fontSize } from "@/constants/tokens";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { FloatingPlayer } from "@/components/FloatingPlayer";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colours.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            paddingTop: 8,
            backgroundColor: "#25292e",
          },
          headerShown: false,
          tabBarBackground: () => (
            <BlurView
              intensity={80}
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "musical-notes-sharp" : "musical-notes-outline"}
                color={color}
                size={20}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            title: "Favourites",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                name={focused ? "heartbeat" : "heart"}
                color={color}
                size={20}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "playlist-music" : "playlist-music-outline"}
                color={color}
                size={20}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome6
                name={focused ? "users-line" : "users"}
                color={color}
                size={20}
              />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 70,
        }}
      />
    </>
  );
}
