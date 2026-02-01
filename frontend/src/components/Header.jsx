import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
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
        {/* Left: App icon + title */}
        <Box display="flex" alignItems="center" gap={1}>
          <PublicIcon />
          <Typography variant="h6">TaskPlanet Social</Typography>
        </Box>

        {/* Right: Logout */}
        {user && (
          <IconButton color="inherit" onClick={logoutHandler}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
