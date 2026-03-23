import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

type NewSessionFormData = {
  title: string;
  ideaText: string;
};

// The 4 agents shown as a preview so user knows who's about to attack them
const agents = [
  { label: "The Competitor", color: "#1E3A5F" },
  { label: "The Skeptic", color: "#1E3A5F" },
  { label: "The Customer", color: "#1E3A5F" },
  { label: "The Saboteur", color: "#DC3545" },
];

export default function NewSessionPage() {
  const navigate = useNavigate();

  // Tracks whether we're in the "checking idea strength" loading state
  const [isChecking, setIsChecking] = useState(false);

  // Tracks feedback from the Idea Strength Gate
  // null = not checked yet, 'strong' = good to go, 'weak' = needs more detail
  const [ideaFeedback, setIdeaFeedback] = useState<null | "strong" | "weak">(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewSessionFormData>();

  // Watch the ideaText field so we can show character count live
  const ideaText = watch("ideaText", "");

  // Simulates the Idea Strength Gate AI check
  // Later this will be a real API call to our FastAPI backend
  const checkIdeaStrength = async () => {
    if (!ideaText || ideaText.length < 20) return;

    setIsChecking(true);
    setIdeaFeedback(null);

    // Simulate API delay — replace with real call later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple mock logic — if idea is long enough, it's "strong"
    setIdeaFeedback(ideaText.length > 100 ? "strong" : "weak");
    setIsChecking(false);
  };

  const onSubmit = async (data: NewSessionFormData) => {
    // Don't proceed if idea hasn't been checked or is weak
    if (ideaFeedback !== "strong") return;

    // Later: create session via API, get back session ID, navigate to attack page
    console.log("Launching red team for:", data);
    navigate({ to: "/dashboard" });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navbar */}
      <Box
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "grey.100",
        }}
      >
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          color="primary"
          size="small"
          onClick={() => navigate({ to: "/dashboard" })}
          sx={{ textTransform: "none" }}
        >
          Dashboard
        </Button>
        <Typography variant="h6" fontWeight={700} color="primary">
          RED<span style={{ color: "#DC3545" }}>LINE</span> AI
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Page header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            sx={{ mb: 1 }}
          >
            Brief the Room
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Describe your business idea in detail. The more specific you are,
            the sharper the attacks.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: "1px solid",
              borderColor: "grey.100",
              borderRadius: 3,
              mb: 3,
            }}
          >
            {/* Session title */}
            <TextField
              label="Session Title"
              placeholder="e.g. AI Tutoring Platform"
              fullWidth
              size="small"
              sx={{ mb: 3 }}
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title", {
                required: "Give your session a title",
              })}
            />

            {/* Idea description */}
            <TextField
              label="Describe your business idea"
              placeholder="What is it? Who is it for? How does it make money? What problem does it solve?"
              fullWidth
              multiline
              rows={6}
              sx={{ mb: 1 }}
              error={!!errors.ideaText}
              helperText={errors.ideaText?.message}
              {...register("ideaText", {
                required: "Describe your idea",
                minLength: {
                  value: 50,
                  message: "Give more detail — at least 50 characters",
                },
              })}
            />

            {/* Live character count */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 3, display: "block" }}
            >
              {ideaText.length} characters — aim for 150+
            </Typography>

            {/* Idea Strength Gate */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AutoFixHighIcon />}
              onClick={checkIdeaStrength}
              disabled={isChecking || ideaText.length < 20}
              sx={{ mb: 2 }}
            >
              {isChecking ? "Checking idea strength..." : "Check Idea Strength"}
            </Button>

            {/* Loading bar while checking */}
            {isChecking && (
              <LinearProgress color="error" sx={{ mb: 2, borderRadius: 1 }} />
            )}

            {/* Feedback from the gate */}
            {ideaFeedback === "strong" && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="success.main"
                  fontWeight={600}
                >
                  ✓ Idea is specific enough to attack
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Your red team is ready. Launch when you are.
                </Typography>
              </Box>
            )}

            {ideaFeedback === "weak" && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#FFF7ED",
                  border: "1px solid #FED7AA",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="warning.main"
                  fontWeight={600}
                >
                  ⚠ Idea needs more detail
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Try answering: Who exactly is your customer? How does it make
                  money? Why now?
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Agent preview */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.100",
              borderRadius: 3,
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{ mb: 2 }}
            >
              Your Red Team
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {agents.map((agent) => (
                <Chip
                  key={agent.label}
                  label={agent.label}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "grey.200", color: "text.secondary" }}
                />
              ))}
            </Stack>
          </Paper>

          {/* Launch button — only active when idea is strong */}
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            size="large"
            disabled={ideaFeedback !== "strong"}
            sx={{ py: 1.5, fontSize: "1rem" }}
          >
            Launch Red Team →
          </Button>

          {ideaFeedback !== "strong" && (
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 1, display: "block" }}
            >
              Check idea strength first to unlock the launch
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
