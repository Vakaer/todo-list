import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CardMedia, Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { Todo } from '../types/types';

interface TodoItemProps {
  todo: Todo;
  onEdit: () => void;
	onDelete: () => void;
  onToggleComplete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onToggleComplete }) => {

  return (
    <ListItem alignItems={'flex-start'} sx={{flexDirection:'column', width:'100%'}} >
			<Box display={'flex'} alignItems={'center'} width={'100%'}>
				<Checkbox checked={todo.completed} onChange={onToggleComplete} />
				<ListItemText
					primary={todo.title}
					secondary={todo.description}
				/>
				<Box>
					<IconButton onClick={onEdit}>
						<EditIcon />
					</IconButton>
					<IconButton onClick={onDelete}>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Box>
			{todo.voiceNote && (
				<CardMedia
					component="audio"
					controls
					src={todo.voiceNote}
					style={{ width: '100%' }}
				/>
			)}
    </ListItem>
  );
};

export default TodoItem;
