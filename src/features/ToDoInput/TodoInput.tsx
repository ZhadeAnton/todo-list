import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@shared/api/todos";

interface TodoInputProps {
  onSuccess?: () => void;
}

export function TodoInput({ onSuccess }: TodoInputProps) {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");

  const { mutate: createTodoMutation, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInputValue(""); 
      onSuccess?.();
    },
  });

  const handleCreateTodo = () => {
    if (inputValue.trim()) {
      createTodoMutation({ text: inputValue.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPending) {
      handleCreateTodo();
    }
  };
 
  return (
    <div style={{ }}>
      <TextField
        id="create-todo"
        label="Создать задачу"
        variant="filled"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isPending}
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleCreateTodo}
        disabled={isPending || !inputValue.trim()}
      >
        {isPending ? <CircularProgress size={24} /> : "Добавить задачу"}
      </Button>
    </div>
  );
}