import "./styles.css";
import TodoList from "@features/ToDoList/TodoList";
import { getTodos } from "@shared/api/todos";
import { useQuery } from "@tanstack/react-query";
import { TodoInput } from "@features/ToDoInput/TodoInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddMenuButton } from "@shared/ui/AddMenuButton";
import { createMenu, deleteMenu, getMenu } from "@shared/api/menu";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@shared/ui/loader/ui";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@shared";

export default function HomePage() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [isConfirmDeleteMenu, setIsConfirmDeleteMenu] = useState(false);
  const [deleteMenuId, setDeleteMenuId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { data: menuList, isLoading: isMenuLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const handleAddMenu = (name: string) => {
    createMenu({ name }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    });
  };

  const handleDeleteMenu = (id: number) => {
    deleteMenu(id).then(() => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    });
  };

  const handleConfirmDeleteMenu = (id: number) => {
    setOpen(true);
    setIsConfirmDeleteMenu(true);
    setDeleteMenuId(id);
  };

  return (
    <div className="home">
      <div className="left">
        <h1>Задачи</h1>
        <ul>
          {isMenuLoading ? (
            <Loader size="small" />
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
                  <DeleteIcon color="error" sx={{ fontSize: 20 }} />
                </span>

                {isConfirmDeleteMenu && deleteMenuId === item.id && (
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className="modal-style">
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Вы уверены, что хотите удалить это меню?
                      </Typography>
                      <div className="confirm-delete-menu-buttons">
                        <Button color="primary" onClick={() => handleDeleteMenu(deleteMenuId)}>
                          Да
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

        <AddMenuButton onAdd={handleAddMenu} />
      </div>
      <div className="right">
        <TodoInput />
        <TodoList todos={data?.todos} />
      </div>
    </div>
  );
}
