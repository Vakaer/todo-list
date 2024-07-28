import { Box, Button, CardMedia, Tooltip, Typography } from '@mui/material';
import React from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopIcon from '@mui/icons-material/Stop';
interface AudioRecorderProps {
  voiceNote?: string | null;
  audioURL?: string | null; 
  isRecording: boolean;
  stopRecording: () => Promise<void>;
  startRecording: () => Promise<void>;
  elapsedTime: string
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ voiceNote, isRecording , stopRecording, startRecording, audioURL, elapsedTime}) => {
  
  return (
    <Box width='100%' display={'flex'}>
      <Button sx={{display: 'flex'}} onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? (
            <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
              <Tooltip title="Stop Recording">
                <StopIcon sx={{ fontSize: '2rem', color: 'red' }} /> 
              </Tooltip>
              <Typography>{elapsedTime}</Typography>
            </Box>
          ) : (
            <Tooltip title="Start Recording">
              <RadioButtonCheckedIcon sx={{ fontSize: '2rem', color: 'green' }} />
            </Tooltip>
          )}
        </Button>
    {voiceNote ? (
      <CardMedia component="audio" controls src={voiceNote} />
    ) : (
      audioURL && <CardMedia component="audio" controls src={audioURL} />
    )}
    </Box>
  );
};

export default AudioRecorder;