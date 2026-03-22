import { Box, Typography, Button, Container, Stack, Chip } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person2TwoTone";
import BugReportIcon from "@mui/icons-material/BugReport";
import type { SvgIconComponent } from "@mui/icons-material";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navbar */}
      <Box
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "grey.100",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" color="primary" fontWeight={700}>
          RED<span style={{ color: "#DC3545" }}>LINE</span> AI
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => navigate({ to: "/login" })}
          >
            Sign In
          </Button>
          <Button variant="contained" color="error" size="small">
            Get Started
          </Button>
        </Stack>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ pt: 12, pb: 8, textAlign: "center" }}>
        <Chip
          label="AI-Powered Red Teaming"
          size="small"
          sx={{
            mb: 3,
            bgcolor: "#FEE2E2",
            color: "#DC3545",
            fontWeight: 600,
            border: "1px solid #FECACA",
          }}
        />

        <Typography
          variant="h2"
          color="text.primary"
          sx={{ mb: 3, lineHeight: 1.2 }}
        >
          Your business idea will fail.{" "}
          <span style={{ color: "#DC3545" }}>Find out why</span> before the
          market does.
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          fontWeight={400}
          sx={{ mb: 5, maxWidth: 600, mx: "auto" }}
        >
          4 adversarial AI agents simultaneously attack your idea, competitive
          threats, customer objections, internal failures, flawed assumptions.
          Defend it. Evolve it. Make it bulletproof.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={() => navigate({ to: "/dashboard" })}
            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Launch Red Team  →
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          >
            View Demo
          </Button>
        </Stack>
      </Container>

      {/* Agent Cards */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Typography
          variant="h5"
          textAlign="center"
          color="text.primary"
          fontWeight={600}
          sx={{ mb: 4 }}
        >
          Meet your Red Team
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
          {agents.map((agent) => {
            // Store the icon component in a variable so JSX can render it
            const Icon = agent.icon;

            return (
              <Box
                key={agent.name}
                sx={{
                  p: 3,
                  width: 240,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.100",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderColor: "error.main",
                  },
                }}
              >
                {/* Icon in navy color, not emoji */}
                <Icon sx={{ fontSize: 28, color: "primary.main" }} />

                <Typography fontWeight={700} color="primary" sx={{ mt: 1 }}>
                  {agent.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {agent.description}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}

// Each agent has a name, description, and a real MUI icon
const agents: {
  icon: SvgIconComponent;
  name: string;
  description: string;
}[] = [
  {
    icon: TrendingUpIcon,
    name: "The Competitor",
    description: "How would a well-funded rival destroy this idea?",
  },
  {
    icon: SearchIcon,
    name: "The Skeptic",
    description: "What assumptions are factually wrong?",
  },
  {
    icon: PersonIcon,
    name: "The Customer",
    description: "Why would real people NOT buy this?",
  },
  {
    icon: BugReportIcon,
    name: "The Saboteur",
    description: "What internal failure collapses this?",
  },
];
