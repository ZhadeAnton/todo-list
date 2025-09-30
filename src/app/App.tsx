import { Button } from "@shared/ui/button";
import "./styles.css";

export function App() {
  return (
    <div className="app">
      <h1>React</h1>
      <Button onClick={() => alert("Hello!")}>Click me</Button>
    </div>
  );
}
