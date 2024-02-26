export interface YrResponse {
  geometry: Geometry;
  properties: Properties;
  type: string;
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  meta: Meta;
  timeseries: Series[];
}

export interface Meta {
  units: Units;
  updated_at: string;
}

export interface Units {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  air_temperature_max: string;
  air_temperature_min: string;
  cloud_area_fraction: string;
  cloud_area_fraction_high: string;
  cloud_area_fraction_low: string;
  cloud_area_fraction_medium: string;
  dew_point_temperature: string;
  fog_area_fraction: string;
  precipitation_amount: string;
  precipitation_amount_max: string;
  precipitation_amount_min: string;
  probability_of_precipitation: string;
  probability_of_thunder: string;
  relative_humidity: string;
  ultraviolet_index_clear_sky_max: string;
  wind_from_direction: string;
  wind_speed: string;
  wind_speed_of_gust: string;
}

export interface Series {
  data: Data;
  time: string;
}

export interface Data {
  instant: Instant;
  next_12_hours: Next12Hours;
  next_1_hours: Next1Hours;
  next_6_hours: Next6Hours;
}

export interface Instant {
  details: InstantDetails;
}

export interface InstantDetails {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  cloud_area_fraction_high: number;
  cloud_area_fraction_low: number;
  cloud_area_fraction_medium: number;
  dew_point_temperature: number;
  fog_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
  wind_speed_of_gust: number;
}

export interface Next12Hours {
  details: Details;
  summary: Summary;
}

export interface Details {
  air_temperature_max: number;
  air_temperature_min: number;
  precipitation_amount: number;
  precipitation_amount_max: number;
  precipitation_amount_min: number;
  probability_of_precipitation: number;
  probability_of_thunder: number;
  ultraviolet_index_clear_sky_max: number;
}

export interface Summary {
  symbol_code: string;
}

export interface Next1Hours {
  details: Details;
  summary: Summary;
}

export interface Next6Hours {
  details: Details;
  summary: Summary;
}
