import {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import {Todo} from "../../types/Todo.ts";
import './CalendarTodo.scss';

type Props = {
    date: Date, hour: number, amPm: string
}

type ActiveTodo = {
    title: string, startDate: Date, endDate: Date, status: 'start' | 'end' | 'active'
}

export const CalendarTodo: FC<Props> = ({date, amPm, hour}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todos: Todo[] = useSelector(state => state?.todos.todoList);

    if (hour === 12) {
        hour = 0;
    }
    if (amPm.toLowerCase() === 'pm') {
        hour += 12;
    }
    date.setHours(hour)

    const activeTodos: ActiveTodo[] = useMemo(() => {
        if (date.getHours() === 3 && date.getDate() === 4) {
            return [{
                title: 'test', startDate: date, endDate: new Date(date.getTime() + 60 * 60 * 1000), status: 'start'
            }]
        } else if (date.getHours() === 6  && date.getDate() === 4) {
            return [{
                title: 'test', startDate: date, endDate: new Date(date.getTime() + 60 * 60 * 1000), status: 'end'
            }]
        } else if ((date.getHours() > 3 && date.getHours() < 6)  && date.getDate() === 4) {
            return [{
                title: 'test', startDate: date, endDate: new Date(date.getTime() + 60 * 60 * 1000), status: 'active'
            }   ]
        }
        return [];
    }, [date]);

    return (<div
        className={'calendar-todo-showing'}
    >
        <div>
            {activeTodos.map(todo => <div className={todo.status}>
                <div>{todo.status === 'start' && todo.title}</div>
            </div>)}
        </div>
    </div>);
};