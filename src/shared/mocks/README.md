# MSW Mocks

Эта папка содержит моки для API запросов, используя библиотеку MSW (Mock Service Worker).

## Тестовые учетные данные для авторизации

### Успешный вход (Админ):

- **Username**: `admin`
- **Password**: `admin123`

### Успешный вход (Пользователь):

- **Username**: `user`
- **Password**: `user123`

### Неуспешный вход:

- Любые другие комбинации вернут ошибку 401

## Структура

- `handlers/` - папка с хендлерами для разных API эндпоинтов
  - `auth.ts` - хендлеры для авторизации и регистрации
  - `index.ts` - экспорт всех хендлеров
- `browser.ts` - настройка MSW worker для браузера

## Как работает

MSW перехватывает fetch/axios запросы и возвращает моковые данные без реального обращения к серверу.

MSW работает только в dev режиме и **не попадает в production build**.

## Добавление новых моков

1. Создайте новый файл в `handlers/`, например `users.ts`
2. Определите хендлеры используя `http.get()`, `http.post()` и т.д.
3. Экспортируйте хендлеры в `handlers/index.ts`

Пример:

```typescript
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
