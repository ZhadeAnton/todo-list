import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./styles.css";

  export default function BasicTextFields() {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    const showAlert = (message: string) => {
      alert(message);
    };
  return (
    <div className="Autorization">
      <TextField
        id="filled-basic"
        label="Имя пользователя"
        variant="filled"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        id="filled-basic"
        label="Пароль"
        variant="filled"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          showAlert(name + " " + password);
        }}
      >
        Войти
      </Button>
    </div>
  );
}
