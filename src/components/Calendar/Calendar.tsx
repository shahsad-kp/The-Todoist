import './Calendar.scss'
import {CalendarHead} from "../CalendarHead/CalendarHead.tsx";
import {useCallback, useMemo, useState} from "react";
import {WeekDetailsType} from "../../types/WeekDetails.ts";
import {CalendarBody} from "../CalendarBody/CalendarBody.tsx";

export const Calendar = () => {
    const getDateDetails = useCallback((date: Date) => {
        const year = date.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const daysPassed = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.floor(daysPassed / 7) + 1;
        const weeksPerRow = 1; // Since each row represents one week

        const weekRow = Math.ceil(weekNumber / weeksPerRow);

        return {
            year, month: date.getMonth(), weekRow,
        };
    }, []);
    const [weekDetails, setWeekDetails] = useState<WeekDetailsType>(getDateDetails(new Date()));

    const getWeeksDays = useCallback((year: number, weekRow: number) => {
        const startDate = new Date(year, 0, 1);
        const daysToAdd = (weekRow - 1) * 7 - startDate.getDay() + 1;
        startDate.setDate(startDate.getDate() + daysToAdd);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    }, []);

    const weekDays = useMemo(() => {
        return getWeeksDays(weekDetails.year, weekDetails.weekRow)
    }, [getWeeksDays, weekDetails]);

    return (
        <div className={'calendar-background'}>
            <div className={'calendar'}>
                <CalendarHead
                    setWeekDetails={setWeekDetails}
                    weekDetails={weekDetails}
                    getDateDetails={getDateDetails}
                />
                <CalendarBody weekdays={weekDays}/>
            </div>
        </div>
    );
};