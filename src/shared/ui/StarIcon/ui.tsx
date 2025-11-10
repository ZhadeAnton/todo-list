import StarIconMUI from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CircularProgress, IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoImportant } from "@shared/api/todos";
import "./styles.css";

type StarIconProps = {
  id: string;
  important: boolean;
  disabled?: boolean;
};

export function StarIconButton({ id, important, disabled = false }: StarIconProps) {
  const queryClient = useQueryClient();

  const toggleTodoImportantMutation = useMutation({
    mutationFn: ({ id, important }: { id: string; important: boolean }) =>
      toggleTodoImportant(id, important),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggleImportant = () => {
    toggleTodoImportantMutation.mutate({
      id,
      important: !important,
    });
  };
  return (
    <IconButton
      onClick={handleToggleImportant}
      disabled={disabled || toggleTodoImportantMutation.isPending}
      aria-label={important ? "Убрать из важных" : "Добавить в важные"}
      className="star-icon-button"
    >
      {toggleTodoImportantMutation.isPending ? (
        <CircularProgress size={24} />
      ) : important ? (
        <StarIconMUI />
      ) : (
        <StarBorderIcon />
      )}
    </IconButton>
  );
}
