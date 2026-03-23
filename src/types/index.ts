import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E3A5F",
    },
    error: {
      main: "#DC3545",
    },
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F59E0B",
    },
    background: {
      default: "#FAFBFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A2E",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

// This file defines the shape of all data in REDLINE AI
// Every component that uses this data will import from here

// The 4 AI agents
export type AgentType = "COMPETITOR" | "SKEPTIC" | "CUSTOMER" | "SABOTEUR";

// Session status — tracks where the user is in the flow
export type SessionStatus = "DRAFT" | "ATTACKING" | "DEFENDING" | "COMPLETE";

// Attack severity levels
export type SeverityLevel = "critical" | "high" | "medium" | "low";

// Attack status after defense
export type AttackStatus = "UNDEFENDED" | "DEFENDED" | "PARTIALLY_DEFENDED";

// A single red team session (one idea being attacked)
export type Session = {
  id: string;
  title: string;
  ideaText: string;
  status: SessionStatus;
  version: number;
  overallResilienceScore: number | null;
  createdAt: string;
  completedAt: string | null;
};

// A single attack from one agent
export type Attack = {
  id: string;
  sessionId: string;
  agentType: AgentType;
  title: string;
  description: string;
  evidence: string;
  severity: SeverityLevel;
  likelihood: number;
  status: AttackStatus;
  defenseScore: number | null;
};

export default theme;
