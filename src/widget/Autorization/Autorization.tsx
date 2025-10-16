import { useState, useId } from "react";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Alert } from "@mui/material";
import { login } from "@shared/api/auth";
import type { LoginRequest, LoginResponse } from "@shared/mocks/handlers/auth";
import "./styles.css";
import { useNavigate } from "react-router-dom";


export default function BasicTextFields() {
  const usernameId = useId();
  const passwordId = useId();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Используем useMutation для авторизации
  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        // Здесь можно сохранить токен и данные пользователя
        console.log("Успешная авторизация:", data);
      }
    },
    onError: (error) => {
      console.error("Ошибка авторизации:", error);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      username: name,
      password: password,
    });
  };

  return (
    <div className="Autorization">
      {loginMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginMutation.error?.message || "Произошла ошибка при подключении к серверу"}
        </Alert>
      )}
      {loginMutation.isSuccess && !loginMutation.data.success && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginMutation.data.message || "Ошибка авторизации"}
        </Alert>
      )}
      {loginMutation.isSuccess && loginMutation.data.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Добро пожаловать, {loginMutation.data.user?.username}!
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
        disabled={loginMutation.isPending}
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
        disabled={loginMutation.isPending}
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => { handleLogin(); navigate("/home"); }}
        disabled={loginMutation.isPending || !name || !password}
        fullWidth
      >
        {loginMutation.isPending ? <CircularProgress size={24} /> : "Войти"}
      </Button>
    </div>
  );
}
