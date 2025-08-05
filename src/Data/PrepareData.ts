import { GARBAGE_CAL_ENTITY_ID, OUTDOOR_TEMP_ENTITY_ID, TIMEZONE, WEATHER_ENTITY_ID } from "Config.js";
import { callService, getCalendar, getForecasts, getState } from "./HomeassistantClient.js";
import { CalendarEntry, Forecast, SensoreState, Weather } from "./HomeassistantModels.js";
import { GarbageDates, getNextGarbageDates } from "./GarbageDates.js";

export type TemplateDataType = {
    time: string
    weather: Weather
    forecastsHourly: Forecast[]
    forecastsDaily: Forecast[]
    outdoorTemperature: string
    garbage: GarbageDates
}

export async function prepareData(): Promise<TemplateDataType> {
    const time = new Date().toLocaleTimeString(undefined, {
        timeZone: TIMEZONE,
        hour: 'numeric',
    });
    const weather$ = getState<Weather>(WEATHER_ENTITY_ID);
    const outdoorTemperature$ = getState<SensoreState>(OUTDOOR_TEMP_ENTITY_ID);
    const forecastsHourly$ = getForecasts(WEATHER_ENTITY_ID, 'hourly');
    const forecastsDaily$ = getForecasts(WEATHER_ENTITY_ID, 'daily');
    const garbageCal$ = getCalendar(GARBAGE_CAL_ENTITY_ID, new Date(), new Date(new Date().setDate(new Date().getDate() + 30)));

    return {
        time,
        weather: await weather$,
        forecastsHourly: await forecastsHourly$,
        forecastsDaily: await forecastsDaily$,
        outdoorTemperature: (await outdoorTemperature$).state,
        garbage: getNextGarbageDates(await garbageCal$)
    }
}
