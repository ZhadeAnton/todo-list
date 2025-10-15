# 📝 Задания для ученика - Microsoft Todo Clone

## 🎯 Общая цель

Разработать клон приложения Microsoft Todo с использованием React и TypeScript.

## 📚 Подготовка

### Шаг 0: Изучение оригинального приложения

1. Зарегистрируйся на https://to-do.office.com/tasks
2. Зайди на главную страницу приложения
3. Изучи, как работает интерфейс:
   - Как выглядит форма добавления новой задачи
   - Как отображаются элементы списка дел
   - Какие элементы управления есть у каждой задачи
   - Как отмечаются выполненные задачи
   - Как удаляются задачи

### Важно знать перед началом

В проекте уже настроены **моки (MSW)**, которые перехватывают API запросы и возвращают тестовые данные. Это означает, что тебе **не нужно писать backend** - всё уже готово!

📖 **Изучи документацию:**

- `MOCKS_GUIDE.md` - общее руководство по мокам
- `src/shared/mocks/TODO_API_GUIDE.md` - подробный гайд по Todo API
- `src/shared/api/useTodos.example.ts` - пример кастомного хука

---

## 📋 Задание 1: Компонент TodoItem

### Что нужно сделать

Создать компонент `TodoItem`, который отображает одну задачу из списка.

### Требования

1. **Расположение:** `src/features/TodoItem/` или `src/entities/TodoItem/`
2. **Структура задачи:**

   ```typescript
   interface Todo {
     id: string;
     text: string;
     completed: boolean;
     createdAt: string;
   }
   ```

3. **Компонент должен содержать:**
   - Чекбокс (или цветной квадрат-заготовка) для отметки выполнения
   - Текст задачи
   - Кнопку удаления (пока цветной квадрат)

4. **Props компонента:**

   ```typescript
   interface TodoItemProps {
     todo: Todo;
     onToggle?: (id: string) => void;
     onDelete?: (id: string) => void;
   }
   ```

5. **Стилизация:**
   - Используй `@emotion/styled`
   - Создай файл `styles.ts` рядом с компонентом
   - Посмотри на другие компоненты в проекте для примера

### Временные заглушки

**Иконки:** Пока используй цветные квадраты вместо иконок:

- Синий квадрат для чекбокса
- Красный квадрат для кнопки удаления

Позже заменим их на настоящие компоненты с логикой.

---

## 📋 Задание 2: Форма добавления задачи

### Что нужно сделать

На странице `HomePage` создать форму для добавления новых задач.

### Требования

1. **Форма должна содержать:**
   - Input для ввода текста задачи
   - Кнопку "Add" (Добавить)

2. **Состояние (state):**

   ```typescript
   const [inputValue, setInputValue] = useState("");
   const [todos, setTodos] = useState<Todo[]>([]);
   ```

3. **Обработчик отправки:**
   - При нажатии на кнопку добавлять задачу в массив
   - Очищать input после добавления
   - Использовать `createTodo` API функцию

4. **Пример:**

   ```typescript
   import { createTodo } from "@/shared/api/todos";

   const handleAdd = async () => {
     if (!inputValue.trim()) return;

     const response = await createTodo({ text: inputValue });
     if (response.success && response.todo) {
       setTodos([...todos, response.todo]);
       setInputValue("");
     }
   };
   ```

---

## 📋 Задание 3: Компонент TodoList

### Что нужно сделать

Создать компонент `TodoList`, который отображает список всех задач.

### Требования

1. **Расположение:** `src/widgets/TodoList/` или `src/features/TodoList/`

2. **Использование метода map:**
   - Прочитай статью ["Рендеринг списков"](https://ru.react.dev/learn#using-hooks)
   - Обрати внимание на пример с массивом `products`
   - У нас аналогично, только массив `todos`

3. **Props компонента:**

   ```typescript
   interface TodoListProps {
     todos: Todo[];
     onToggle?: (id: string) => void;
     onDelete?: (id: string) => void;
   }
   ```

4. **Рендеринг:**

   ```typescript
   {todos.map(todo => (
     <TodoItem
       key={todo.id}  // ⚠️ Обязательно!
       todo={todo}
       onToggle={onToggle}
       onDelete={onDelete}
     />
   ))}
   ```

5. **⚠️ Важно:** Не забудь про атрибут `key` при рендеринге списка!

### Структура компонентов

```
HomePage
  └── Форма (input + кнопка Add)
  └── TodoList
      └── TodoItem (элемент 1)
      └── TodoItem (элемент 2)
      └── TodoItem (элемент 3)
```

---

## 📋 Задание 4: Загрузка задач с сервера

### Что нужно сделать

При загрузке страницы получать задачи с сервера (из моков).

### Требования

1. **Использовать useEffect:**

   ```typescript
   import { getTodos } from "@/shared/api/todos";

   useEffect(() => {
     const fetchTodos = async () => {
       const response = await getTodos();
       if (response.success && response.todos) {
         setTodos(response.todos);
       }
     };
     fetchTodos();
   }, []); // Пустой массив зависимостей = запуск только при монтировании
   ```

2. **Состояние загрузки:**

   ```typescript
   const [loading, setLoading] = useState(false);

   // Показывать индикатор загрузки
   if (loading) return <Loader />;
   ```

---

## 📋 Задание 5: Переключение статуса задачи

### Что нужно сделать

Реализовать возможность отмечать задачи как выполненные/невыполненные.

### Требования

1. **API функция:**

   ```typescript
   import { updateTodo } from "@/shared/api/todos";

   const handleToggle = async (id: string) => {
     const todo = todos.find((t) => t.id === id);
     if (!todo) return;

     const response = await updateTodo(id, { completed: !todo.completed });
     if (response.success && response.todo) {
       setTodos(todos.map((t) => (t.id === id ? response.todo : t)));
     }
   };
   ```

2. **Визуальное отображение:**
   - Выполненные задачи должны отличаться визуально
   - Например: зачеркнутый текст, другой цвет, галочка в чекбоксе

---

## 📋 Задание 6: Удаление задачи

### Что нужно сделать

Реализовать возможность удалять задачи.

### Требования

1. **API функция:**

   ```typescript
   import { deleteTodo } from "@/shared/api/todos";

   const handleDelete = async (id: string) => {
     const response = await deleteTodo(id);
     if (response.success) {
       setTodos(todos.filter((t) => t.id !== id));
     }
   };
   ```

2. **UX:**
   - Можно добавить подтверждение перед удалением
   - Показывать анимацию при удалении (опционально)

---

## 🌟 Дополнительные задания (по желанию)

### 1. Счетчик активных задач

Показывать количество невыполненных задач:

```typescript
const activeTodosCount = todos.filter(todo => !todo.completed).length;

<div>Осталось задач: {activeTodosCount}</div>
```

### 2. Фильтрация задач

Добавить кнопки фильтрации: Все / Активные / Выполненные

```typescript
type Filter = "all" | "active" | "completed";
const [filter, setFilter] = useState<Filter>("all");

const filteredTodos = todos.filter((todo) => {
  if (filter === "active") return !todo.completed;
  if (filter === "completed") return todo.completed;
  return true;
});
```

### 3. Редактирование текста задачи

Двойной клик по задаче открывает режим редактирования:

```typescript
import { updateTodo } from "@/shared/api/todos";

const handleEdit = async (id: string, newText: string) => {
  const response = await updateTodo(id, { text: newText });
  if (response.success && response.todo) {
    setTodos(todos.map((t) => (t.id === id ? response.todo : t)));
  }
};
```

### 4. Удаление всех выполненных задач

Кнопка для удаления всех выполненных задач одним кликом:

```typescript
import { deleteCompletedTodos } from "@/shared/api/todos";

const handleClearCompleted = async () => {
  const response = await deleteCompletedTodos();
  if (response.success && response.todos) {
    setTodos(response.todos);
  }
};
```

### 5. Использование кастомного хука

Вынести всю логику работы с API в отдельный хук. Пример:

- Посмотри `src/shared/api/useTodos.example.ts`
- Создай свой хук `useTodos`
- Используй его в `HomePage`

### 6. Обработка ошибок

Добавить обработку ошибок и показывать сообщения пользователю:

```typescript
const [error, setError] = useState<string | null>(null);

try {
  const response = await createTodo({ text: inputValue });
  if (!response.success) {
    setError(response.message || "Ошибка создания задачи");
  }
} catch (err) {
  setError("Ошибка сети");
}
```

---

## 📚 Полезные ресурсы

### Документация проекта

- `MOCKS_GUIDE.md` - руководство по мокам
- `src/shared/mocks/TODO_API_GUIDE.md` - Todo API гайд
- `src/shared/api/useTodos.example.ts` - пример хука

### React документация

- [Рендеринг списков](https://ru.react.dev/learn#using-hooks)
- [Управление состоянием](https://ru.react.dev/learn/managing-state)
- [useEffect](https://ru.react.dev/reference/react/useEffect)
- [useState](https://ru.react.dev/reference/react/useState)

### В проекте используется

- **TypeScript** - для типизации
- **Emotion** - для стилизации (`styled` компоненты)
- **MSW** - для моков API
- **FSD** - архитектура проекта (Feature-Sliced Design)

---

## ✅ Чек-лист прогресса

- [ ] Задание 1: Компонент TodoItem создан
- [ ] Задание 2: Форма добавления задачи работает
- [ ] Задание 3: TodoList отображает список
- [ ] Задание 4: Задачи загружаются с сервера
- [ ] Задание 5: Можно переключать статус задачи
- [ ] Задание 6: Можно удалять задачи
- [ ] Дополнительно: Счетчик активных задач
- [ ] Дополнительно: Фильтрация задач
- [ ] Дополнительно: Редактирование текста
- [ ] Дополнительно: Удаление выполненных
- [ ] Дополнительно: Кастомный хук
- [ ] Дополнительно: Обработка ошибок

---

## 🎓 Советы

1. **Делай по порядку** - не перескакивай через задания
2. **Тестируй часто** - проверяй каждое изменение в браузере
3. **Смотри DevTools Console** - там видны логи MSW
4. **Изучай примеры** - смотри на другие компоненты в проекте
5. **Задавай вопросы** - если что-то непонятно

Удачи! 🚀
