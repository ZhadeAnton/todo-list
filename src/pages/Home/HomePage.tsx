import "./styles.css";
import TodoList from "@features/ToDoList/TodoList";
import { getTodos } from "@shared/api/todos";
import { useQuery } from "@tanstack/react-query";
import { TodoInput } from "@features/ToDoInput/TodoInput";
import { Button } from "@mui/material";
import { useState } from "react";
import { menu } from "./config";
import { AddMenuButton } from "@shared/ui/AddMenuButton";

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [menuList, setMenuList] = useState(menu);
  
  const handleAddMenu = (name: string) => {
    setMenuList([...menuList, { id: menuList.length + 1, name: name }]);
  };

  
  return (
    <div className="home">
      <div className="left">
        <h1>Задачи</h1>
        <ul>
  {menuList.map((item) => (
    <li key={item.id}>
      <Button 
        onClick={() => {}}
        className="menu-button" 
      >
        {item.name}
      </Button>
    </li>
  ))}
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
