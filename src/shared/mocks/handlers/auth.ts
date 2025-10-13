import { http, HttpResponse } from "msw";

// Типы для API авторизации
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
  message?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// Хендлеры для авторизации
export const authHandlers = [
  // Логин
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Проверка тестовых учетных данных
    if (body.username === "admin" && body.password === "admin123") {
      return HttpResponse.json<LoginResponse>({
        success: true,
        token: "mock-jwt-token-12345",
        user: {
          id: "1",
          username: "admin",
          email: "admin@example.com",
        },
      });
    }

    if (body.username === "user" && body.password === "user123") {
      return HttpResponse.json<LoginResponse>({
        success: true,
        token: "mock-jwt-token-67890",
        user: {
          id: "2",
          username: "user",
          email: "user@example.com",
        },
      });
    }

    // Неверные учетные данные
    return HttpResponse.json<LoginResponse>(
      {
        success: false,
        message: "Неверное имя пользователя или пароль",
      },
      { status: 401 },
    );
  }),

  // Регистрация
  http.post("/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as RegisterRequest;

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Проверка, что пользователь не существует
    if (body.username === "admin") {
      return HttpResponse.json<RegisterResponse>(
        {
          success: false,
          message: "Пользователь с таким именем уже существует",
        },
        { status: 409 },
      );
    }

    // Успешная регистрация
    return HttpResponse.json<RegisterResponse>({
      success: true,
      message: "Регистрация прошла успешно",
      user: {
        id: Math.random().toString(36).substr(2, 9),
        username: body.username,
        email: body.email,
      },
    });
  }),
];
