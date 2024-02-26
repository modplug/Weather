// get the type of the enum value from the enum key
export const getEnumValue = <T>(
  key: string,
  enumType: T
): T[keyof T] | undefined => {
  return enumType[key as keyof T];
};

// const generic enum util to get key for enum value
// constrain enum value to be of a valid type of TKey and enumType to be of a valid type of TValue
// get the key for the enum value

// export const getEnumKey = <TKey, TValue>(enumValue: TValue, enumType: TKey): string | undefined => {
//   return Object.keys(enumType).find((k) => enumType[k] === enumValue);
// };

// create a generic enum util to get key for enum value
// constrain enum value to be of a valid type of TKey and enumType to be of a valid type of TValue
export const getEnumKey = <TKey, TValue>(
  enumValue: TValue,
  enumType: TKey extends object ? TKey : never
): string | undefined => {
  return Object.keys(enumType).find(
    (k) => enumType[k as keyof TKey] === enumValue
  );
};

enum test {
  "d",
  "f",
  "h",
}
