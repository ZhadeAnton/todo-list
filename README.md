# 📝 Microsoft Todo Clone - Учебный проект

Клон приложения Microsoft Todo, разработанный для обучения React, TypeScript и работе с API.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Билд для production
npm run build
```

## 📚 Документация

### Для ученика

- **[STUDENT_TASKS.md](STUDENT_TASKS.md)** - Пошаговые задания для выполнения
- **[MOCKS_GUIDE.md](MOCKS_GUIDE.md)** - Руководство по использованию моков
- **[src/shared/mocks/TODO_API_GUIDE.md](src/shared/mocks/TODO_API_GUIDE.md)** - Подробный гайд по Todo API

### Для преподавателя

- **[TEACHER_README.md](TEACHER_README.md)** - Инструкция по проведению занятия

## 🛠️ Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Vite** - сборщик и dev server
- **Emotion** - CSS-in-JS стилизация
- **MSW** - моки API запросов
- **BiomeJS** - линтер и форматтер

## 📁 Структура проекта

```
src/
├── app/              # Настройки приложения, providers
├── pages/            # Страницы приложения
├── widgets/          # Крупные компоненты (виджеты)
├── features/         # Фичи (будущие компоненты)
├── entities/         # Сущности (будущие компоненты)
└── shared/           # Общие компоненты, утилиты, API
    ├── api/          # API функции
    ├── mocks/        # MSW моки
    └── ui/           # UI компоненты
```

Проект следует архитектуре **FSD (Feature-Sliced Design)**.

## 🎯 Цель проекта

Разработать функциональный клон Microsoft Todo с возможностями:

- ✅ Добавление задач
- ✅ Переключение статуса (completed)
- ✅ Удаление задач
- ✅ Редактирование текста
- ✅ Фильтрация задач
- ✅ Счетчик активных задач

## 🎭 Моки (MSW)

Проект использует **Mock Service Worker** для имитации backend API. Это позволяет разрабатывать frontend без реального сервера.

**Что перехватывается:**

- `GET /api/todos` - получить все задачи
- `POST /api/todos` - создать задачу
- `PATCH /api/todos/:id` - обновить задачу
- `DELETE /api/todos/:id` - удалить задачу

Моки работают только в **dev режиме** и не попадают в production build.

## 🔧 Доступные команды

```bash
npm run dev          # Запуск dev сервера
npm run build        # Production билд
npm run preview      # Предпросмотр production билда
npm run lint         # Проверка кода (Biome)
npm run format       # Форматирование кода (Biome)
```

## 📖 Дополнительно

### React документация

- [Рендеринг списков](https://ru.react.dev/learn#using-hooks)
- [Управление состоянием](https://ru.react.dev/learn/managing-state)
- [Хуки](https://ru.react.dev/reference/react)

### MSW документация

- [MSW Quick Start](https://mswjs.io/docs/getting-started)
- [Request Handlers](https://mswjs.io/docs/concepts/request-handler)

---
