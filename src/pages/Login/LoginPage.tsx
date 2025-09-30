import { Button } from "@shared/ui/button";
import "./styles.css";

export default function LoginPage() {
  return (
    <div className="login">
      <h2>Авторизация</h2>
      <input placeholder="Логин" />
      <input placeholder="Пароль" type="password" />
      <Button>Войти</Button>
    </div>
  );
}
