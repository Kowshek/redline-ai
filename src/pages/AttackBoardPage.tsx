import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  Stack,
  Tab,
  Tabs,
  Button,
  LinearProgress,
} from "@mui/material";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShieldIcon from "@mui/icons-material/Shield";
import { mockAttacks } from "../utils/mockData";
import type { Attack, SeverityLevel } from "../types";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ZAxis,
} from "recharts";

// Severity badge colors
const severityColors: Record<SeverityLevel, string> = {
  critical: "#DC3545",
  high: "#F59E0B",
  medium: "#3B82F6",
  low: "#10B981",
};

// Agent label colors for scatter chart dots
const agentColors: Record<string, string> = {
  COMPETITOR: "#1E3A5F",
  SKEPTIC: "#7C3AED",
  CUSTOMER: "#0891B2",
  SABOTEUR: "#DC3545",
};

export default function AttackBoardPage() {
  const navigate = useNavigate();

  // visibleAttacks = attacks shown so far (simulates streaming)
  const [visibleAttacks, setVisibleAttacks] = useState<Attack[]>([]);

  // isStreaming = true while attacks are "coming in"
  const [isStreaming, setIsStreaming] = useState(true);

  // activeTab = which view the user is on (0=feed, 1=risk matrix, 2=radar)
  const [activeTab, setActiveTab] = useState(0);

  // Simulate streaming — reveals one attack every 1.5 seconds
  // Later this will be replaced by a real SSE connection
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= mockAttacks.length) {
        setIsStreaming(false);
        clearInterval(interval);
        return;
      }

      const attack = mockAttacks[index];
      // Only add if attack actually exists
      if (attack) {
        setVisibleAttacks((prev) => [...prev, attack]);
      }
      index++;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Filter out any undefined entries before mapping
  const scatterData = visibleAttacks
    .filter((attack) => attack !== undefined)
    .map((attack) => ({
      x: attack.likelihood,
      y:
        attack.severity === "critical"
          ? 4
          : attack.severity === "high"
            ? 3
            : attack.severity === "medium"
              ? 2
              : 1,
      name: attack.title,
      agent: attack.agentType,
      fill: agentColors[attack.agentType],
    }));

  // Transform attacks into format Recharts RadarChart needs
  // Each agent gets a resilience score based on how many attacks landed
  const radarData = [
    {
      agent: "Competitor",
      score:
        visibleAttacks.filter((a) => a.agentType === "COMPETITOR").length > 0
          ? 20
          : 100,
    },
    {
      agent: "Skeptic",
      score:
        visibleAttacks.filter((a) => a.agentType === "SKEPTIC").length > 0
          ? 15
          : 100,
    },
    {
      agent: "Customer",
      score:
        visibleAttacks.filter((a) => a.agentType === "CUSTOMER").length > 0
          ? 25
          : 100,
    },
    {
      agent: "Saboteur",
      score:
        visibleAttacks.filter((a) => a.agentType === "SABOTEUR").length > 0
          ? 10
          : 100,
    },
  ];

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
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            color="primary"
            size="small"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            Dashboard
          </Button>
          <Typography variant="h6" fontWeight={700} color="primary">
            RED<span style={{ color: "#DC3545" }}>LINE</span> AI
          </Typography>
        </Stack>

        {/* Defend button — only active when streaming is done */}
        <Button
          variant="contained"
          color="error"
          startIcon={<ShieldIcon />}
          disabled={isStreaming}
          size="small"
        >
          {isStreaming ? "Attacks incoming..." : "Defend Your Idea"}
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header + streaming indicator */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Attack Board
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {isStreaming
              ? `${visibleAttacks.length} of ${mockAttacks.length} attacks incoming...`
              : `${visibleAttacks.length} attacks identified — ready to defend`}
          </Typography>

          {/* Streaming progress bar */}
          {isStreaming && (
            <LinearProgress
              color="error"
              variant="determinate"
              value={(visibleAttacks.length / mockAttacks.length) * 100}
              sx={{ borderRadius: 1, height: 4 }}
            />
          )}
        </Box>

        {/* View tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ mb: 3, borderBottom: "1px solid", borderColor: "grey.100" }}
        >
          <Tab label="Live Feed" />
          <Tab label="Risk Matrix" />
          <Tab label="Resilience Radar" />
        </Tabs>

        {/* TAB 1 — Live Feed */}
        {activeTab === 0 && (
          <Stack spacing={2}>
            {visibleAttacks.map((attack) => (
              <Paper
                key={attack.id}
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.100",
                  borderRadius: 2,
                  borderLeft: "4px solid",
                  // Left border color = severity color
                  borderLeftColor: severityColors[attack.severity],
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
                }}
              >
                {/* Attack header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 1 }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* Agent badge */}
                    <Chip
                      label={attack.agentType}
                      size="small"
                      sx={{
                        bgcolor: agentColors[attack.agentType],
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    />
                    {/* Severity badge */}
                    <Chip
                      label={attack.severity.toUpperCase()}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: severityColors[attack.severity],
                        color: severityColors[attack.severity],
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    />
                  </Stack>

                  {/* Likelihood percentage */}
                  <Typography
                    variant="caption"
                    fontFamily="IBM Plex Mono, monospace"
                    color="text.secondary"
                  >
                    {Math.round(attack.likelihood * 100)}% likelihood
                  </Typography>
                </Stack>

                {/* Attack title */}
                <Typography
                  fontWeight={700}
                  color="text.primary"
                  sx={{ mb: 0.5 }}
                >
                  {attack.title}
                </Typography>

                {/* Attack description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {attack.description}
                </Typography>

                {/* Evidence */}
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "grey.100",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    <strong>Evidence:</strong> {attack.evidence}
                  </Typography>
                </Box>
              </Paper>
            ))}

            {/* Streaming placeholder cards */}
            {isStreaming && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px dashed",
                  borderColor: "grey.200",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Agent analyzing your idea...
                </Typography>
                <LinearProgress color="error" sx={{ mt: 1, borderRadius: 1 }} />
              </Paper>
            )}
          </Stack>
        )}

        {/* TAB 2 — Risk Matrix */}
        {activeTab === 1 && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.100",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{ mb: 3 }}
            >
              Severity vs Likelihood — each dot is one attack
            </Typography>

            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[0, 1]}
                  name="Likelihood"
                  label={{
                    value: "Likelihood →",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[0, 5]}
                  name="Severity"
                  tickFormatter={(v) =>
                    ["", "Low", "Medium", "High", "Critical"][v] || ""
                  }
                />
                <ZAxis range={[100, 100]} />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <Box
                        sx={{
                          bgcolor: "background.paper",
                          p: 1.5,
                          border: "1px solid",
                          borderColor: "grey.200",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="caption" fontWeight={600}>
                          {d.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {d.agent}
                        </Typography>
                      </Box>
                    );
                  }}
                />
                {/* One Scatter per agent so each can have its own color */}
                {["COMPETITOR", "SKEPTIC", "CUSTOMER", "SABOTEUR"].map(
                  (agent) => (
                    <Scatter
                      key={agent}
                      name={agent}
                      data={scatterData.filter((d) => d.agent === agent)}
                      fill={agentColors[agent]}
                    />
                  ),
                )}
              </ScatterChart>
            </ResponsiveContainer>

            {/* Legend */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              {Object.entries(agentColors).map(([agent, color]) => (
                <Stack
                  key={agent}
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: color,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {agent}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        )}

        {/* TAB 3 — Resilience Radar */}
        {activeTab === 2 && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.100",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{ mb: 3 }}
            >
              Resilience per agent — lower score = more vulnerable
            </Typography>

            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="agent" />
                <Radar
                  name="Resilience"
                  dataKey="score"
                  stroke="#1E3A5F"
                  fill="#1E3A5F"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
