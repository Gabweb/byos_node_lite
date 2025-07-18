export interface State<T> {
    entity_id: string;
    state: string;
    attributes: T;
    last_changed: string;
    last_reported: string;
    last_updated: string;
}

export type SensoreState = State<{
    state_class: string;
    unit_of_measurement: string;
    device_class: string;
    friendly_name: string;
}>

export interface Forecasts {
    [key: string]: {
        forecast: Forecast[];
    }
}

export interface Forecast {
    datetime: string;
    cloud_coverage: number;
    condition: string;
    precipitation_probability: number;
    pressure: number;
    uv_index: number | null;
    wind_gust_speed: number;
    wind_bearing: number;
    evaporation: number | null;
    fog_probability: number;
    sun_irradiance: number;
    visibility: number;
    sun_duration: number;
    precipitation_duration: number;
    humidity_absolute: number;
    temperature: number;
    dew_point: number;
    wind_speed: number;
    precipitation: number;
    humidity: number;
}

export type Weather = State<{
    temperature: number;
    temperature_unit: string;
    humidity: number;
    uv_index: number;
    pressure: number;
    pressure_unit: string;
    wind_bearing: number;
    wind_speed: number;
    wind_speed_unit: string;
    visibility: number;
    visibility_unit: string;
    precipitation_unit: string;
    latest_update_utc: string;
    report_time_utc: string;
    forecast_time_utc: string;
    station_id: string;
    station_name: string;
    attribution: string;
    friendly_name: string;
    supported_features: number;
}>

export interface CalendarEntry {
    start: { date: string };
    end: { date: string };
    summary: string;
    uid: string;
}

