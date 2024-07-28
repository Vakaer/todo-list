import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import api from '../api/api';
import { Todo } from '../types/types';

const todosList: Array<Todo> = [];

export const useTodos = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: todos, isLoading, error: fetchError } = useQuery('todos', async () => {
    const response = await api.get('/todos');
    return response.data;
  });

  const addTodoMutation = useMutation(
    async (newTodo: Omit<Todo, 'id'>) => {
      if (!newTodo.title || newTodo.title.trim() === '') {
        setErrorMessage('Todo title is required');
        return;
      }
      const response = await api.post('/todos', newTodo);
      todosList.push(response.data);
      setErrorMessage(null);
      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
    }
  );

  const updateTodoMutation = useMutation(
    async (updatedTodo: Todo) => {
      if (!updatedTodo.title || updatedTodo.title.trim() === '') {
        setErrorMessage('Todo title is required');
        return;
      }
      const response = await api.put(`/todos/${updatedTodo.id}`, updatedTodo);
      const index = todosList.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        todosList[index] = response.data;
      }
      setErrorMessage(null);
      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
    }
  );

  const deleteTodoMutation = useMutation(
    async (todoId: string) => {
      await api.delete(`/todos/${todoId}`);
      const index = todosList.findIndex(todo => todo.id === todoId);
      if (index !== -1) {
        todosList.splice(index, 1);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
    }
  );

  return {
    todos,
    isLoading,
    fetchError,
    errorMessage,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
