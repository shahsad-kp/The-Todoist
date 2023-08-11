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
    date.setHours(hour, 0, 0, 0);

    const activeTodos: ActiveTodo[] = useMemo(() => {
        const filteredTodos = todos.filter(todo => {
            const startDate = new Date(todo.startDate);
            startDate.setMinutes(0, 0, 0)
            const endDate = new Date(todo.endDate);
            endDate.setMinutes(0, 0, 0)
            return startDate <= date && endDate >= date;
        }, []);
        return filteredTodos.map(todo => {
            const startDate = new Date(todo.startDate);
            startDate.setMinutes(0, 0, 0)
            const endDate = new Date(todo.endDate);
            endDate.setMinutes(0, 0, 0)
            if ((startDate.getHours() === date.getHours() && startDate.getDate() === date.getDate())) {
                return {title: todo.title, startDate, endDate, status: 'start'};
            }
            else if ((endDate.getHours() === date.getHours()) && (endDate.getDate() === date.getDate())) {
                return {title: todo.title, startDate, endDate, status: 'end'};
            }
            else{
                return {title: todo.title, startDate, endDate, status: 'active'};
            }
        })
    }, [date, todos]);

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