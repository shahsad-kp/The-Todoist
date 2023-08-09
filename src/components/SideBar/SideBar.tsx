import './SideBar.scss'
import {FaPlus} from "react-icons/fa";
import {TodoList} from "../TodoList/TodoList.tsx";
import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Todo} from "../../types/Todo.ts";
import {TodoGroup} from "../../types/TodoGroup.ts";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

export const SideBar = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todos = useSelector(state => state?.todos.todoList);
    const [toggled, setToggled] = useState(false);

    const todoGroups = useMemo(() => {
        const todoGroups = new Map();
        todos.forEach((todo: Todo) => {
            const date = new Date(todo.date).toDateString();
            if (todoGroups.has(date)) {
                todoGroups.get(date).push(todo);
            } else {
                todoGroups.set(date, [todo]);
            }
        });
        const convertedTodoGroups: TodoGroup[] = [];
        todoGroups.forEach((value, key) => {
            convertedTodoGroups.push({title: key, todos: value});
        });
        return convertedTodoGroups;
    }, [todos])

    return (<div className={`sidebar`}>
        <div className={`sidebar-inner ${toggled && 'opened'}`}>
            <div className={'head'}>
                <h2>Todos</h2>
                <button className={'icon'}>
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
    </div>);
};