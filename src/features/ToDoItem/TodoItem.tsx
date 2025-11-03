import type { Todo } from "@shared/mocks/handlers/todos";
import { Button, CircularProgress, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
            <div className="checkbox">
              <CircularProgress size={24} />
            </div>
          ) : (
            <Checkbox
              checked={todo.completed}
              onChange={handleToggle}
              disabled={toggleTodoMutation.isPending}
            />
          )
        }
        label={<div>{todo.text}</div>}
      />
      <IconButton
        color="primary"
        onClick={handleDelete}
        disabled={deleteTodoMutation.isPending}
        aria-label="delete"
      >
        {deleteTodoMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          <DeleteIcon />
        )}
      </IconButton>
    </div>
  );
}
