import { Series } from "@/lib/yr/types";
import { TemperatureUnit } from "@/utils/weatherUtils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { WeeklyForecastItem } from "./WeeklyForecastItem";

export type WeeklyForecastProps = {
  timeseries: Series[] | undefined;
  unit: TemperatureUnit;
};
export const WeeklyForecast = ({ timeseries, unit }: WeeklyForecastProps) => {
  if (!timeseries || timeseries.length === 0) {
    return null;
  }

  const everyDayAtNoon = timeseries.filter((series) => {
    const date = new Date(series.time);
    // seems like YR API returns the forecast for 13:00 every day
    return date.getHours() === 13;
  });

  return (
    <View style={styles.weeklyForecastContainer}>
      <Text style={[{ fontWeight: "700" }]}>Weekly forecast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weeklyForecastItemsContainer}
      >
        {everyDayAtNoon &&
          everyDayAtNoon.map((item, index) => {
            return (
              <WeeklyForecastItem
                unit={unit}
                key={index}
                serie={item}
                index={index}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyForecastContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    paddingVertical: 10,
  },
  weeklyForecastItemsContainer: {
    marginTop: 10,
    gap: 10,
  },
});
