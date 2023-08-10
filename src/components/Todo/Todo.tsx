import {Todo as TodoType} from "../../types/Todo.ts";
import {FC, useCallback} from "react";
import './Todo.scss';
import {TiTick} from "react-icons/ti";
import {useDispatch} from "react-redux";
import {markTodoCompleted, markTodoUncompleted} from "../../redux/todoSlice/todoSlice.ts";

type Props = {
    todo: TodoType
}

export const Todo: FC<Props> = ({todo}) => {
    const dispatcher = useDispatch();
    const handleCompletion = useCallback(() => {
        if (todo.completed){
            dispatcher(markTodoUncompleted(todo.id))
        }
        else{
            dispatcher(markTodoCompleted(todo.id))
        }
    }, [todo.id, todo.completed])

    return (<div className={"todo"}>
        <div className={'details'}>
            <input type="checkbox" checked={todo.completed}/>
            <span
                className={'checkbox'}
                onClick={handleCompletion}
            >
                <TiTick className={'tick-mark'}/>
            </span>
            <p>{todo.title}</p>
        </div>
        <div className={'actions'}>

        </div>
    </div>);
};