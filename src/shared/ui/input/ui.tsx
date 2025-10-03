import type { ChangeEvent } from "react";
import "./styles.css";

type InputProps = {
    color?: "primary" | "secondary" | "tertiary";
  placeholder?: string;
  value?: string;
  type?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ placeholder, type = "text", value, onChange }: InputProps) {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
}