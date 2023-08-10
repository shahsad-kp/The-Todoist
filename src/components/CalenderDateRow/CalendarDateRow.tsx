import {FC, useCallback, useMemo} from "react";
import './CalenderDateRow.scss'

type Props = {
    weekdays: Date[]
}

export const CalendarDateRow: FC<Props> = ({weekdays}) => {
    const today = useMemo(()=> new Date(), []);
    const isSameDay = useCallback((date: Date) => {
        return (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate());
    }, [today])
    const findDay = useCallback((date: Date)=>{
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        console.log(date.getDay())
        return days[date.getDay()]
    }, []);

    return (<tr>
            <th></th>
            {weekdays.map(date => {
                return <th className={isSameDay(date) ? 'today' : ''}>
                    <span className={'date'}>{String(date.getDate()).padStart(2, '0')}</span>
                    <span className={'day'}>{findDay(date)}</span>
                    <span>|</span>
                </th>;
            })}
        </tr>);
};