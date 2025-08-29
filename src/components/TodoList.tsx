import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import type { Todo, TodoFilter } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onClearCompleted 
}) => {
  const [filter, setFilter] = useState<TodoFilter>('all');

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed && !todo.hidden);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos.filter(todo => !todo.hidden);
    }
  };

  const activeCount = todos.filter(todo => !todo.completed && !todo.hidden).length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const visibleCompletedCount = todos.filter(todo => todo.completed && !todo.hidden).length;
  const visibleTodosCount = todos.filter(todo => !todo.hidden).length;

  const filteredTodos = getFilteredTodos();

  return (
    <div className="todo-list">
      <div className="todo-filters">
        <button
          className={`filter-button ${filter === 'all' ? 'filter-button--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({visibleTodosCount})
        </button>
        <button
          className={`filter-button ${filter === 'active' ? 'filter-button--active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({activeCount})
        </button>
        <button
          className={`filter-button ${filter === 'completed' ? 'filter-button--active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      <div className="todo-items">
        {filteredTodos.length === 0 ? (
          <div className="todo-empty">
            {filter === 'all' && 'No tasks'}
            {filter === 'active' && 'No active tasks'}
            {filter === 'completed' && 'No completed tasks'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {visibleCompletedCount > 0 && (
        <div className="todo-actions">
          <button
            onClick={onClearCompleted}
            className="clear-completed-button"
          >
            Hide completed ({visibleCompletedCount})
          </button>
        </div>
      )}

      <div className="todo-stats">
        <span>Remaining tasks: {activeCount}</span>
      </div>
    </div>
  );
};
