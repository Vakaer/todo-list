import { List, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTodoActions } from '../hooks/useTodoActions';
import { Todo } from '../types/types';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const {
    todos,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    editTodo,
    handleDelete,
    handleToggleComplete,
    setOpen
  } = useTodoActions();

  const handleTodoAction = (actionType: 'edit' | 'delete' | 'toggleComplete' | 'add', todo?: Todo) => {
    switch (actionType) {
      case 'edit':
        if (todo) editTodo(todo);
        break;
      case 'delete':
        if (todo) handleDelete(todo.id);
        break;
      case 'toggleComplete':
        if (todo) handleToggleComplete(todo);
        break;
      case 'add':
        setOpen(true)
        break;
      default:
        break;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <div style={{ position: 'relative' }}>
      <Typography variant="h2" color="initial" align="center">Todo List</Typography>
      <TextField label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth />
      {todos?.length === 0 ? (
        <Typography variant="h6" color="error" align="center">No todos found</Typography>
        ) : (
        <List>
          {todos?.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onEdit={() => handleTodoAction('edit', todo)}
            onDelete={() => handleTodoAction('delete', todo)}
            onToggleComplete={() => handleTodoAction('toggleComplete', todo)}
          />
        ))}
        </List>
      )}
    </div>
  );
};

export default TodoList;
