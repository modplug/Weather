import { TemperatureUnit } from "@/utils/weatherUtils";
import { createContext } from "react";

export interface SettingsContextProps {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
  unit: TemperatureUnit.Celsius,
  setUnit: () => {},
});
