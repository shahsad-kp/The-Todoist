import {FC, useMemo} from "react";
import './CalendarTimeRow.scss'

type Props = {
    weekdays: Date[], timeData: {
        time: number, amPm: string
    }
}

export const CalendarTimeRow: FC<Props> = ({weekdays, timeData}) => {
    const isToday = useMemo(() => {
        const current = new Date();
        let time = timeData.time;

        if (timeData.time === 12) {
            time = 0;
        }

        if (timeData.amPm.toLowerCase() === 'pm') {
            time += 12;
        }

        return time === current.getHours();
    }, [timeData]);
    return (<tr>
        <td className={isToday ? 'today' : ''}>{`${timeData.time} ${timeData.amPm}`}</td>
        {weekdays.map(_ => {
            return <td className={isToday ? 'today' : ''}>
                <hr/>
            </td>;
        })}
    </tr>);
};