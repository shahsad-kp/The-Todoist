import './NewTodo.scss';
import {FC, FormEvent, useCallback, useEffect, useState} from "react";
import {FaXmark} from "react-icons/fa6";
import {Todo} from "../../types/Todo.ts";
import {useDispatch} from "react-redux";
import {addTodo} from "../../redux/todoSlice/todoSlice.ts";
import {v4 as uuidV4} from 'uuid';

type Props = {
    closeFunction: () => void;
}

export const NewTodo: FC<Props> = ({closeFunction}) => {
    const [todoTitle, setTodoTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!event.target.closest('.new-todo')) {
                closeFunction();
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);
        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeFunction]);
    const dispatcher = useDispatch();

    const isValidDateFormat = useCallback((dateString: string) => {
        const datePattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!datePattern.test(dateString)) {
            return false; // Doesn't match the expected format
        }

        const [day, month, year] = dateString.split('/').map(Number);
        const parsedDate = new Date(year, month - 1, day);

        return (parsedDate.getDate() === day && parsedDate.getMonth() === month - 1 && parsedDate.getFullYear() === year);
    }, []);
    const isValidTimeFormat = useCallback((timeString: string) => {
        const timePattern = /^(?:[01]\d|2[0-4]):[0-5]\d$/;
        return timePattern.test(timeString);
    }, []);
    const convertStringsToDate = useCallback((dateString: string, timeString: string) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const [hours, minutes] = timeString.split(':').map(Number);

        // Note: Month in JavaScript's Date is 0-indexed (0-January to 11-December)
        const jsMonth = month - 1;

        return new Date(year, jsMonth, day, hours, minutes);
    }, []);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!todoTitle) {
            setError('Title is required');
            return;
        } else if (!isValidDateFormat(startDate)) {
            setError('Invalid start date format');
            return;
        } else if (!isValidDateFormat(endDate)) {
            setError('Invalid end date format');
            return;
        }

        const startDateObject = convertStringsToDate(startDate, startTime);
        const endDateObject = convertStringsToDate(endDate, endTime);
        const current = new Date();

        if (startDateObject.getTime() > endDateObject.getTime()) {
            setError('Start date must be before end date');
            return;
        } else if (startDateObject.getTime() === endDateObject.getTime()) {
            setError('Start date must be before end date');
            return;
        } else if (startDateObject.getTime() < current.getTime()) {
            setError('Start date must be in the future');
            return;
        }

        const todo: Todo = {
            id: uuidV4(),
            title: todoTitle,
            startDate: startDateObject.toISOString(),
            endDate: endDateObject.toISOString(),
            completed: false,
        }
        console.log(todo)
        dispatcher(addTodo(todo));
        closeFunction();
    }, [todoTitle, isValidDateFormat, startDate, endDate, convertStringsToDate, startTime, endTime, dispatcher, closeFunction]);

    const updateTime = useCallback((value: string, type: string) => {
        if (type === 'start') {
            setStartTime(value);
        } else {
            setEndTime(value);
        }
        if (!isValidTimeFormat(value)) {
            setError('Invalid time format');
            return;
        } else {
            setError('');
        }
    }, [isValidTimeFormat]);
    const updateDate = useCallback((value: string, type: string) => {
        if (type === 'start') {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
        if (!isValidDateFormat(value)) {
            setError('Invalid date format');
            return;
        } else {
            setError('');
        }
    }, [isValidDateFormat]);

    return (<div className={'new-todo-outer'}>
        <div className={'new-todo'}>
            <button
                className={'icon modal-close-button'}
                onClick={closeFunction}
            >
                <FaXmark/>
            </button>
            <h4>New Todo</h4>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder={'Title'}
                    value={todoTitle}
                    onChange={(event) => setTodoTitle(event.target.value)}
                />
                <div className={'last-date-column'}>
                    <label>Start date: </label>
                    <input
                        type="text"
                        placeholder={'DD/MM/YYYY'}
                        value={startDate}
                        onChange={(event) => updateDate(event.target.value, 'start')}
                    />
                    <input
                        type="text"
                        placeholder={'HH:MM'}
                        value={startTime}
                        onChange={(event) => updateTime(event.target.value, 'start')}
                    />
                </div>
                <div className={'last-date-column'}>
                    <label>Last date: </label>
                    <input
                        type="text"
                        placeholder={'DD/MM/YYYY'}
                        value={endDate}
                        onChange={(event) => updateDate(event.target.value, 'end')}
                    />
                    <input
                        type="text"
                        placeholder={'HH:MM'}
                        value={endTime}
                        onChange={(event) => updateTime(event.target.value, 'end')}
                    />
                </div>
                {error && <span className={'error'}>{error}</span>}
                <button type={'submit'}>Add</button>
            </form>
        </div>
    </div>);
};