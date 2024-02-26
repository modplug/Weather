import { Series } from "@/lib/yr/types";
import { toShortDate } from "@/utils/dateUtils";
import { TemperatureUnit, getTemperatureForUnit } from "@/utils/weatherUtils";
import { Image, StyleSheet, Text, View } from "react-native";

export type WeeklyForecastItemProps = {
  serie: Series;
  index: number;
  unit: TemperatureUnit;
};

export const WeeklyForecastItem = ({
  serie,
  index,
  unit,
}: WeeklyForecastItemProps) => {
  const date = new Date(serie.time);
  const formattedDate = toShortDate(date);
  const imageUrl = `https://raw.githubusercontent.com/metno/weathericons/main/weather/png/${serie.data.next_12_hours?.summary.symbol_code}.png`;

  const key = serie.time ?? Math.random().toString();
  const temperature = getTemperatureForUnit(
    serie.data.instant.details.air_temperature,
    unit
  );

  return (
    <View style={{ paddingVertical: 5 }}>
      <View style={[styles.weeklyForecastItem]} key={key}>
        <Text>
          {temperature}
          {unit}
        </Text>
        <Image
          tintColor={"#000"}
          style={styles.weatherIcon}
          source={{
            uri: imageUrl,
          }}
        />

        <Text>{formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyForecastItem: {
    minWidth: 75,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});
