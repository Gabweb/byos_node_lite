import { OUTDOOR_TEMP_ENTITY_ID, TIMEZONE, WEATHER_ENTITY_ID } from "Config.js";
import { callService, getForecasts, getState } from "./HomeassistantClient.js";
import { Forecast, SensoreState, Weather } from "./HomeassistantModels.js";

export type TemplateDataType = {
    time: string
    weather: Weather
    forecastsHourly: Forecast[]
    forecastsDaily: Forecast[]
    outdoorTemperature: string
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

    //console.log((await forecastsDaily$)[0].)

    return {
        time,
        weather: await weather$,
        forecastsHourly: await forecastsHourly$,
        forecastsDaily: await forecastsDaily$,
        outdoorTemperature: (await outdoorTemperature$).state
    }
}
