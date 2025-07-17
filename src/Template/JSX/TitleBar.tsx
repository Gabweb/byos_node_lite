import { getTime } from "Data/TimeData.js";

export default function TitleBar() {
    return (
        <div className="title_bar">

            <span className="title"></span>
            <span className="instance">Stand: {getTime()}</span>
        </div>
    );
}