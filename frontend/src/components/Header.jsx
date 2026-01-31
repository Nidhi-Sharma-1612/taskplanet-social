import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">TaskPlanet Social</Typography>

        {user && (
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
