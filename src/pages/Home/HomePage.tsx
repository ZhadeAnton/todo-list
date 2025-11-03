import "./styles.css";
import TodoList from "@features/ToDoList/TodoList";
import { getTodos } from "@shared/api/todos";
import { useQuery } from "@tanstack/react-query";
import { TodoInput } from "@features/ToDoInput/TodoInput";
import { TodoMenu } from "@features/TodoMenu";

export default function HomePage() {
   const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <div className="home">
      <TodoMenu />
      <div className="right">
        <TodoInput />
        <TodoList todos={data?.todos} />
      </div>
    </div>
  );
}
