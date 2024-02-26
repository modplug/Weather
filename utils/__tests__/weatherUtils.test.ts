import { getTemperatureForUnit, TemperatureUnit } from "../weatherUtils";

describe("getTemperatureForUnit", () => {
  it("converts temperature to Celsius correctly", () => {
    const temperature = 20;
    const unit = TemperatureUnit.Celsius;
    expect(getTemperatureForUnit(temperature, unit)).toBe(20);
  });

  it("converts temperature to Fahrenheit correctly", () => {
    const temperature = 20;
    const unit = TemperatureUnit.Fahrenheit;
    expect(getTemperatureForUnit(temperature, unit)).toBe(68);
  });

  it("converts temperature to Kelvin correctly", () => {
    const temperature = 20;
    const unit = TemperatureUnit.Kelvin;
    expect(getTemperatureForUnit(temperature, unit)).toBe(293);
  });
});
