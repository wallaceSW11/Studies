import { ReactComponentElement } from 'react';
import './styles.css';
import { Button } from '@mui/material';

interface ModalProps {
  show: Boolean,
  onClose: any,
  title: String,
  children: ReactComponentElement<any>,
  onSave: any
}

export default function ModalCopy({show, onClose, title, children, onSave}: ModalProps) {
  if (!show) return null;

  function handleSave() {
    // if its ok, add and close;
    onSave();
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span>{title}</span>
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-footer">
          <Button variant="contained"onClick={onSave}>OK</Button>
          <Button variant="outlined" className="ml-2" onClick={onClose}>Cancel</Button>
        </div>
      </div>
      
    </div>
  )
}