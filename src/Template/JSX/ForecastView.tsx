import { Forecast } from "Data/HomeassistantModels.js";
import IconText from "./Widgets/IconText.js";
import { getLocalDate, getLocalTime } from "Template/Util/DateUtil.js";


function getConditionIconClass(condition: string) {
    switch (condition) {
        case "clear-night": return "wi wi-night-clear";
        case "cloudy": return "wi wi-cloudy";
        case "exceptional": return "wi wi-na";
        case "fog": return "wi wi-fog";
        case "hail": return "wi wi-hail";
        case "lightning": return "wi wi-lightning";
        case "lightning-rainy": return "wi wi-storm-showers";
        case "partlycloudy": return "wi wi-day-cloudy";
        case "pouring": return "wi wi-rain-wind";
        case "rainy": return "wi wi-rain";
        case "snowy": return "wi wi-snow";
        case "snowy-rainy": return "wi wi-rain-mix";
        case "sunny": return "wi wi-day-sunny";
        case "windy": return "wi wi-strong-wind";
        case "windy-variant": return "wi wi-windy";
        default:
            console.error(`Unknown weather condition: ${condition}`);
            return "wi wi-na";
    }
}

function getWeatherDetail(forecast: Forecast): [string, string] {
    let icon = "wi-day-sunny";
    let text = Math.floor(forecast.sun_duration * 10 / 60 / 60) / 10 + " Std.";
    if (forecast.wind_speed > 15) {
        icon = "wi-strong-wind";
        text = `${forecast.wind_speed} km/h`;
    }
    if ((forecast.uv_index ?? 0) > 5) {
        icon = "wi-alert";
        text = `UV ${forecast.uv_index}`;
    }
    if ((forecast.precipitation ?? 0) > 0) {
        icon = "wi-umbrella";
        text = forecast.precipitation + "mm";
    }
    return [icon, text]
}

function getTitle(forecast: Forecast, hourly: boolean): string {
    if (hourly) {
        return getLocalTime(forecast.datetime)
    } else {
        return getLocalDate(forecast.datetime)
    }
}

export default function ForecastView({ forecasts, hourly, maxItems }: { forecasts: Forecast[], hourly: boolean, maxItems: number } = { maxItems: 8, forecasts: [], title: [] }) {
    const dialyView = (forecast: Forecast) => (
        <>
            <IconText icon="wi-umbrella" text={forecast.precipitation + "mm"} />
            <IconText icon="wi-day-sunny" text={Math.floor(forecast.sun_duration * 10 / 60 / 60) / 10 + " Std."} />
        </>
    )

    const hourlyView = (forecast: Forecast) => (
        <IconText icon={getWeatherDetail(forecast)[0]} text={getWeatherDetail(forecast)[1]} />
    );

    const detailView = hourly ? hourlyView : dialyView;

    return (
        <div className="grid gap--large">
            <div className="row">
                {forecasts.slice(0, maxItems).map((forecast, idx) => (
                    <div className="item" key={idx}>
                        <div className="content">
                            <div className="mb--3">
                                <span className="value">
                                    <i className={getConditionIconClass(forecast.condition) + " wi mr--1"}></i>
                                </span>
                            </div>
                            <span className="title title--small mb--2">{getTitle(forecast, hourly)}</span>
                            <div className="flex flex--col flex--left gap--xsmall">
                                <IconText icon="wi-thermometer-exterior" text={Math.round(forecast.temperature) + "°C"} />
                                {detailView(forecast)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}