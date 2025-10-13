import { useState, useId } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Alert } from "@mui/material";
import { login } from "@shared/api/auth";
import type { LoginResponse } from "@shared/mocks/handlers/auth";
import "./styles.css";

export default function BasicTextFields() {
  const usernameId = useId();
  const passwordId = useId();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<LoginResponse | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await login({
        username: name,
        password: password,
      });

      if (response.success) {
        setSuccess(response);
        // Здесь можно сохранить токен и данные пользователя
        console.log("Успешная авторизация:", response);
      } else {
        setError(response.message || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Произошла ошибка при подключении к серверу");
      console.error("Ошибка авторизации:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Autorization">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Добро пожаловать, {success.user?.username}!
        </Alert>
      )}

      <TextField
        id={usernameId}
        label="Имя пользователя"
        variant="filled"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        disabled={loading}
        fullWidth
      />
      <TextField
        id={passwordId}
        label="Пароль"
        variant="filled"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        disabled={loading}
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleLogin}
        disabled={loading || !name || !password}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Войти"}
      </Button>
    </div>
  );
}
