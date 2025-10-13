import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Создаем worker для браузера с нашими хендлерами
export const worker = setupWorker(...handlers);
