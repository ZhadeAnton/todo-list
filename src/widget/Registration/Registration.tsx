import { useState, useId } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Alert } from "@mui/material";
import { register } from "@shared/api/auth";
import type { RegisterResponse } from "@shared/mocks/handlers/auth";
import "./styles.css";

export default function Registration() {
  const usernameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<RegisterResponse | null>(null);

  const handleRegister = async () => {
    // Валидация
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await register({
        username: username,
        email: email,
        password: password,
      });

      if (response.success) {
        setSuccess(response);
        console.log("Успешная регистрация:", response);
        // Очищаем форму после успешной регистрации
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(response.message || "Ошибка регистрации");
      }
    } catch (err) {
      setError("Произошла ошибка при подключении к серверу");
      console.error("Ошибка регистрации:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Registration">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success.message || `Добро пожаловать, ${success.user?.username}!`}
        </Alert>
      )}

      <TextField
        id={usernameId}
        label="Имя пользователя"
        variant="filled"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        disabled={loading}
        fullWidth
      />
      <TextField
        id={emailId}
        label="Email"
        variant="filled"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
      <TextField
        id={confirmPasswordId}
        label="Подтвердите пароль"
        variant="filled"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        disabled={loading}
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleRegister}
        disabled={loading || !username || !email || !password || !confirmPassword}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Зарегистрироваться"}
      </Button>
    </div>
  );
}
