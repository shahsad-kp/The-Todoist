import {Todo as TodoType} from "../../types/Todo.ts";
import {FC} from "react";

type Props = {
    todo: TodoType
}

export const Todo: FC<Props> = ({todo}) => {
    return (<div className={"todo"}>
            <input type="checkbox"/>
            <p>{todo.title}</p>
        </div>);
};