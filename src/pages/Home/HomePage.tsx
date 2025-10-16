import { Button, CircularProgress } from "@mui/material";
import "./styles.css";
import TodoList from "@features/TodoList";
import { getTodos } from "@shared/api/todos";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "@shared/api/todos";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useQueryClient } from "@tanstack/react-query";

import { styled } from "@mui/material/styles";


export default function HomePage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  const [inputValue, setInputValue] = useState("");

  const { mutate: createTodoMutation, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleCreateTodo = (text: string) => {
    createTodoMutation({ text: text });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  return (
    <div className="home">
      <h2>Главная</h2>
      <p>Добро пожаловать!</p>

      <TextField
        id="create-todo"
        label="Создать задачу"
        variant="filled"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleCreateTodo(inputValue)}
        disabled={isPending}
      >
        {isPending ? <CircularProgress size={24} /> : "Добавить задачу"}
      </Button>

      <TodoList todos={data?.todos} />
    </div>
  );
}
