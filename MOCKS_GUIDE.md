# 🎭 Руководство по использованию MSW Моков

## 🚀 Быстрый старт

MSW (Mock Service Worker) уже настроен и работает в dev режиме. Моки **автоматически перехватывают** fetch запросы без реального обращения к серверу.

## 🔐 Тестирование Авторизации

### Успешная авторизация

Используйте эти учетные данные для успешного входа:

**Вариант 1 - Админ:**

- Username: `admin`
- Password: `admin123`

**Вариант 2 - Пользователь:**

- Username: `user`
- Password: `user123`

### Ошибка авторизации

Введите **любые другие** комбинации username/password:

- Вернется ошибка 401 с сообщением "Неверное имя пользователя или пароль"

## 📝 Тестирование Регистрации

### Успешная регистрация

Используйте **любое** имя пользователя (кроме `admin`):

- Username: `newuser` ✅
- Email: `newuser@example.com` ✅
- Password: `password123` ✅ (минимум 6 символов)

### Ошибка регистрации

**Сценарий 1 - Пользователь существует:**

- Username: `admin` ❌
- Вернется ошибка 409 с сообщением "Пользователь с таким именем уже существует"

**Сценарий 2 - Валидация:**

- Пароли не совпадают ❌
- Пароль < 6 символов ❌

## ✅ Тестирование Todo списка

### Доступные операции

MSW настроен для работы с Todo API. По умолчанию загружены **3 тестовые задачи**.

**Получить все задачи:**

```typescript
import { getTodos } from "@/shared/api/todos";
const response = await getTodos(); // response.todos - массив задач
```

**Создать задачу:**

```typescript
import { createTodo } from "@/shared/api/todos";
const response = await createTodo({ text: "Купить молоко" });
```

**Обновить задачу:**

```typescript
import { updateTodo } from "@/shared/api/todos";
const response = await updateTodo("1", { completed: true });
```

**Удалить задачу:**

```typescript
import { deleteTodo } from "@/shared/api/todos";
const response = await deleteTodo("1");
```

📚 **Подробный гайд:** `src/shared/mocks/TODO_API_GUIDE.md`

## 🛠️ Структура моков

```
src/shared/
├── mocks/
│   ├── handlers/
│   │   ├── auth.ts       # Хендлеры авторизации и регистрации
│   │   ├── todos.ts      # Хендлеры для Todo списка
│   │   └── index.ts      # Экспорт всех хендлеров
│   ├── browser.ts        # Настройка MSW worker
│   ├── README.md         # Подробная документация
│   └── TODO_API_GUIDE.md # Гайд по работе с Todo API
└── api/
    ├── auth.ts           # API функции (login, register)
    ├── todos.ts          # API функции для Todo
    └── useTodos.example.ts # Пример кастомного хука
```

## 📋 Что происходит под капотом

1. **MSW запускается** при старте dev сервера (`src/main.tsx`)
2. **Service Worker** перехватывает fetch запросы к `/api/*`
3. **Моки возвращают** заранее определенные ответы
4. **Симуляция задержки** 800-1000ms для реалистичности
5. **Production build** НЕ включает MSW (работает только в dev)

## 🔍 Отладка

Откройте **DevTools Console** и увидите:

```
[MSW] Mocking enabled.
[MSW] POST /api/auth/login → 200 OK
```

## ➕ Добавление новых моков

### Шаг 1: Создайте хендлер

```typescript
// src/shared/mocks/handlers/users.ts
import { http, HttpResponse } from "msw";

export const userHandlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ]);
  }),
];
```

### Шаг 2: Экспортируйте

```typescript
// src/shared/mocks/handlers/index.ts
import { authHandlers } from "./auth";
import { userHandlers } from "./users";

export const handlers = [...authHandlers, ...userHandlers];
```

### Шаг 3: Создайте API функцию

```typescript
// src/shared/api/users.ts
export async function getUsers() {
  const response = await fetch("/api/users");
  return response.json();
}
```

## ✅ Преимущества

- ✅ **Нет backend** - разработка frontend независимо
- ✅ **Реалистичные задержки** - тестирование loading состояний
- ✅ **Различные сценарии** - успешные и ошибочные запросы
- ✅ **Не попадает в build** - работает только в dev режиме
- ✅ **FSD совместимо** - структура следует Feature-Sliced Design

## 🎯 Следующие шаги

1. Откройте приложение в браузере
2. Перейдите на страницу авторизации
3. Попробуйте разные сценарии
4. Смотрите логи в консоли DevTools

Готово к тестированию! 🚀
