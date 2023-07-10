import { Button } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

interface NavBarProps {
  actionButton: () => void;
}

export default function NavBar({ actionButton } : NavBarProps) {
  return (
    <nav className="flex justify-between px-5 py-2">
        <div>
          <strong>QUOTA</strong>tion
        </div>

        <div className="flex flex-row">
          <Button variant="outlined" startIcon={<IconPlus />} onClick={actionButton}>Add quotation</Button>
        </div>
      </nav>
  )
}