import { List, TextField, Typography, Fab } from '@mui/material';
import React, { useState } from 'react';
import { useTodoActions } from '../hooks/useTodoActions';
import { Todo } from '../types/types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import Notification from './common/Notification';

import AddIcon from '@mui/icons-material/Add';

const TodoList: React.FC = () => {
  const {
    todos,
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
    setOpen
  } = useTodoActions();

	const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');


	const showSnackbar = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    showNotification(false);
  };

  const handleTodoAction = (actionType: 'edit' | 'delete' | 'toggleComplete' | 'add', todo?: Todo) => {
    switch (actionType) {
      case 'edit':
        if (todo) editTodo(todo);
        showSnackbar('Todo updated');
        break;
      case 'delete':
        if (todo) handleDelete(todo.id);
        showSnackbar('Todo deleted');
        break;
      case 'toggleComplete':
        if (todo) handleToggleComplete(todo);
        showSnackbar('Todo Completed');
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
			{(editingTodo ||  open) &&(
        <TodoForm todo={editingTodo} onClose={closeTodo} open={open} />
      )}
			<Fab color="primary" onClick={() => handleTodoAction('add')} sx={{
        position: 'absolute',
        right: '0',
        marginTop: '4rem'
      }}>
        <AddIcon />
      </Fab>
			<Notification
        message={notificationMessage}
        autoHideDuration={6000}
        open={showNotification}
        handleClose={handleCloseNotification}
      />
    </div>
  );
};

export default TodoList;
