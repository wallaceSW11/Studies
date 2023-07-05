import { Alert, AlertColor, AlertTitle } from "@mui/material";
import Modal from "./modal/Modal";

interface MessageProps {
  show: boolean,
  onClose: any,
  title: String,
  text: any,
  type?: AlertColor 
}

export default function Message({show, onClose, title, text, type = "info"} : MessageProps) {
  
  return (
    <Modal show={show} onSave={onClose} hideSecondaryButton>
      <div>
      <Alert severity={type}>
          <AlertTitle>{title}</AlertTitle>
          {text}
        </Alert>
      </div>
    </Modal>
  )
}