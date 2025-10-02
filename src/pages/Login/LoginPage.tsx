import { Button } from "@shared/ui/button";
import { useState } from "react";
import "./styles.css";

export default function LoginPage() {
  const [counter, setCounter] = useState(1);

  return (
    <div className="login">
      <h2>Авторизация</h2>
      <input color="primary" placeholder="Логин" />
      <input color="primary" placeholder="Пароль" type="password" />

      <div>{counter}</div>

      <Button color="primary" onClick={() => setCounter(counter + 1)} isBorder={true}>
        Увеличить
      </Button>
      <Button color="tertiary" onClick={() => setCounter(counter - 1)} isBorder={true}>
        Уменьшить
      </Button>

      {/* <Button color="tertiary" onClick={() => setIsChecked(!isChecked)} isBorder={true}>
        Регистрация
      </Button> */}
    </div>
  );
}
