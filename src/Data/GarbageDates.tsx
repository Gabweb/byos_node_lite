import { CalendarEntry } from "./HomeassistantModels.js";

export interface GarbageDates {
    compost: Date | undefined;
    paper: Date | undefined;
    rest: Date | undefined;
}

function getDateFromEntry(entries: CalendarEntry[], needle: string): Date | undefined {
    const date = entries.find(entry => entry.summary.includes(needle))?.start.date
    return date ? new Date(date) : undefined
}

export function getNextGarbageDates(garbageEntries: CalendarEntry[]): GarbageDates {
    return {
        compost: getDateFromEntry(garbageEntries, 'Bioabfall'),
        paper: getDateFromEntry(garbageEntries, 'Papier'),
        rest: getDateFromEntry(garbageEntries, 'Restmüll')
    }
}