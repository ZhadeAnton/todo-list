import { http, HttpResponse } from "msw";

// Типы для Menu API
export interface MenuItem {
  id: number;
  name: string;
}

export interface CreateMenuRequest {
  name: string;
}

export interface MenuListResponse {
  success: boolean;
  menu?: MenuItem[];
  message?: string;
}

export interface MenuItemResponse {
  success: boolean;
  menuItem?: MenuItem;
  message?: string;
}

// In-memory хранилище меню (сбросится при перезагрузке страницы)
let menuItems: MenuItem[] = [
  {
    id: 1,
    name: "мой день",
  },
  {
    id: 2,
    name: "Важно",
  },
  {
    id: 3,
    name: "Планирую",
  },
];

// Счетчик для генерации ID
let nextId = 4;

// Хендлеры для Menu API
export const menuHandlers = [
  // Получить все элементы меню
  http.get("/api/menu", async () => {
    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json<MenuListResponse>({
      success: true,
      menu: menuItems,
    });
  }),

  // Создать новый элемент меню
  http.post("/api/menu", async ({ request }) => {
    const body = (await request.json()) as CreateMenuRequest;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Валидация
    if (!body.name || body.name.trim() === "") {
      return HttpResponse.json<MenuItemResponse>(
        {
          success: false,
          message: "Название меню не может быть пустым",
        },
        { status: 400 },
      );
    }

    // Создаем новый элемент
    const newMenuItem: MenuItem = {
      id: nextId++,
      name: body.name.trim(),
    };

    menuItems.push(newMenuItem);

    return HttpResponse.json<MenuItemResponse>({
      success: true,
      menuItem: newMenuItem,
      message: "Элемент меню успешно создан",
    });
  }),

  // Удалить элемент меню
  http.delete("/api/menu/:id", async ({ params }) => {
    const { id } = params;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Находим индекс элемента
    const menuIndex = menuItems.findIndex((item) => item.id === Number(id));

    if (menuIndex === -1) {
      return HttpResponse.json<MenuItemResponse>(
        {
          success: false,
          message: "Элемент меню не найден",
        },
        { status: 404 },
      );
    }

    // Удаляем элемент
    const deletedMenuItem = menuItems[menuIndex];
    menuItems.splice(menuIndex, 1);

    return HttpResponse.json<MenuItemResponse>({
      success: true,
      menuItem: deletedMenuItem,
      message: "Элемент меню успешно удален",
    });
  }),
];
