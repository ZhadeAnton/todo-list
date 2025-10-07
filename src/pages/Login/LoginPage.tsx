import { Button } from "@shared/ui/button";
import { useApi } from "./useApi";
import { useManyApi } from "./useManyApi";
import { Loader } from "@shared/ui/loader";
import TextField from "@mui/material/TextField";
import "./styles.css";

export default function LoginPage() {
  const { dog, fetchDog, isLoading } = useApi();
  const { dogs, fetchDogs, isLoading: isLoadingMany } = useManyApi();

  return (
    <div className="login">
      <h2>Авторизация</h2>
      <TextField color="primary" placeholder="Логин" type="text" />
      <TextField color="primary" placeholder="Пароль" type="password" />

      <br />
      {isLoading ? (
        <Loader size="large">Загрузка...</Loader>
      ) : (
        <img src={dog} alt="dog" width={240} height={200} />
      )}
      <br />

      <Button color="primary" onClick={() => fetchDog()} isBorder={true}>
        Получить нового пса
      </Button>

      <Button color="secondary" onClick={() => fetchDogs()} isBorder={true}>
        Получить 5 псов
      </Button>
      <br />
      {isLoadingMany ? (
        <Loader size="large">Загрузка...</Loader>
      ) : (
        dogs.map((dog) => <img src={dog} alt="dog" width={240} height={200} />)
      )}
      <Loader size="large">Загрузка...</Loader>
    </div>
  );
}
