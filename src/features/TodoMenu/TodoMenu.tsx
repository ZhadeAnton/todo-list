import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AddMenuButton } from "@shared/ui/AddMenuButton";
import { Button } from "@shared";
import { createMenu, deleteMenu, getMenu } from "@shared/api/menu";
import "./styles.css";
import { CircularProgress, IconButton } from "@mui/material";

export default function TodoMenu() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [isConfirmDeleteMenu, setIsConfirmDeleteMenu] = useState(false);
  const [deleteMenuId, setDeleteMenuId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const createMenuMutation = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });
  const deleteMenuMutation = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      setOpen(false);
      setIsConfirmDeleteMenu(false);
      setDeleteMenuId(null);
    },
  });
  const { data: menuList, isLoading: isMenuLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  function handleAddMenu(name: string): void {
    createMenuMutation.mutate({ name });
  }

  function handleDeleteMenu(id: number): void {
    deleteMenuMutation.mutate(id);
  }

  function handleConfirmDeleteMenu(id: number): void {
    setOpen(true);
    setIsConfirmDeleteMenu(true);
    setDeleteMenuId(id);
  }

  return (
    <div>
      <h1>Задачи</h1>
      <ul className="todo-menu">
        {isMenuLoading ? (
          <CircularProgress size={24} />
        ) : (
          menuList?.menu?.map((item) => (
            <li
              key={item.id}
              className={`menu-button ${selectedMenu === item.id ? "menu-button-selected" : ""}`}
            >
              <div className="menu-button-content" onClick={() => setSelectedMenu(item.id)}>
                <p>{item.name}</p>
              </div>

              <span className="delete-icon" onClick={() => handleConfirmDeleteMenu(item.id)}>
                <IconButton
                  color="primary"
                  disabled={
                    deleteMenuMutation.isPending && deleteMenuMutation.variables === item.id
                  }
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfirmDeleteMenu(item.id);
                  }}
                >
                  {deleteMenuMutation.isPending && deleteMenuMutation.variables === item.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              </span>

              {isConfirmDeleteMenu && deleteMenuId === item.id && (
                <Modal open={open} onClose={() => setOpen(false)}>
                  <Box
                    className="modal-style"
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Вы уверены, что хотите удалить это меню?
                    </Typography>
                    <div className="confirm-delete-menu-buttons">
                      <Button
                        color="primary"
                        onClick={() => handleDeleteMenu(deleteMenuId as number)}
                        disabled={deleteMenuMutation.isPending}
                      >
                        {deleteMenuMutation.isPending ? <CircularProgress size={24} /> : "Да"}
                      </Button>
                      <Button color="secondary" onClick={() => setOpen(false)}>
                        Нет
                      </Button>
                    </div>
                  </Box>
                </Modal>
              )}
            </li>
          ))
        )}
      </ul>

      <AddMenuButton onAdd={handleAddMenu} isPending={createMenuMutation.isPending} />
    </div>
  );
}
