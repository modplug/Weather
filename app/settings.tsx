import { router } from "expo-router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { SettingsContext } from "../contexts/SettingsContext";
import { getEnumKey } from "../utils/enumUtils";
import { TemperatureUnit } from "../utils/weatherUtils";

export const Settings = () => {
  type TemperatureUnitKey = keyof typeof TemperatureUnit;

  // create a list of radio buttons for each temperature unit
  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      Object.keys(TemperatureUnit).map((key, index) => ({
        id: (index + 1).toString(),
        label: key,
        value: key,
        borderColor: "black",
        borderSize: 2,
        color: "black",
      })),
    []
  );

  const settings = useContext(SettingsContext);

  const idForUnit = useCallback((unit: TemperatureUnit) => {
    switch (unit) {
      case TemperatureUnit.Celsius:
        return "1";
      case TemperatureUnit.Fahrenheit:
        return "2";
      case TemperatureUnit.Kelvin:
        return "3";
    }
  }, []);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  // Update the radio buttons to match the currently selected unit
  useEffect(() => {
    const unit = settings.unit;
    if (!unit) {
      return;
    }

    setSelectedId(idForUnit(unit));
  }, [settings.unit]);

  useEffect(() => {
    const selectedRadioButton = radioButtons.find((rb) => rb.id === selectedId);
    if (!selectedRadioButton) return;

    const selectedUnitKey = selectedRadioButton.value as TemperatureUnitKey;
    const settingsUnitKey = getEnumKey(settings.unit, TemperatureUnit);
    if (!selectedUnitKey || selectedUnitKey === settingsUnitKey) return;

    settings.setUnit(TemperatureUnit[selectedUnitKey]);
    router.back();
  }, [selectedId]);

  return (
    <View>
      <Text style={styles.header}>Settings</Text>

      <Text style={styles.subHeader}>Temperature unit</Text>
      <RadioGroup
        containerStyle={styles.radioGroupContainerStyle}
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "black",
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 20,
    fontWeight: "500",
  },

  subHeader: {
    color: "black",
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 20,
    fontWeight: "500",
  },
  radioGroupContainerStyle: {
    marginTop: 10,
    alignItems: "flex-start",
    gap: 10,
  },
});

export default Settings;
