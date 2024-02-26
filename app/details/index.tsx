import { WeatherInfoItem, WeatherInfoType } from "@/components/WeatherInfoItem";
import { WeeklyForecast } from "@/components/WeeklyForecast";
import { COLORS } from "@/constants/constants";
import { SettingsContext } from "@/contexts/SettingsContext";
import { useReverseGeocoding } from "@/hooks/useReverseGeocoding";
import { useWeatherDetailsAnimations } from "@/hooks/useWeatherDetailsAnimations";
import { useWeatherForLocation } from "@/hooks/useWeatherForLocation";
import { toLongDate } from "@/utils/dateUtils";
import {
  TemperatureUnit,
  generateWeatherSummary,
  getCurrentWeatherStatus,
  getTemperatureForUnit,
  getValuesFromSeries,
} from "@/utils/weatherUtils";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export type WeatherInfoProps = {
  lat: any;
  lon: any;
  color?: string | undefined;
};

const WeatherDetails = () => {
  // Workaround for typing issue in expo router
  const queryParams = useLocalSearchParams<WeatherInfoProps>();
  const lat = Number.parseFloat(queryParams.lat as string);
  const lon = Number.parseFloat(queryParams.lon as string);

  const generateRandomColor = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    return randomColor;
  };
  const color = queryParams.color || generateRandomColor();
  const location = {
    latitude: lat,
    longitude: lon,
  };

  const { geocodedLocation, error: geoCodingError } =
    useReverseGeocoding(location);
  const {
    isLoading,
    weatherData,
    error: weatherError,
  } = useWeatherForLocation(location);

  // Add loading state and error state at some point
  if (geoCodingError || weatherError) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  const settings = useContext(SettingsContext);
  const selectedUnit = settings.unit ?? TemperatureUnit.Celsius;
  const timeseries = weatherData?.properties?.timeseries;
  const serie = weatherData?.properties?.timeseries[0];
  const values = getValuesFromSeries(serie);
  const weatherStatus = getCurrentWeatherStatus(values.rain, values.cloudiness);
  const weatherSummary = generateWeatherSummary({
    city: geocodedLocation?.city ?? "",
    currentTemperature: values.currentTemperature,
    wind: values.wind,
    minTemperature: values.minTemperature,
    maxTemperature: values.maxTemperature,
    unit: selectedUnit,
    rain: values.rain,
    cloudiness: values.cloudiness,
  });

  const date = new Date(serie?.time ?? new Date());
  const longDate = toLongDate(date);

  const {
    animatedDateStyle,
    animatedTemperatureStyle,
    animatedTemperatureUnitStyle,
    animatedDailySummaryHeaderStyle,
    animatedDailySummaryStyle,
    animatedInfoPanelStyle,
  } = useWeatherDetailsAnimations();

  return (
    <ScrollView style={[styles.container, { backgroundColor: color }]}>
      <View>
        <View style={styles.centerContainer}>
          <Text style={styles.place}>{geocodedLocation?.city}</Text>
          <View style={styles.date}>
            <Animated.Text style={[{ color: color }, animatedDateStyle]}>
              {longDate}
            </Animated.Text>
          </View>
          <Text style={{ margin: 5 }}>{weatherStatus}</Text>
          <View style={styles.temperatureContainer}>
            <Animated.Text
              style={[styles.temperatureText, animatedTemperatureStyle]}
            >
              {getTemperatureForUnit(values.currentTemperature, selectedUnit)}
            </Animated.Text>
            <Animated.Text
              style={[styles.temperatureUnitText, animatedTemperatureUnitStyle]}
            >
              {selectedUnit}
            </Animated.Text>
          </View>
        </View>
        <View style={styles.dailySummaryContainer}>
          <Animated.Text
            style={[styles.dailySummaryHeader, animatedDailySummaryHeaderStyle]}
          >
            Daily summary
          </Animated.Text>
          <Animated.Text
            style={[styles.dailySummaryText, animatedDailySummaryStyle]}
          >
            {weatherSummary}
          </Animated.Text>
        </View>
        <Animated.View
          style={[styles.weatherInfoPanel, animatedInfoPanelStyle]}
        >
          <WeatherInfoItem
            color={color}
            infoType={WeatherInfoType.Wind}
            value={`${values.wind} m/s`}
            text="Wind"
          />

          <WeatherInfoItem
            color={color}
            infoType={WeatherInfoType.Humidity}
            value={`${values.humidity} %`}
            text="Humidity"
          />

          <WeatherInfoItem
            color={color}
            infoType={WeatherInfoType.Pressure}
            value={`${values.pressure} hPa`}
            text="Pressure"
          />
        </Animated.View>

        <WeeklyForecast unit={selectedUnit} timeseries={timeseries} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    height: "100%",
    width: "100%",
  },
  place: {
    marginTop: 20,
    fontSize: 20,
    minHeight: 20,
    fontWeight: "500",
  },
  dailySummaryContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  dailySummaryHeader: {
    fontSize: 20,
    fontWeight: "700",
  },
  dailySummaryText: {
    textAlign: "left",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "400",
  },
  weatherInfoPanel: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "black",
    minHeight: 100,
    paddingVertical: 20,
    borderRadius: 10,
  },
  date: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    fontSize: 15,
    fontWeight: "300",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  temperatureText: {
    fontSize: 150,
    fontFamily: "SFCompact",
  },
  temperatureUnitText: {
    fontSize: 150,
    marginLeft: -5,
    fontFamily: "SFCompact",
  },
  temperatureContainer: {
    margin: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherDetails;
