import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./styles.css";

export default function Registration() {
        const [name, setName] = React.useState("");
        const [lastName, setLastName] = React.useState("");
        const [email, setEmail] = React.useState("");
        const [password, setPassword] = React.useState("");
      
        const showAlert = (message: string) => {
          alert(message);
        };
      return (
        <div className="Registration">
          <TextField
            id="filled-basic"
            label="Ваше имя"
            variant="filled"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Ваша фамилия"
            variant="filled"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Ваш email"
            variant="filled"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Ваш пароль"
            variant="filled"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              showAlert(name + " " + lastName + " " + email + " " + password);
            }}
          >
            Зарегистрироваться
          </Button>
        </div>
          );
            }
