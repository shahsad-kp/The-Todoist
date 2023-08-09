import './TodoList.scss';
import {FC, useState} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Todo} from "../../types/Todo.ts";

type Props = {
    todos: Todo[]
    title: string
}

export const TodoList: FC<Props> = ({title, todos}) => {
    const [expanded, setExpanded] = useState(false);

    console.log(todos)
    return (<div className={`todo-list ${expanded && 'expanded'}`}>
        <div className={'todo-list-head'}>
            <h3>{title}</h3>
            <button
                className={'icon'}
                onClick={() => setExpanded(prevState => !prevState)}
            >
                {expanded ? <AiOutlineMinus/> : <AiOutlinePlus/>}
            </button>
        </div>
        {expanded && <div className={"todos"}>
            <div className={"todo"}>
                <input type="checkbox"/>
                <p>Todo 1</p>
            </div>
        </div>}
    </div>);
};