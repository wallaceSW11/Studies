import { Button } from "@mui/material";
import "./styles.css";
import { Login } from "@mui/icons-material";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="title">
        <span>Mo<b>vies</b></span>
      </div>
      <div className="action">
        <Button variant="contained" startIcon={<Login />}>Login </Button>
      </div>
    </div>
  )
}