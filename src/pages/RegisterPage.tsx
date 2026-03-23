import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

// Register needs one extra field — display name
// and we need to confirm the password matches
type RegisterFormData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  // watch('password') reads the current value of password field in real time
  // We need this to compare it with confirmPassword
  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API call — real auth comes when backend is ready
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Register data:", data);
    navigate({ to: "/dashboard" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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

        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          sx={{ mt: 2 }}
        >
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Start stress-testing your ideas today
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Display name */}
          <TextField
            label="Full Name"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            {...register("displayName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {/* Confirm password */}
          {/* validate: custom validation function — checks if value matches password field */}
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 3 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            size="large"
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Typography variant="body2" textAlign="center" color="text.secondary">
          Already have an account?{" "}
          <Link
            onClick={() => navigate({ to: "/login" })}
            color="error"
            fontWeight={600}
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
