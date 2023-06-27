import { ReactComponentElement } from 'react';
import './styles.css';

interface ModalProps {
  show: Boolean,
  onClose: any,
  title: String,
  children: ReactComponentElement<any>,
  onSave: any
}

export default function Modal({show, onClose, title, children, onSave}: ModalProps) {
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
          <button className="button" onClick={onSave}>OK</button>
          <button className="button secondary ml-2" onClick={onClose}>Cancel</button>
        </div>
      </div>
      
    </div>
  )
}