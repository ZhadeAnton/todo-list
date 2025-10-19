import type { Todo } from "@shared/mocks/handlers/todos";
import TodoItem from "@features/ToDoItem/TodoItem";

export default function TodoList({ todos }: { todos: Todo[] | undefined }) {
    return (
        <div>
            {todos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}