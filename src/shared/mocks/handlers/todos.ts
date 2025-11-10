import { http, HttpResponse } from "msw";

// Типы для Todo API
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  important: boolean;
}

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
  important?: boolean;
}

export interface TodosResponse {
  success: boolean;
  todos?: Todo[];
  message?: string;
}

export interface TodoResponse {
  success: boolean;
  todo?: Todo;
  message?: string;
}

// In-memory хранилище задач (сбросится при перезагрузке страницы)
let todos: Todo[] = [
  {
    id: "1",
    text: "Изучить React",
    completed: false,
    createdAt: new Date().toISOString(),
    important: false
  },
  {
    id: "2",
    text: "Сверстать форму",
    completed: true,
    createdAt: new Date().toISOString(),
    important: false
  },
  {
    id: "3",
    text: "Добавить моки для API",
    completed: false,
    createdAt: new Date().toISOString(),
    important: true
  },
];

// Счетчик для генерации ID
let nextId = 4;

// Хендлеры для Todo API
export const todoHandlers = [
  // Получить все задачи
  http.get("/api/todos", async () => {
    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json<TodosResponse>({
      success: true,
      todos: todos,
    });
  }),

  // Создать новую задачу
  http.post("/api/todos", async ({ request }) => {
    const body = (await request.json()) as CreateTodoRequest;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Валидация
    if (!body.text || body.text.trim() === "") {
      return HttpResponse.json<TodoResponse>(
        {
          success: false,
          message: "Текст задачи не может быть пустым",
        },
        { status: 400 },
      );
    }

    // Создаем новую задачу
    const newTodo: Todo = {
      id: String(nextId++),
      text: body.text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      important: false,
    };

    todos.push(newTodo);

    return HttpResponse.json<TodoResponse>({
      success: true,
      todo: newTodo,
      message: "Задача успешно создана",
    });
  }),

  // Обновить задачу
  http.patch("/api/todos/:id", async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as UpdateTodoRequest;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Находим задачу
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return HttpResponse.json<TodoResponse>(
        {
          success: false,
          message: "Задача не найдена",
        },
        { status: 404 },
      );
    }

    // Обновляем задачу
    const updatedTodo = {
      ...todos[todoIndex],
      ...(body.text !== undefined && { text: body.text.trim() }),
      ...(body.completed !== undefined && { completed: body.completed }),
      ...(body.important !== undefined && { important: body.important}),
    };

    todos[todoIndex] = updatedTodo;

    return HttpResponse.json<TodoResponse>({
      success: true,
      todo: updatedTodo,
      message: "Задача успешно обновлена",
    });
  }),

  // Удалить задачу
  http.delete("/api/todos/:id", async ({ params }) => {
    const { id } = params;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Находим индекс задачи
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return HttpResponse.json<TodoResponse>(
        {
          success: false,
          message: "Задача не найдена",
        },
        { status: 404 },
      );
    }

    // Удаляем задачу
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);

    return HttpResponse.json<TodoResponse>({
      success: true,
      todo: deletedTodo,
      message: "Задача успешно удалена",
    });
  }),

  // Удалить все выполненные задачи
  http.delete("/api/todos/completed", async () => {
    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    const completedCount = todos.filter((todo) => todo.completed).length;
    todos = todos.filter((todo) => !todo.completed);

    return HttpResponse.json<TodosResponse>({
      success: true,
      todos: todos,
      message: `Удалено выполненных задач: ${completedCount}`,
    });
  }),
];
