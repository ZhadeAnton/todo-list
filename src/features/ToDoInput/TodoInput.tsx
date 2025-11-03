import { Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@shared/api/todos";
import AddIcon from "@mui/icons-material/Add";

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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleCreateTodo}
                disabled={isPending || !inputValue.trim()}
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: 'auto', px: 1 }}
              >
                {isPending ? <CircularProgress size={16} /> : "Добавить"}
              </Button>
            </InputAdornment>
          ),
        }}
></TextField>
    </div>
  );
}