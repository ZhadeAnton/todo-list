import type { Todo } from "@shared/mocks/handlers/todos";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] | undefined }) {
    return (
        <div>
            <h1>Todo List</h1>
            {todos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}