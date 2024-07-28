import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types/types';

export const useTodoForm = (initialTodo?: Todo, onClose?: () => void) => {
  const [title, setTitle] = useState(initialTodo ? initialTodo.title : '');
  const [description, setDescription] = useState(initialTodo ? initialTodo.description : '');
  const [voiceNote, setVoiceNote] = useState<string | undefined>(initialTodo ? initialTodo.voiceNote : '');
  const { addTodoMutation, updateTodoMutation } = useTodos();

  const handleSave = () => {
    const newTodo = { title, description, completed: false, voiceNote };
    if (initialTodo) {
      updateTodoMutation.mutate({ ...initialTodo, title, description, voiceNote });
    } else {
      addTodoMutation.mutate(newTodo);
    }
    if (onClose) onClose();
  };

  return { title, setTitle, description, setDescription, voiceNote, setVoiceNote, handleSave };
};
