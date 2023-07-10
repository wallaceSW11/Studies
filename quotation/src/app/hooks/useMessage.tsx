import { useState } from "react";
import Modal from "../components/modal/Modal";
import { Alert, AlertColor, AlertTitle } from "@mui/material";

interface MessageProps {
  title: String,
  text: any,
  type?: AlertColor 
}

export default function useMessage() {
  const [visible, setVisible] = useState(false);

  const Message = ({title, text, type = "info"} : MessageProps) => {
    return (
      <Modal show={visible} onSave={() => setVisible(false)} hideSecondaryButton>
        <div>
          <Alert severity={type}>
            <AlertTitle>{title}</AlertTitle>
            {text}
          </Alert>
        </div>
      </Modal>
    )
  }

  return {
    Message: visible ? Message : null,
    show: () => setVisible(true),

  }
}