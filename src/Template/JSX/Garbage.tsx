import { getLocalDate, isTomorrow } from "Template/Util/DateUtil.js";
import { LOCAL, TIMEZONE } from "Config.js";
import { GarbageDates } from "Data/GarbageDates.js";

function toName(type: 'compost' | 'rest' | 'paper'): string {
    switch (type) {
        case 'compost': return "Biomüll";
        case 'rest': return "Restmüll";
        case 'paper': return "Papiermüll";
        default: return type;
    }
}

function textColor(date: Date): string {
    return isTomorrow(date) ? '' : 'text--gray-4';
}

export default function GarbageView({ garbage }: { garbage: GarbageDates }) {
    const dates = Object.keys(garbage)
        .filter(key => garbage[key] !== undefined)
        .map(key => ({ type: key, date: garbage[key]! } as { type: 'compost' | 'rest' | 'paper', date: Date }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date ascending

    return (
        <>
            {dates.map((item) => (
                <div className="item">
                    <div className="meta"></div>
                    <div className="content">
                        <span className={"title title--small " + textColor(item.date)} > <i className="fa fa-trash"></i> {toName(item.type)}</span >
                        <span className="description">
                            {getLocalDate(item.date.toISOString())}
                            ,&nbsp;
                            {item.date.toLocaleDateString(LOCAL, { month: "2-digit", day: "2-digit", timeZone: TIMEZONE })}
                        </span>
                    </div>
                </div>
            )
            )}

        </>
    )
}
