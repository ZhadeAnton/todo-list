import { authHandlers } from "./auth";
import { todoHandlers } from "./todos";
import { menuHandlers } from "./menu";

export const handlers = [...authHandlers, ...todoHandlers, ...menuHandlers];
