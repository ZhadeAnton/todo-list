import { authHandlers } from "./auth";
import { todoHandlers } from "./todos";

export const handlers = [...authHandlers, ...todoHandlers];
