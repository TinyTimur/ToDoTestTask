
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import './App.css';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getActiveCount
  } = useTodos();

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Todo List</h1>
          <p className="app-subtitle">Manage your tasks</p>
        </header>

        <main className="app-main">
          <TodoInput onAddTodo={addTodo} />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onClearCompleted={clearCompleted}
          />
        </main>

        <footer className="app-footer">
          <p>Total tasks: {todos.length} | Remaining: {getActiveCount()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
