import { Series } from "../lib/yr/types";
import { roundToWholeNumber } from "./numberUtils";

export const getCurrentWeatherStatus = (rain: number, cloudiness: number) => {
  let rainValue = "";
  if (rain > 0 && rain < 4) rainValue = "light rain";
  else if (rain < 10) rainValue = "rain";
  else if (rain < 25) rainValue = "heavy rain";
  else if (rain < 50) rainValue = "very heavy rain";
  else if (rain < 100) rainValue = "extremely heavy rain";

  let cloudinessValue = "";
  if (cloudiness === 0) cloudinessValue = "Sunny";
  else if (cloudiness < 50) cloudinessValue = "Partly cloudy";
  else cloudinessValue = "Cloudy";

  if (rainValue === "") return cloudinessValue;
  return cloudinessValue + " with " + rainValue;
};

export enum TemperatureUnit {
  Celsius = "°",
  Fahrenheit = "°F",
  Kelvin = "K",
}

export type WeatherSummaryProps = {
  city: string;
  currentTemperature: number;
  wind: number;
  minTemperature: number;
  maxTemperature: number;
  unit: TemperatureUnit;
  rain: number;
  cloudiness: number;
};

export const generateWeatherSummary = ({
  city,
  currentTemperature,
  wind,
  minTemperature,
  maxTemperature,
  unit,
  rain,
  cloudiness,
}: WeatherSummaryProps) => {
  const status = getCurrentWeatherStatus(rain, cloudiness).toLowerCase();
  const temp = getTemperatureForUnit(currentTemperature, unit);
  const minTemp = getTemperatureForUnit(minTemperature, unit);
  const maxTemp = getTemperatureForUnit(maxTemperature, unit);
  return `The current weather in ${city} is ${status}. The temperature is ${temp}${unit} with a wind speed of ${wind} m/s. Over the next 6 hours, the temperature will range from a minimum of ${minTemp}${unit} to a maximum of ${maxTemp}${unit}.`;
};

export const getTemperatureForUnit = (
  temperature: number,
  units: TemperatureUnit
) => {
  return roundToWholeNumber(
    units === TemperatureUnit.Celsius
      ? temperature
      : units === TemperatureUnit.Fahrenheit
      ? (temperature * 9) / 5 + 32
      : temperature + 273.15
  );
};

export type SerieValues = {
  currentTemperature: number;
  wind: number;
  humidity: number;
  pressure: number;
  cloudiness: number;
  rain: number;
  minTemperature: number;
  maxTemperature: number;
};

export const getValuesFromSeries = (
  series: Series | undefined
): SerieValues => {
  const instant = series?.data.instant;
  const next_1_hours = series?.data.next_1_hours;
  const next_6_hours = series?.data.next_6_hours;

  const currentTemperature = roundToWholeNumber(
    instant?.details.air_temperature ?? 0
  );

  const wind = instant?.details.wind_speed ?? 0;
  const humidity = instant?.details.relative_humidity ?? 0;
  const pressure = instant?.details.air_pressure_at_sea_level ?? 0;
  const cloudiness = instant?.details.cloud_area_fraction ?? 0;
  const rain = next_1_hours?.details.precipitation_amount ?? 0;
  const minTemperature = next_6_hours?.details.air_temperature_min ?? 0;
  const maxTemperature = next_6_hours?.details.air_temperature_max ?? 0;

  return {
    currentTemperature,
    wind,
    humidity,
    pressure,
    cloudiness,
    rain,
    minTemperature,
    maxTemperature,
  };
};
