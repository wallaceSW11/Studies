import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

interface ModalProps {
  show: boolean,
  onClose?: any,
  title?: string,
  children: ReactNode,
  onSave: any,
  hideSecondaryButton?: boolean
}

export default function Modal({show, onClose, title, children, onSave, hideSecondaryButton = false}: ModalProps) {
  if (!show) return null;

  return (
    <div>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="flex justify-center">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSave} variant="outlined">OK</Button>
          {!hideSecondaryButton && <Button onClick={onClose}>Cancel</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
