import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddMenuButton } from "@shared/ui/AddMenuButton";
import { ConfirmModal } from "@shared/ui/modalWindow";
import { createMenu, deleteMenu, getMenu } from "@shared/api/menu";
import { CircularProgress, IconButton } from "@mui/material";
import "./styles.css";

type FilterType = "all" | "important" | "completed";

type TodoMenuProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function TodoMenu({ filter, onFilterChange }: TodoMenuProps) {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  //const [IsConfirmDeleteMenu, setIsConfirmDeleteMenu] = useState(false);
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
      //setIsConfirmDeleteMenu(false);
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
    //setIsConfirmDeleteMenu(true);
    setDeleteMenuId(id);
  }
  function getFilterForMenuId(menuId: number): FilterType | null {
    if (menuId === 1) return "completed";
    if (menuId === 2) return "important";
    if (menuId === 3) return "all";
    return null;
  }


  function getMenuIdForFilter(Filter: FilterType): number | null {
    if (Filter === "completed") return 1;
    if (Filter === "important") return 2;
    if (Filter === "all") return 3;
    return null;
  }

  function handleMenuClick(menuId: number): void {
    const menuFilter = getFilterForMenuId(menuId);
    if (menuFilter !== null) {
      onFilterChange(menuFilter);
    }
  }

  const selectedMenuId = getMenuIdForFilter(filter);

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
              className={`menu-button ${selectedMenuId === item.id ? "menu-button-selected" : ""}`}
            >
              <div className="menu-button-content" onClick={() => handleMenuClick(item.id)}>
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
            </li>
          ))
        )}
      </ul>
      <AddMenuButton onAdd={handleAddMenu} isPending={createMenuMutation.isPending} />
      {deleteMenuId !== null && (
        <ConfirmModal
          open={open}
          onClose={() => {
            setOpen(false);
            setDeleteMenuId(null);
          }}
          onConfirm={() => handleDeleteMenu(deleteMenuId)}
          title="Вы уверены, что хотите удалить это меню?"
          isLoading={deleteMenuMutation.isPending}
        />
      )}
    </div>
  );
}
