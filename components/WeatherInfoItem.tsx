import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export type WeatherInfoItemProps = {
  color: string;
  infoType: WeatherInfoType;
  value: string;
  text: string;
};

export enum WeatherInfoType {
  Wind = "wind",
  Humidity = "humidity",
  Pressure = "pressure",
}

export const WeatherInfoItem = ({
  color,
  infoType,
  value,
  text,
}: WeatherInfoItemProps) => {
  const icon = () => {
    switch (infoType) {
      case WeatherInfoType.Wind:
        return <FontAwesome5 name="wind" size={24} color={color} />;
      case WeatherInfoType.Humidity:
        return <FontAwesome5 name="tint" size={24} color={color} />;
      case WeatherInfoType.Pressure:
        return <FontAwesome5 name="tachometer-alt" size={24} color={color} />;
    }
  };
  return (
    <View style={styles.container}>
      {icon()}
      <Text style={[styles.value, { color: color }]}>{value}</Text>
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
  value: {
    marginTop: 8,
    fontWeight: "700",
  },
});
