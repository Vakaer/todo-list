import React from 'react';
import { useTodoForm } from '../hooks/useTodoForm';
import { Todo } from '../types/types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface TodoFormProps {
  todo?: Todo;
  onClose: () => void;
  open: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onClose, open }) => {
  const { title, setTitle, description, setDescription, handleSave} = useTodoForm(todo, onClose);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSave();
        },
      }}
    >
      <DialogTitle>Todo Form</DialogTitle>
      <DialogContent>
        <TextField margin='normal' autoFocus required label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} >Cancel</Button>
        <Button  type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoForm;
