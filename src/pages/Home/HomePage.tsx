import "./styles.css";
import TodoList from "@features/ToDoList/TodoList";
import { getTodos } from "@shared/api/todos";
import { useQuery } from "@tanstack/react-query";
import { TodoInput } from "@features/ToDoInput/TodoInput";
import { TodoMenu } from "@features/TodoMenu";
import { useState } from "react";

type FilterType = "all" | "important" | "completed";

export default function HomePage() {
  const [filter, setFilter] = useState<FilterType>("all");
  
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <div className="home">
      <div className="left">
        <TodoMenu filter={filter} onFilterChange={setFilter} />
      </div>
      <div className="right">
        <TodoInput />
        <TodoList todos={data?.todos} filter={filter} />
      </div>
    </div>
  );
}
