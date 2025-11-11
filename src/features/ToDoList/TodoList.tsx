import type { Todo } from "@shared/mocks/handlers/todos";
import { useState } from "react";
import TodoItem from "@features/ToDoItem/TodoItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import "./styles.css";

type FilterType = "all" | "important" | "completed";

type TodoListProps = {
  todos: Todo[] | undefined;
  filter: FilterType;
};

export default function TodoList({ todos, filter }: TodoListProps) {
  const filteredTodos = todos?.filter((todo) => {
    if (filter === "important") {
      return todo.important;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true; // "all" - показываем все
  });

  return (
    <div>
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