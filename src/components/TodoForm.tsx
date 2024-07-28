import React from 'react';
import { useTodoForm } from '../hooks/useTodoForm';
import { Todo } from '../types/types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AudioRecorder from './common/AudioRecorder';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface TodoFormProps {
  todo?: Todo;
  onClose: () => void;
  open: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onClose, open }) => {
  const { title, setTitle, description, setDescription,voiceNote, setVoiceNote, handleSave} = useTodoForm(todo, onClose);
	const handleAudioRecorded = async(blob: Blob) => {
    if(blob){
      const voiceNote = await (URL.createObjectURL(blob))
      setVoiceNote(voiceNote)
    }
  };
	const { audioURL, isRecording, startRecording, stopRecording, elapsedTime} = useAudioRecorder(handleAudioRecorded);
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
				<AudioRecorder 
          isRecording={isRecording} 
          startRecording={startRecording}
          stopRecording={stopRecording}
          audioURL={audioURL}
          voiceNote={voiceNote}
          elapsedTime={elapsedTime}
        />
      </DialogContent>
      <DialogActions>
			<Button onClick={onClose} disabled={isRecording}>Cancel</Button>
        <Button  type="submit" disabled={isRecording}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoForm;
