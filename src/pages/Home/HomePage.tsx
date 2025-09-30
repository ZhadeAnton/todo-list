import { Button } from "@shared/ui/button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Главная</h2>
      <p>Добро пожаловать!</p>
      <Button onClick={() => navigate("/login")}>На авторизацию</Button>
    </div>
  );
}
