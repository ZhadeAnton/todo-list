import type { PropsWithChildren } from "react";
import "./styles.css";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  color?: "primary" | "secondary" | "tertiary";
  isBorder?: boolean;
  disabled?: boolean;
}>;

export function Button({ children, color, onClick, disabled, isBorder }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button ${color ?? ""} ${isBorder ? "border" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
