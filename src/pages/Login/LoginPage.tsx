import { Button } from "@shared/ui/button";
import { useEffect, useState } from "react";
import "./styles.css";

export default function LoginPage() {
  const [dog, setDog] = useState("");

  function fetchDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setDog(data.message);
      });
  }

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="login">
      <h2>Авторизация</h2>
      <input color="primary" placeholder="Логин" />
      <input color="primary" placeholder="Пароль" type="password" />

        <br />
        <img src={dog} alt="dog" width={240} height={200} />
        <br />

        <Button color="primary" onClick={() => fetchDog()} isBorder={true}>
          Получить нового пса
        </Button>
      </main>
    </div>
  );
}
