import {createSlice} from '@reduxjs/toolkit';
import {Todo} from "../../types/Todo.ts";

const initialState = {
    todoList: [] as Todo[],
}

type AddTodo = {
    type: string,
    payload: Todo
}

type RemoveTodo = {
    type: string,
    payload: string
}

type MarkTodoCompleted = {
    type: string,
    payload: string
}

type MarkTodoUncompleted = {
    type: string,
    payload: string
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        addTodo: (state, action: AddTodo) => {
            state.todoList.push(action.payload);
        },
        removeTodo: (state, action: RemoveTodo) => {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
        },
        markTodoCompleted: (state, action: MarkTodoCompleted) => {
            state.todoList = state.todoList.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: true
                    }
                }
                return todo;
            })
        },
        markTodoUncompleted: (state, action: MarkTodoUncompleted) => {
            state.todoList = state.todoList.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: false
                    }
                }
                return todo;
            })
        }
    }
})

export const {
    addTodo,
    removeTodo,
    markTodoCompleted,
    markTodoUncompleted
} = todoSlice.actions;

export default todoSlice.reducer;