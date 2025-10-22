import { Button, CircularProgress } from "@mui/material";
import "./styles.css";
import TodoList from "@features/ToDoList/TodoList";
import { getTodos } from "@shared/api/todos";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "@shared/api/todos";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { TodoInput } from "@features/ToDoInput/TodoInput";
import { styled } from "@mui/material/styles";

export default function HomePage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  return (
    <div className="home">
      <h2>Главная</h2>
      <p>Добро пожаловать!</p>

      <TodoInput />

      <TodoList todos={data?.todos} />
    </div>
  );
}
