import type { PropsWithChildren } from "react";
import "./styles.css";

type LoaderProps = PropsWithChildren<{
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  text?: string;
}>;

export function Loader({ children, size = "medium", color = "primary", text }: LoaderProps) {
  return (
    <div className={`loader-container ${size}`}>
      <div className={`loader ${color}`}>
        <div className="loader-spinner"></div>
      </div>
      {text && <div className="loader-text">{text}</div>}
      {children}
    </div>
  );
}
