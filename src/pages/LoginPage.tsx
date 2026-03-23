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
import { useForm } from "react-hook-form";

// This type defines exactly what data the login form collects
type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  // useNavigate lets us redirect the user programmatically
  const navigate = useNavigate();
  // useForm is the core hook — it gives us everything we need to manage the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  // This runs ONLY if all validations pass
  // data is automatically typed as LoginFormData — TypeScript knows exactly what's in it
  const onSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login data:", data);
    navigate({ to: "/dashboard" });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <Paper elevation={0} sx={{
        width: '100%',
        maxWidth: 420,
        p: 4,
        border: '1px solid',
        borderColor: 'grey.100',
        borderRadius: 3,
      }}>

        {/* Logo */}
        <Typography variant="h5" fontWeight={700} color="primary" sx={{ mb: 0.5 }}>
          RED<span style={{ color: '#DC3545' }}>LINE</span> AI
        </Typography>

        <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mt: 2 }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to your account to continue
        </Typography>

        {/* handleSubmit runs validation first, then calls onSubmit if all good */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

          {/* Email field */}
          {/* ...register('email', { rules }) connects this input to React Hook Form */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            // error prop turns the field red when there's an error
            error={!!errors.email}
            // helperText shows the error message below the field
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />

          {/* Password field */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            size="small"
            sx={{ mb: 3 }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          {/* isSubmitting is true while onSubmit is running — disables button to prevent double submit */}
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            size="large"
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          >
            {/* Button text changes while submitting */}
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

        </Box>

        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">OR</Typography>
        </Divider>

        <Typography variant="body2" textAlign="center" color="text.secondary">
          Don't have an account?{' '}
          {/* We'll wire this to /register next */}
          <Link
            onClick={() => navigate({ to: '/register' })}
            color="error"
            fontWeight={600}
            underline="hover"
            sx={{ cursor: 'pointer' }}
          >
            Create one
          </Link>
        </Typography>

      </Paper>
    </Box>
  )
}