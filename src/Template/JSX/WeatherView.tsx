import { LOCAL, TIMEZONE } from "Config.js";
import ForecastView from "./ForecastView.js";
import { TemplateDataType } from "Data/PrepareData.js";

export default function Weather({ data }: { data: TemplateDataType }) {
    const date = new Date()
        .toLocaleDateString(LOCAL, { month: "2-digit", day: "2-digit", timeZone: TIMEZONE })
    return (
        <>
            <div className="grid grid--cols-3 pb--4 border--h-7">
                <div className="col col--bottom pt--2">
                    <div className="value value--small text--gray-4">{date}</div>
                    <div className="value text--gray-2">{data.weather.attributes.station_name}</div>
                    <div className="value value--large value--tnums">{data.outdoorTemperature}°C</div>
                </div>
                <div className="col col--top col--span-2">
                    <ForecastView
                        forecasts={data.forecastsDaily}
                        hourly={false}
                        maxItems={5} />
                </div>
            </div><div className="pb--7 border--h-7">
                <ForecastView
                    forecasts={data.forecastsHourly}
                    hourly={true}
                    maxItems={7} />
            </div>
        </>
    );
}