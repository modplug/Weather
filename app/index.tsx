import { WeatherListItem } from "@/components/WeatherListItem";
import { DEFAULT_LOCATIONS } from "@/constants/constants";
import { Coordinates } from "@/types/globals";
import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const MainScreen = () => {
  const [locations, setLocations] = useState<Coordinates[]>(DEFAULT_LOCATIONS);
  const renderItem = (item: Coordinates, index: number) => {
    return <WeatherListItem coords={item} index={index} />;
  };

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      const userLocation = {
        id: 0,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      // check if the location is already in the list
      const exists = locations.find(
        (l) =>
          l.latitude === userLocation.latitude &&
          l.longitude === userLocation.longitude
      );
      if (exists) return;

      setLocations((currentLocations) => [userLocation, ...currentLocations]);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Locations</Text>
      </View>
      <FlatList
        keyExtractor={(i) =>
          `${i.latitude.toString()}-${i.longitude.toString()}`
        }
        data={locations}
        renderItem={(i) => renderItem(i.item, i.index)}
      ></FlatList>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "beige",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    maxHeight: 50,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    color: "black",
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "500",
  },
});
