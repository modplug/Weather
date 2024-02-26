// useReverseGeocoding.test.ts

import { cleanup, renderHook } from "@testing-library/react-hooks";
import * as ExpoLocation from "expo-location";
import { useReverseGeocoding } from "../useReverseGeocoding";

jest.mock("expo-location");

describe("useReverseGeocoding", () => {
  // cleanup
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("returns the geocoded location", async () => {
    const mockLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const mockGeocodedLocation = {
      city: "Oslo",
      street: "Askegata",
      region: "Oslo",
      country: "Norge",
      postalCode: "0461",
    };

    (ExpoLocation.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      mockGeocodedLocation,
    ]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useReverseGeocoding(mockLocation)
    );

    await waitForNextUpdate();

    expect(result.current.geocodedLocation).toEqual(mockGeocodedLocation);
    expect(result.current.error).toBeNull();
  });

  it("handles errors", async () => {
    const mockLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    (ExpoLocation.reverseGeocodeAsync as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch location")
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useReverseGeocoding(mockLocation)
    );

    await waitForNextUpdate();

    expect(result.current.geocodedLocation).toBeNull();
    expect(result.current.error).toEqual("Failed to fetch location");
  });

  it("runs again when latitude or longitude is changed", async () => {
    const initialLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const newLocation = {
      latitude: 34.0522,
      longitude: -118.2437,
    };

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ location }) => useReverseGeocoding(location),
      { initialProps: { location: initialLocation } }
    );

    const mockGeocodedLocation = {
      city: "San Francisco",
      street: "Market Street",
      region: "California",
      country: "United States",
      postalCode: "94103",
    };

    (ExpoLocation.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      mockGeocodedLocation,
    ]);

    await waitForNextUpdate();

    (ExpoLocation.reverseGeocodeAsync as jest.Mock).mockClear();

    rerender({ location: newLocation });

    await waitForNextUpdate();

    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledTimes(1);
    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledWith(newLocation);
  });

  it("only runs once for each update", async () => {
    const location = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const { waitForNextUpdate } = renderHook(() =>
      useReverseGeocoding(location)
    );

    await waitForNextUpdate();

    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledTimes(1);
    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledWith(location);
  });
});
