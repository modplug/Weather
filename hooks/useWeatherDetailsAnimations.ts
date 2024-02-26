import { useContext, useEffect } from "react";
import {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SettingsContext } from "../contexts/SettingsContext";

export const useWeatherDetailsAnimations = () => {
  const animatedDateYValue = useSharedValue(100);
  const animatedDateOpacityValue = useSharedValue(0);
  const animatedTemperatureYValue = useSharedValue(20);
  const animatedTemperatureOpacityValue = useSharedValue(0);
  const animatedTemperatureUnitXValue = useSharedValue(-20);
  const animatedTemperatureUnitOpacityValue = useSharedValue(0);
  const animatedDailySummaryHeaderYValue = useSharedValue(20);
  const animatedDailySummaryHeaderOpacityValue = useSharedValue(0);
  const animatedDailySummaryYValue = useSharedValue(20);
  const animatedDailySummaryOpacityValue = useSharedValue(0);
  const animatedInfoPanelYValue = useSharedValue(40);
  const animatedInfoPanelOpacityValue = useSharedValue(0);
  const animatedWeeklyForecastHeaderYValue = useSharedValue(40);
  const animatedWeeklyForecastHeaderOpacityValue = useSharedValue(0);

  const unit = useContext(SettingsContext);

  const animatedDateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedDateYValue.value }],
      opacity: animatedDateOpacityValue.value,
    };
  });

  const animatedTemperatureStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedTemperatureYValue.value }],
      opacity: animatedTemperatureOpacityValue.value,
    };
  });

  const animatedTemperatureUnitStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedTemperatureUnitXValue.value }],
      opacity: animatedTemperatureUnitOpacityValue.value,
    };
  });

  const animatedDailySummaryHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedDailySummaryHeaderYValue.value }],
      opacity: animatedDailySummaryHeaderOpacityValue.value,
    };
  });

  const animatedDailySummaryStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedDailySummaryYValue.value }],
      opacity: animatedDailySummaryOpacityValue.value,
    };
  });

  const animatedInfoPanelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedInfoPanelYValue.value }],
      opacity: animatedInfoPanelOpacityValue.value,
    };
  });

  const animatedWeeklyForecastHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedWeeklyForecastHeaderYValue.value }],
      opacity: animatedWeeklyForecastHeaderOpacityValue.value,
    };
  });

  const resetSharedValues = () => {
    animatedDateYValue.value = 100;
    animatedDateOpacityValue.value = 0;
    animatedTemperatureYValue.value = 20;
    animatedTemperatureOpacityValue.value = 0;
    animatedTemperatureUnitXValue.value = -20;
    animatedTemperatureUnitOpacityValue.value = 0;
    animatedDailySummaryHeaderYValue.value = 20;
    animatedDailySummaryHeaderOpacityValue.value = 0;
    animatedDailySummaryYValue.value = 20;
    animatedDailySummaryOpacityValue.value = 0;
    animatedInfoPanelYValue.value = 40;
    animatedInfoPanelOpacityValue.value = 0;
    animatedWeeklyForecastHeaderYValue.value = 40;
    animatedWeeklyForecastHeaderOpacityValue.value = 0;
  };

  useEffect(() => {
    let delay = 0;
    const duration = 300;

    resetSharedValues();

    animatedDateYValue.value = withTiming(0, {
      duration: duration,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });

    animatedDateOpacityValue.value = withTiming(1, {
      duration: duration,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });

    delay = 200;
    animatedTemperatureYValue.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedTemperatureOpacityValue.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    delay = 400;
    animatedTemperatureUnitXValue.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedTemperatureUnitOpacityValue.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    delay = 600;
    animatedDailySummaryHeaderYValue.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedDailySummaryHeaderOpacityValue.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    delay = 800;
    animatedDailySummaryYValue.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedDailySummaryOpacityValue.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    delay = 800;
    animatedInfoPanelYValue.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedInfoPanelOpacityValue.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedWeeklyForecastHeaderYValue.value = withDelay(
      delay,
      withTiming(0, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );

    animatedWeeklyForecastHeaderOpacityValue.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    );
  }, [unit.unit]);

  return {
    animatedDateStyle,
    animatedTemperatureStyle,
    animatedTemperatureUnitStyle,
    animatedDailySummaryHeaderStyle,
    animatedDailySummaryStyle,
    animatedInfoPanelStyle,
    animatedWeeklyForecastStyle: animatedWeeklyForecastHeaderStyle,
  };
};
