import React from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-item__checkbox"
      />
      <span className="todo-item__text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-item__delete"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
};
