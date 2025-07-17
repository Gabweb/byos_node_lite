import { TemplateDataType } from "Data/PrepareData.js";
import TitleBar from "./TitleBar.js";
import Weather from "./WeatherView.js";

export default function App(data: TemplateDataType) {
    return <div style={{
        fontSize: 22,
        display: 'flex',
        backgroundColor: '#fff',
        width: '800px',
        height: '480px',
    }}>
        <div className="screen">
            <div className="view view--full">
                <div className="layout layout--col layout--left layout--stretch-x layout--top gap--large">
                    <Weather data={data} />
                    <div className="grid gap--large">
                        <div className="row">
                            <div className="item">Hi</div>
                        </div>
                    </div>
                </div>

                <TitleBar />
            </div>
        </div>
    </div>
}
