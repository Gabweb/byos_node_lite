import { LOCAL, TIMEZONE } from "Config.js";

export function getLocalTime(inputDate: string): string {
    return new Date(inputDate)
        .toLocaleTimeString(LOCAL, { hour: "2-digit", minute: "2-digit", timeZone: TIMEZONE });
}

const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

export function isTomorrow(date: Date): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(date, tomorrow);
}

export function getLocalDate(inputDate: string): string {
    const input = new Date(inputDate);

    if (isSameDay(new Date(), input)) {
        return "Heute";
    }
    if (isTomorrow(input)) {
        return "Morgen";
    }
    return input.toLocaleDateString(LOCAL, { weekday: "long", timeZone: TIMEZONE });
}