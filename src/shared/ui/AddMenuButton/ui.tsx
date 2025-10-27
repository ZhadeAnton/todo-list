import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles.css";

interface AddMenuButtonProps {
  onAdd: (name: string) => void;
}

export function AddMenuButton({ onAdd }: AddMenuButtonProps) {
  const [showInput, setShowInput] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");

  const handleAdd = () => {
    if (newMenuName.trim()) {
      onAdd(newMenuName.trim());
      setNewMenuName("");
      setShowInput(false);
    }
  };

  return (
    <div className="add-menu-container">
      <Button  
         onClick={() => setShowInput(!showInput)}
      >
        {showInput ? "Скрыть" : "Добавить задачу"}
      </Button>

      {showInput && (
        <div className="add-menu-input-container">
          <TextField
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            placeholder="Название задачи"
            size="small"
            className="add-menu-textfield"
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleAdd}
            className="add-menu-button"
          >
            Добавить
          </Button>
        </div>
      )}
    </div>
  );
}