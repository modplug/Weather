// contexts/__tests__/SettingsProvider.test.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { Button } from "react-native";
import { getEnumKey } from "../../utils/enumUtils";
import { TemperatureUnit } from "../../utils/weatherUtils";
import { SettingsContext } from "../SettingsContext";
import { SettingsProvider } from "../SettingsProvider";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("SettingsProvider", () => {
  // After each test
  afterEach(() => {
    cleanup();
  });

  it("provides the default temperature unit", async () => {
    const enumKeyForCelsius = getEnumKey(
      TemperatureUnit.Celsius,
      TemperatureUnit
    );
    const { findByText } = render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ unit }) => <span>{unit}</span>}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const element = findByText(enumKeyForCelsius ?? "");

    await waitFor(() => {
      expect(element).toBeTruthy();
    });
  });

  it("loads the temperature unit from storage", async () => {
    const enumKeyForFahrenheit = getEnumKey(
      TemperatureUnit.Fahrenheit,
      TemperatureUnit
    );
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(enumKeyForFahrenheit);

    const { findByText } = render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ unit }) => {
            const unitType = getEnumKey(unit, TemperatureUnit);
            return <span>{unitType}</span>;
          }}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const element = findByText(enumKeyForFahrenheit ?? "");

    await waitFor(() => {
      expect(element).toBeTruthy();
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("temperatureUnit");
  });

  it("saves the temperature unit to storage", async () => {
    const { findByText } = render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ setUnit }) => (
            <Button
              title="Set Unit"
              onPress={() => setUnit(TemperatureUnit.Fahrenheit)}
            ></Button>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const element = await findByText("Set Unit");
    await waitFor(() => {
      fireEvent.press(element);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "temperatureUnit",
      "Fahrenheit"
    );
  });
});
