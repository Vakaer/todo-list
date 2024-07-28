import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface NotificationProps {
  message: string;
  autoHideDuration?: number;
  open: boolean;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void    
}

export default function Notification({
  message,
  autoHideDuration = 6000,
	handleClose,
	open,
}: NotificationProps) {

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}