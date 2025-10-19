import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Alert } from "@mui/material";
import { register } from "@shared/api/auth";
import type { RegisterRequest, RegisterResponse } from "@shared/mocks/handlers/auth";
import { validateEmail, validatePassword, validateRegister, validateUsername } from "@shared/lib/validation";
import "./styles.css";

export default function Registration() {
  const navigate = useNavigate();
  const usernameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const registerMutation = useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.success) {
        console.log("Успешная регистрация:", data);
      }
    },
    onError: (error) => {
      console.error("Ошибка регистрации:", error);
    },
  });

  return (
    <div className="Registration">
      {validationError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {validationError}
        </Alert>
      )}
      {registerMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {registerMutation.error?.message || "Произошла ошибка при подключении к серверу"}
        </Alert>
      )}
      {registerMutation.isSuccess && !registerMutation.data.success && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {registerMutation.data.message || "Ошибка регистрации"}
        </Alert>
      )}
      {registerMutation.isSuccess && registerMutation.data.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {registerMutation.data.message ||
            `Добро пожаловать, ${registerMutation.data.user?.username}!`}
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
        disabled={registerMutation.isPending}
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
          if (e.target.value && !validateEmail(e.target.value)) {
            setValidationError("Введите корректный email адрес");
          } else {
            setValidationError(null);
          }
        }}
        disabled={registerMutation.isPending}
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
          if (e.target.value && !validatePassword(e.target.value)) {
            setValidationError("Введите корректный пароль");
          } else {
            setValidationError(null);
          }
        }}
        disabled={registerMutation.isPending}
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
          if (e.target.value && !validatePassword(e.target.value)) {
            setValidationError("Введите корректный пароль");
          } else {
            setValidationError(null);
          }
        }}
        disabled={registerMutation.isPending}
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => { if (validateRegister(username, email, password, confirmPassword)) 
          { registerMutation.mutate({ username: username, email: email, password: password }); navigate("/home"); } }}
        fullWidth
      >
        {registerMutation.isPending ? <CircularProgress size={24} /> : "Зарегистрироваться"}
      </Button>
    </div>
  );
}