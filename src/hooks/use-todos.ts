import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem, FilterStatus, Category, Priority } from '@/types/todo';

const STORAGE_KEY = '@app_todos_v1';

const INITIAL_TODOS: TodoItem[] = [
  {
    id: '1',
    title: 'Complete Mobile App Development Quiz 3',
    category: 'Study',
    priority: 'high',
    completed: true,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: '2',
    title: 'Review Expo Router and React Native components',
    category: 'Study',
    priority: 'medium',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '3',
    title: 'Implement Task List persistence with AsyncStorage',
    category: 'Work',
    priority: 'high',
    completed: false,
    createdAt: Date.now() - 1800000,
  },
  {
    id: '4',
    title: 'Prepare project presentation and documentation',
    category: 'Personal',
    priority: 'low',
    completed: false,
    createdAt: Date.now() - 900000,
  },
];

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load stored tasks on mount
  useEffect(() => {
    async function loadTodos() {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const parsed = JSON.parse(jsonValue);
          setTodos(parsed);
        } else {
          setTodos(INITIAL_TODOS);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TODOS));
        }
      } catch (e) {
        console.error('Failed to load todos from storage:', e);
        setTodos(INITIAL_TODOS);
      } finally {
        setIsLoading(false);
      }
    }
    loadTodos();
  }, []);

  // Save tasks on change
  const saveTodos = useCallback(async (newTodos: TodoItem[]) => {
    setTodos(newTodos);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    } catch (e) {
      console.error('Failed to save todos:', e);
    }
  }, []);

  const addTodo = useCallback(
    (title: string, category: Category = 'Study', priority: Priority = 'medium') => {
      if (!title.trim()) return;
      const newItem: TodoItem = {
        id: Date.now().toString(),
        title: title.trim(),
        category,
        priority,
        completed: false,
        createdAt: Date.now(),
      };
      saveTodos([newItem, ...todos]);
    },
    [todos, saveTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const updated = todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      const updated = todos.filter((item) => item.id !== id);
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  const clearCompleted = useCallback(() => {
    const updated = todos.filter((item) => !item.completed);
    saveTodos(updated);
  }, [todos, saveTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'active'
          ? !todo.completed
          : todo.completed;

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ? true : todo.category === selectedCategory;

      return matchesFilter && matchesSearch && matchesCategory;
    });
  }, [todos, filter, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, percentage };
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodosCount: todos.length,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  };
}
