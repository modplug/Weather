import { cleanup, renderHook, waitFor } from "@testing-library/react-native";
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

    const { result } = renderHook(() => useReverseGeocoding(mockLocation));

    const initialValue = result.current;
    await waitFor(() => {
      expect(result.current).not.toBe(initialValue);
    });

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

    const { result } = renderHook(() => useReverseGeocoding(mockLocation));

    await waitFor(() => {
      expect(result.current.geocodedLocation).toBeNull();
      expect(result.current.error).toEqual("Failed to fetch location");
    });
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

    const { result, rerender } = renderHook(
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

    const initialValue = result.current;
    await waitFor(() => {
      expect(result.current).not.toBe(initialValue);
    });

    (ExpoLocation.reverseGeocodeAsync as jest.Mock).mockClear();

    rerender({ location: newLocation });

    await waitFor(() => {
      expect(result.current).not.toBe(initialValue);
    });

    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledTimes(1);
    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledWith(newLocation);
  });

  it("only runs once for each update", async () => {
    const location = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    const { result } = renderHook(() => useReverseGeocoding(location));

    await waitFor(() => {
      expect(result.current).not.toBe(location);
    });

    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledTimes(1);
    expect(ExpoLocation.reverseGeocodeAsync).toHaveBeenCalledWith(location);
  });
});
