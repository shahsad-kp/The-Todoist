import './SideBar.scss'
import {FaPlus} from "react-icons/fa";
import {TodoList} from "../TodoList/TodoList.tsx";
import {useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Todo} from "../../types/Todo.ts";
import {TodoGroup} from "../../types/TodoGroup.ts";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {NewTodo} from "../NewTodo/NewTodo.tsx";

export const SideBar = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todos = useSelector(state => state?.todos.todoList);
    const [newTodoToggled, setNewTodoToggled] = useState(false);
    const [toggled, setToggled] = useState(false);

    const getDateRangeString = useCallback((date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        const thisWeek = new Date();
        thisWeek.setDate(thisWeek.getDate() - today.getDay());
        const thisMonth = new Date();
        thisMonth.setDate(1);
        console.log(today.getTime())
        if (date.getTime() >= today.getTime() && date.getTime() <= (today.getTime() + 24 * 60 * 60 * 1000)) {
            return "Today";
        } else if (date.getTime() >= thisWeek.getTime() && date.getTime() <= (thisWeek.getTime() + 6 * 24 * 60 * 60 * 1000)) {
            return "This Week";
        } else if (date.getTime() >= thisMonth.getTime() && date.getTime() <= (thisMonth.getTime() + 30 * 24 * 60 * 60 * 1000)) {
            return "This Month";
        } else {
            return "Others";
        }
    }, [])

    const todoGroups = useMemo(() => {
        const todoGroups = new Map();
        todos.forEach((todo: Todo) => {
            const type = getDateRangeString(new Date(todo.date));
            if (todoGroups.has(type)) {
                todoGroups.get(type).push(todo);
            } else {
                todoGroups.set(type, [todo]);
            }
        });
        const convertedTodoGroups: TodoGroup[] = [];
        todoGroups.forEach((value, key) => {
            convertedTodoGroups.push({title: key, todos: value});
        });
        return convertedTodoGroups;
    }, [todos])

    return (<>
        <div className={`sidebar`}>
            <div className={`sidebar-inner ${toggled && 'opened'}`}>
                <div className={'head'}>
                    <h2>Todos</h2>
                    <button
                        className={'icon'}
                        onClick={() => setNewTodoToggled(prevState => !prevState)}
                    >
                        <FaPlus/>
                    </button>
                </div>
                {todoGroups.map((todoGroup: TodoGroup) => <TodoList
                    key={todoGroup.title}
                    title={todoGroup.title}
                    todos={todoGroup.todos}
                />)}
            </div>
            <button
                className={'side-bar-toggle'}
                onClick={() => setToggled(prevState => !prevState)}
            >
                {toggled ? <IoIosArrowBack/> : <IoIosArrowForward/>}
            </button>
        </div>
        {newTodoToggled && <NewTodo closeFunction={() => setNewTodoToggled(false)}/>}
    </>);
};