import './CalendarBody.scss';
import {CalendarDateRow} from "../CalenderDateRow/CalendarDateRow.tsx";
import {FC} from "react";

type Props = {
    weekdays: Date[]
}

export const CalendarBody: FC<Props> = ({weekdays}) => {
    return (
        <table
            className={'calendar-body'}
        >
            <CalendarDateRow weekdays={weekdays}/>
        </table>
    );
};