import './NewTodo.scss';
import {FC, FormEvent, useCallback, useEffect, useState} from "react";
import {FaXmark} from "react-icons/fa6";
import {Todo} from "../../types/Todo.ts";
import {useDispatch} from "react-redux";
import {addTodo} from "../../redux/todoSlice/todoSlice.ts";

type Props = {
    closeFunction: () => void;
}

export const NewTodo: FC<Props> = ({closeFunction}) => {
    const [todoTitle, setTodoTitle] = useState('');
    const [lastDate, setLastDate] = useState(new Date());

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

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const todo: Todo = {
            id: Math.random(),
            title: todoTitle,
            date: lastDate.toISOString(),
            completed: false,
        }
        dispatcher(addTodo(todo));
        closeFunction();
    }, [closeFunction, dispatcher, lastDate, todoTitle]);
    return (
        <div className={'new-todo-outer'}>
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
                        <label>Last date: </label>
                        <input
                            type="date"
                            value={lastDate.toISOString().split('T')[0]}
                            onChange={(event) => setLastDate(new Date(event.target.value))}
                        />
                    </div>
                    <button type={'submit'}>Add</button>
                </form>
            </div>
        </div>
    );
};