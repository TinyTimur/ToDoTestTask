import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoInput } from '../TodoInput';
import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList';
import type { Todo } from '../../types/todo';

describe('Todo App Basic Tests', () => {
  it('should render TodoInput with input field and button', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('should add todo when button is clicked', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);
    
    expect(mockAddTodo).toHaveBeenCalledWith('Test todo');
  });

  it('should add todo when Enter key is pressed', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockAddTodo).toHaveBeenCalledWith('Test todo');
  });

  it('should render TodoItem with checkbox, text, and delete button', () => {
    const mockTodo: Todo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: new Date()
    };
    
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete task')).toBeInTheDocument();
  });

  it('should toggle todo when checkbox is clicked', () => {
    const mockTodo: Todo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: new Date()
    };
    
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockToggle).toHaveBeenCalledWith('1');
  });

  it('should delete todo when delete button is clicked', () => {
    const mockTodo: Todo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: new Date()
    };
    
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const deleteButton = screen.getByLabelText('Delete task');
    fireEvent.click(deleteButton);
    
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('should render TodoList with filter buttons', () => {
    const mockTodos: Todo[] = [];
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onClearCompleted={mockClearCompleted}
      />
    );
    
    expect(screen.getByText('All (0)')).toBeInTheDocument();
    expect(screen.getByText('Active (0)')).toBeInTheDocument();
    expect(screen.getByText('Completed (0)')).toBeInTheDocument();
  });

  it('should show "No tasks" when no todos exist', () => {
    const mockTodos: Todo[] = [];
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onClearCompleted={mockClearCompleted}
      />
    );
    
    expect(screen.getByText('No tasks')).toBeInTheDocument();
  });

  it('should display todo count correctly', () => {
    const mockTodos: Todo[] = [
      { id: '1', text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: '2', text: 'Todo 2', completed: true, createdAt: new Date() }
    ];
    
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onClearCompleted={mockClearCompleted}
      />
    );
    
    expect(screen.getByText('All (2)')).toBeInTheDocument();
    expect(screen.getByText('Active (1)')).toBeInTheDocument();
    expect(screen.getByText('Completed (1)')).toBeInTheDocument();
    expect(screen.getByText('Remaining tasks: 1')).toBeInTheDocument();
  });
});
