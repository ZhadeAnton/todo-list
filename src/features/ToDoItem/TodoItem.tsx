import type { Todo } from "@shared/mocks/handlers/todos";
import { Button, CircularProgress, Checkbox, FormControlLabel } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, toggleTodo } from "@shared/api/todos";
import { Loader } from "@shared/ui/loader";
import "./styles.css";


export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) => 
      toggleTodo(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  const handleToggle = () => {
    toggleTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return (
    <div className="TodoItem">
      <FormControlLabel
        control={
          toggleTodoMutation.isPending ? (
            <Loader size="small" />
          ) : (
          <Checkbox
            checked={todo.completed}
            onChange={handleToggle}
            disabled={toggleTodoMutation.isPending}
          />
          )
        }

        label={
          <div>
            {todo.text}
          </div>
        }
      />
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
