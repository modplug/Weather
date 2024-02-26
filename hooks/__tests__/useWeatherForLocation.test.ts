// useWeatherForLocation.test.ts

import { renderHook } from "@testing-library/react-hooks";
import { WeatherError, useWeatherForLocation } from "../useWeatherForLocation";

// Mock the global fetch function
global.fetch = jest.fn();

describe("useWeatherForLocation", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("returns the weather data", async () => {
    const mockLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const mockWeatherData = {
      weather: "sunny",
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockWeatherData),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useWeatherForLocation(mockLocation)
    );

    await waitForNextUpdate();

    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("handles errors", async () => {
    const mockLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const mockError: WeatherError = { message: "Error fetching weather data" };

    (fetch as jest.Mock).mockRejectedValue(new Error(mockError.message));

    const { result, waitForNextUpdate } = renderHook(() =>
      useWeatherForLocation(mockLocation)
    );

    await waitForNextUpdate();

    expect(result.current.weatherData).toBeNull();
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it("updates when the location changes", async () => {
    const initialLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const newLocation = {
      latitude: 34.0522,
      longitude: -118.2437,
    };

    const { rerender, waitForNextUpdate } = renderHook(
      ({ location }) => useWeatherForLocation(location),
      { initialProps: { location: initialLocation } }
    );

    await waitForNextUpdate();

    (fetch as jest.Mock).mockClear();

    rerender({ location: newLocation });

    await waitForNextUpdate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${newLocation.latitude}&lon=${newLocation.longitude}`
    );
  });
});
