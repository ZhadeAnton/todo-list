import { Button } from "@shared/ui/button";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Input } from "@shared/ui/input";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Главная</h2>
      <p>Добро пожаловать!</p>
      <Button color="primary" onClick={() => navigate("/login")}>На авторизацию</Button>
      <Input placeholder="Введите ваше имя" />
    </div>
  );
}
