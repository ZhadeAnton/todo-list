import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodosResponse,
  TodoResponse,
} from "../mocks/handlers/todos";

const API_BASE_URL = "/api";
const GET_TODOS_URL = `${API_BASE_URL}/todos`;
const CREATE_TODO_URL = `${API_BASE_URL}/todos`;
const UPDATE_TODO_URL = `${API_BASE_URL}/todos/:id`;
const DELETE_TODO_URL = `${API_BASE_URL}/todos/`;
const DELETE_COMPLETED_TODOS_URL = `${API_BASE_URL}/todos/completed`;

// Получить все задачи
export async function getTodos(): Promise<TodosResponse> {
  const response = await fetch(`${GET_TODOS_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const data = await response.json();
  return data;
}

// Создать новую задачу
export async function createTodo(todoData: CreateTodoRequest): Promise<TodoResponse> {
  const response = await fetch(`${CREATE_TODO_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });
  const data = await response.json();
  return data;
}

// Обновить задачу
export async function updateTodo(id: string, updates: UpdateTodoRequest): Promise<TodoResponse> {
  const response = await fetch(`${UPDATE_TODO_URL}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  return data;
}

// Удалить задачу
export async function deleteTodo(id: string): Promise<TodoResponse> {
  const response = await fetch(`${DELETE_TODO_URL}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
}

// Удалить все выполненные задачи
export async function deleteCompletedTodos(): Promise<TodosResponse> {
  const response = await fetch(`${DELETE_COMPLETED_TODOS_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

// Переключить статус задачи (completed/incomplete)
export async function toggleTodo(id: string, completed: boolean): Promise<TodoResponse> {
  const response = await fetch(`${UPDATE_TODO_URL.replace(':id', id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  const data = await response.json();
  return data;
}

export async function toggleTodoImportant(id: string, important: boolean): Promise<TodoResponse> {
  const response = await fetch(`${UPDATE_TODO_URL.replace(':id', id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ important }),
  });
  const data = await response.json();
  return data;
}