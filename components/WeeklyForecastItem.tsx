import { Series } from "@/lib/yr/types";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SettingsContext } from "../contexts/SettingsContext";
import { toShortDate } from "../utils/dateUtils";
import { TemperatureUnit, getTemperatureForUnit } from "../utils/weatherUtils";

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
  const translationYAnimation = useSharedValue(100);
  const opacityAnimation = useSharedValue(0);
  const settings = useContext(SettingsContext);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationYAnimation.value }],
      opacity: opacityAnimation.value,
    };
  });

  const resetSharedValues = () => {
    translationYAnimation.value = 100;
    opacityAnimation.value = 0;
  };

  const initialDelay = 1000;

  useEffect(() => {
    const delay = index * 100 + initialDelay;
    resetSharedValues();

    translationYAnimation.value = withDelay(
      delay,
      withSpring(0, {
        mass: 1,
        damping: 20,
        stiffness: 200,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      })
    );
    opacityAnimation.value = withDelay(delay, withTiming(1, { duration: 200 }));
  }, [settings.unit]);

  const key = serie.time ?? Math.random().toString();
  const temperature = getTemperatureForUnit(
    serie.data.instant.details.air_temperature,
    unit
  );

  return (
    <View style={{ paddingVertical: 5 }}>
      <Animated.View
        style={[styles.weeklyForecastItem, animatedStyle]}
        key={key}
      >
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
      </Animated.View>
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
