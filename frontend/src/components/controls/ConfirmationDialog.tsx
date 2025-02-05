import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';

interface ConfirmationBoxProps {
  open: boolean;
  title?: string | null;
  content: React.ReactNode;
  handleClose?: () => void;
  confirmTitle: string;
  handleConfirm: () => void;
  zIndex?: number;
}

const ConfirmationDialog: React.FC<ConfirmationBoxProps> = ({
  open,
  title = null,
  content,
  handleClose,
  confirmTitle,
  handleConfirm,
  zIndex,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ zIndex: zIndex }}
    >
      <DialogTitle
        fontWeight={600}
        sx={{ display: 'flex', justifyContent: 'center' }}
        id="alert-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Stack
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ mb: 1, mr: 1, ml: 1 }}>
        {handleClose && (
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
            sx={{ textTransform: 'capitalize', fontWeight: 600 }}
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            pl: 3,
            pr: 3,
            bgcolor: '#b0e0e6',
            ':hover': { bgcolor: '#b0e0e6' },
            color: 'black',
            textTransform: 'capitalize',
            fontWeight: 600,
          }}
          autoFocus
        >
          {confirmTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
