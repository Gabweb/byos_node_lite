import { HOMEASSISTANT_TOKEN, HOMEASSISTANT_URL } from "Config.js";
import ky from "ky";
import { CalendarEntry, Forecast, Forecasts } from "./HomeassistantModels.js";

const api = ky.extend({
    hooks: {
        beforeRequest: [
            request => {
                request.headers.set('Authorization', 'Bearer ' + HOMEASSISTANT_TOKEN);
            }
        ]
    }
});

export function getState<T = unknown>(entityId: string): Promise<T> {
    return api.get(`${HOMEASSISTANT_URL}/api/states/${entityId}`).json()
}

interface CallServiceResponse<T> {
    changed_states: unknown[];
    service_response: T
}

export function callService<T = unknown>(domain: string, service: string, json: unknown): Promise<CallServiceResponse<T>> {
    return api.post(
        `${HOMEASSISTANT_URL}/api/services/${domain}/${service}?return_response`,
        { json }
    ).json()
}

export async function getForecasts(entityId: string, type: 'hourly' | 'daily'): Promise<Forecast[]> {
    const result = await callService<Forecasts>('weather', 'get_forecasts', { entity_id: entityId, type });
    return result.service_response[entityId].forecast;
}

export function getCalendar(entityId: string, start: Date, end: Date): Promise<CalendarEntry[]> {
    return api.get(`${HOMEASSISTANT_URL}/api/calendars/${entityId}?start=${start.toISOString()}&end=${end.toISOString()}`).json()
}