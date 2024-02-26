import { YrResponse } from "@/lib/yr/types";
import { useEffect, useState } from "react";
import { Coordinates } from "../types/globals";

export type WeatherError = {
  message: string;
};
export const useWeatherForLocation = (location: Coordinates) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<YrResponse | null>(null);
  const [error, setError] = useState<WeatherError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${location.latitude}&lon=${location.longitude}`;
        const result = await fetch(url);
        const data = await result.json();
        setWeatherData(data);
      } catch (error) {
        setError({ message: "Error fetching weather data" });
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data immediately on component mount
    fetchData();

    // Then fetch data every minute
    const intervalId = setInterval(fetchData, 60000); // 60000 ms = 1 minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [location.latitude, location.longitude]);

  return { isLoading, weatherData, error };
};
