import { SettingsContext } from "@/contexts/SettingsContext";
import { TemperatureUnit } from "@/utils/weatherUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type SettingsProviderProps = {
  children: React.ReactNode;
};

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(
    TemperatureUnit.Celsius
  );

  const isValidKey = (key: string): key is keyof typeof TemperatureUnit => {
    return key in TemperatureUnit;
  };

  const getEnumForKey = (key: string): TemperatureUnit => {
    return TemperatureUnit[key as keyof typeof TemperatureUnit];
  };

  useEffect(() => {
    (async () => {
      const storedUnit = await AsyncStorage.getItem("temperatureUnit");
      if (storedUnit !== null) {
        if (isValidKey(storedUnit)) {
          const enumValue = getEnumForKey(storedUnit);
          setTemperatureUnit(enumValue);
        }
      }
    })();
  }, []);

  const setUnit = async (unit: TemperatureUnit) => {
    try {
      try {
        console.log("Setting temperature unit to", unit);

        // get the key for the enum value
        const key = Object.keys(TemperatureUnit).find(
          (k) => TemperatureUnit[k as keyof typeof TemperatureUnit] === unit
        );

        if (key === undefined) {
          console.error("Invalid temperature unit", unit);
          return;
        }

        if (isValidKey(key)) {
          await AsyncStorage.setItem("temperatureUnit", key);
          const enumValue = getEnumForKey(key);
          setTemperatureUnit(enumValue);
        } else {
          console.error("Invalid temperature unit", unit);
        }
      } catch (error) {
        console.error("Failed to save the data to the storage", error);
      }
    } catch (e) {
      console.error("Error setting temperature unit", e);
    }
  };

  return (
    <SettingsContext.Provider value={{ unit: temperatureUnit, setUnit }}>
      {children}
    </SettingsContext.Provider>
  );
};
