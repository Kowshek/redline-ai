import { Typography, Button, Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" color="primary">
        REDLINE AI
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Stress-test your business idea before the market does.
      </Typography>
      <Button variant="contained" color="error" sx={{ mt: 3 }}>
        Launch Red Team
      </Button>
      <Outlet />
    </Box>
  );
}

export default App;
