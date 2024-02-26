import { colors } from "@/constants/colors";
import { SettingsContext } from "@/contexts/SettingsContext";
import { useReverseGeocoding } from "@/hooks/useReverseGeocoding";
import { useWeatherForLocation } from "@/hooks/useWeatherForLocation";
import { Coordinates } from "@/types/globals";
import { TemperatureUnit, getTemperatureForUnit } from "@/utils/weatherUtils";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type WeatherCardProps = {
  coords: Coordinates;
  index: number;
};
export const WeatherListItem = ({ coords, index }: WeatherCardProps) => {
  const { isLoading, weatherData, error } = useWeatherForLocation(coords);
  const address = useReverseGeocoding({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });
  const settings = useContext(SettingsContext);
  const unit = settings?.unit ?? TemperatureUnit.Celsius;
  const color = colors[index % colors.length];
  const imageUrl = `https://raw.githubusercontent.com/metno/weathericons/main/weather/png/${weatherData?.properties?.timeseries[0]?.data.next_1_hours?.summary.symbol_code}.png`;

  const temperature = getTemperatureForUnit(
    weatherData?.properties.timeseries[0].data.instant.details
      .air_temperature ?? 0,
    unit
  );

  // show loading or error state

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/details/",
          params: {
            lat: coords.latitude,
            lon: coords.longitude,
            color: color,
          },
        });
      }}
      style={[{ backgroundColor: color }, styles.touchableOpacity]}
    >
      <View style={styles.viewContent}>
        <View>
          <Text style={styles.cityText}>{address.geocodedLocation?.city}</Text>
          <Text>{address.geocodedLocation?.country}</Text>
        </View>
        <View style={styles.temperatureAndImageContainer}>
          <Text style={{ fontSize: 48 }}>
            {temperature}
            {unit}
          </Text>
          <Image
            tintColor={"#000"}
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  viewContent: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityText: {
    fontWeight: "500",
    fontSize: 24,
  },
  image: {
    tintColor: "#000",
    width: 30,
    height: 30,
  },
  temperatureText: {
    fontSize: 48,
  },
  touchableOpacity: {
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  temperatureAndImageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
