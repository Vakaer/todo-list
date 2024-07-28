import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types/types';

export const useTodoActions = () => {
  const { todos, isLoading, deleteTodoMutation, updateTodoMutation, addTodoMutation } = useTodos();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredTodos = Array.isArray(todos) ? todos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleDelete = (todoId: string) => {
    deleteTodoMutation.mutate(todoId);
  };

  const handleToggleComplete = (todo: Todo) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const editTodo = (todo: Todo) => {
    setOpen(true);
    setEditingTodo(todo);
  };

  const closeTodo = () => {
    setEditingTodo(undefined);
    setOpen(false);
  };

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    if (!todo.title.trim()) {
      setError('Title is required');
      return;
    }
    setError(null);
    addTodoMutation.mutate(todo);
    setOpen(false)
  };

  return {
    todos: filteredTodos,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    editingTodo,
    open,
    editTodo,
    closeTodo,
    handleDelete,
    handleToggleComplete,
    setEditingTodo,
    setOpen,
    addTodo
  };
};
