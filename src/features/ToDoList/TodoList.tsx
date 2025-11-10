import type { Todo } from "@shared/mocks/handlers/todos";
import { useState } from "react";
import TodoItem from "@features/ToDoItem/TodoItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import "./styles.css";

type FilterType = "all" | "important" | "completed";

export default function TodoList({ todos }: { todos: Todo[] | undefined }) {
  const [filter, setFilter] = useState<FilterType>("all");
  const filteredTodos = todos?.filter((todo) => {
    if (filter === "important") {
      return todo.important;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Filter button group">
        <Button
          onClick={() => setFilter("important")}
          variant={filter === "important" ? "contained" : "outlined"}
        >
          Важно
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={filter === "completed" ? "contained" : "outlined"}
        >
          Выполнено
        </Button>
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "contained" : "outlined"}
        >
          Все
        </Button>
      </ButtonGroup>
      <ul className="todo-list">
        {filteredTodos?.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
