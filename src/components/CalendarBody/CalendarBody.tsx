import './CalendarBody.scss';
import {CalendarDateRow} from "../CalenderDateRow/CalendarDateRow.tsx";
import {FC, useMemo} from "react";
import {CalendarTimeRow} from "../CalendarTimeRow/CalendarTimeRow.tsx";

type Props = {
    weekdays: Date[]
}

export const CalendarBody: FC<Props> = ({weekdays}) => {
    const times = useMemo(() => {
        const timeOptions = []
        for (let i = 0; i < 24; i++) {
            const time = i % 12 ? i % 12 : 12;
            const amPm = parseInt(String(i / 12)) ? 'PM' : 'AM'
            timeOptions.push({time, amPm})
        }
        return timeOptions;
    }, []);

    return (<table
        className={'calendar-body'}
    >
        <CalendarDateRow weekdays={weekdays}/>
        {
            times.map(time => <CalendarTimeRow weekdays={weekdays}  timeData={time}/>)
        }
    </table>);
};