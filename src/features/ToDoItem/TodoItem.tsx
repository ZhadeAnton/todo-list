import type { Todo } from "@shared/mocks/handlers/todos";
import { Button, CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@shared/api/todos";
import "./styles.css";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <div className="TodoItem">
      <h1>{todo.text}</h1>
      <Button 
        variant="contained"
        color="error"
        onClick={handleDelete}
        disabled={deleteTodoMutation.isPending}
      >
        {deleteTodoMutation.isPending ? <CircularProgress size={24} /> : "Удалить"}
      </Button>
    </div>
  );
}