import type { CreateMenuRequest, MenuListResponse, MenuItemResponse } from "../mocks/handlers/menu";

const API_BASE_URL = "/api";

// Получить все элементы меню
export async function getMenu(): Promise<MenuListResponse> {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

// Создать новый элемент меню
export async function createMenu(menuData: CreateMenuRequest): Promise<MenuItemResponse> {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuData),
  });
  const data = await response.json();
  return data;
}

// Удалить элемент меню
export async function deleteMenu(id: number): Promise<MenuItemResponse> {
  const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
