import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";
import { Coordinates } from "../types/globals";

export const useReverseGeocoding = (location: Coordinates) => {
  const [geocodedLocation, setGeocodedLocation] =
    useState<ExpoLocation.LocationGeocodedAddress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geoCodeLocation = async () => {
      try {
        const geocodedLocation = await ExpoLocation.reverseGeocodeAsync({
          latitude: location.latitude,
          longitude: location.longitude,
        });

        setGeocodedLocation(geocodedLocation[0]);
      } catch (error) {
        console.log("Error fetching location: ", error);
        setError("Failed to fetch location");
      }
    };
    geoCodeLocation();
  }, [location.latitude, location.longitude]);

  return { geocodedLocation, error };
};
