import { useState, useEffect, useCallback } from 'react';
import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos(prev => [...prev, newTodo]);
    }
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.map(todo => 
      todo.completed ? { ...todo, hidden: true } : todo
    ));
  }, []);

  const getFilteredTodos = useCallback((filter: 'all' | 'active' | 'completed') => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed && !todo.hidden);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos.filter(todo => !todo.hidden);
    }
  }, [todos]);

  const getActiveCount = useCallback(() => {
    return todos.filter(todo => !todo.completed && !todo.hidden).length;
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredTodos,
    getActiveCount
  };
};
