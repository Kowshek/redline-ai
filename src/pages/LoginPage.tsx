import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export default function LoginPage() {
  // useNavigate lets us redirect the user programmatically
  const navigate = useNavigate();

  return (
    // Full screen centered layout
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Login card */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          border: "1px solid",
          borderColor: "grey.100",
          borderRadius: 3,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary"
          sx={{ mb: 0.5 }}
        >
          RED<span style={{ color: "#DC3545" }}>LINE</span> AI
        </Typography>

        {/* Heading */}
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          sx={{ mt: 2 }}
        >
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to your account to continue
        </Typography>

        {/* Email field — just visual for now, logic comes tomorrow */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Password field */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          sx={{ mb: 3 }}
        />

        {/* Submit button — navigates to dashboard for now */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          size="large"
          onClick={() => navigate({ to: "/dashboard" })}
          sx={{ mb: 2 }}
        >
          Sign In
        </Button>

        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* Link to register page — we'll build that tomorrow */}
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Don't have an account?{" "}
          <Link href="#" color="error" fontWeight={600} underline="hover">
            Create one
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
