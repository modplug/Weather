import { Coordinates } from "../types/globals";

export const DEFAULT_LOCATIONS: Coordinates[] = [
  {
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    latitude: 35.6895,
    longitude: 139.6917,
  },
  {
    latitude: -33.8688,
    longitude: 151.2093,
  },
] as const;

export const COLORS = [
  "#42C6FF",
  "#FF4242",
  "#FF42FF",
  "#FF9142",
  "#FFD842",
  "#42FFC5",
] as const;
