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
const DELETE_TODO_URL = `${API_BASE_URL}/todos/:id`;
const DELETE_COMPLETED_TODOS_URL = `${API_BASE_URL}/todos/completed`;

// Получить все задачи
export async function getTodos(): Promise<TodosResponse> {
 
}

// Создать новую задачу
export async function createTodo(todoData: CreateTodoRequest): Promise<TodoResponse> {
  
}

// Обновить задачу
export async function updateTodo(id: string, updates: UpdateTodoRequest): Promise<TodoResponse> {
 
}

// Удалить задачу
export async function deleteTodo(id: string): Promise<TodoResponse> {
  
}

// Удалить все выполненные задачи
export async function deleteCompletedTodos(): Promise<TodosResponse> {
  
}

// Переключить статус задачи (completed/incomplete)
export async function toggleTodo(id: string, completed: boolean): Promise<TodoResponse> {
  return updateTodo(id, { completed });
}
