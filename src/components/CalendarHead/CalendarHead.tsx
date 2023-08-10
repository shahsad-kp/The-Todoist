import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import {FC, useCallback, useMemo} from "react";
import {WeekDetailsType} from "../../types/WeekDetails.ts";

type Props = {
    weekDetails: WeekDetailsType,
    setWeekDetails: (data: WeekDetailsType | ((prevState: WeekDetailsType) => WeekDetailsType)) => void,
    getDateDetails: (date: Date) => WeekDetailsType
}

export const CalendarHead: FC<Props> = ({setWeekDetails, weekDetails, getDateDetails}) => {
    const getFirstDateOfWeekRow = useCallback((year: number, weekRow: number) => {
        const startOfYear = new Date(year, 0, 1);
        const daysToAdd = (weekRow - 1) * 7 - startOfYear.getDay() + 1;
        const firstDateOfWeekRow = new Date(startOfYear);
        firstDateOfWeekRow.setDate(startOfYear.getDate() + daysToAdd);
        return firstDateOfWeekRow;
    }, []);

    const month = useMemo(() => {
        if (weekDetails === null){
            return '';
        }
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[weekDetails.month]
    }, [weekDetails]);

    return (<div
        className={'head'}
    >
        <div className={'details'}>
            <div>
                <h2>{month} {weekDetails && weekDetails.year}</h2>
                <h2>/</h2>
                <h2>W{weekDetails && weekDetails.weekRow}</h2>
            </div>
            <div>
                <BsArrowLeft
                    onClick={() => setWeekDetails(prevState => getDateDetails(
                        getFirstDateOfWeekRow(prevState.year,prevState.weekRow - 1)
                    ))}
                />
                <BsArrowRight
                    onClick={() => setWeekDetails(prevState => getDateDetails(
                        getFirstDateOfWeekRow(prevState.year,prevState.weekRow + 1)
                    ))}
                />
            </div>
        </div>
        <div>
            <div>
                <button
                    onClick={() => setWeekDetails(getDateDetails(new Date()))}
                >
                    Today
                </button>
            </div>
        </div>
    </div>);
};