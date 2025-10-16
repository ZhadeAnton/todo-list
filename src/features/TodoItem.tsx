import type { Todo } from "@shared/mocks/handlers/todos";
import "./styles.css";

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="todo-item">
      <h1>{todo.text}</h1>
    </div>
  );
}
