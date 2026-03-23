import {
  Box,
  Typography,
  Button,
  Container,
  Chip,
  Paper,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { mockSessions } from "../utils/mockData";
import type { Session, SessionStatus } from "../types";
import { useNavigate } from '@tanstack/react-router'

// columnHelper gives us type-safe column definitions
// It knows the shape of Session so TypeScript catches typos in field names
const columnHelper = createColumnHelper<Session>();


// Color mapping for session status badges
const statusColors: Record<
  SessionStatus,
  "default" | "warning" | "error" | "success"
> = {
  DRAFT: "default",
  ATTACKING: "error",
  DEFENDING: "warning",
  COMPLETE: "success",
};

// Human readable status labels
const statusLabels: Record<SessionStatus, string> = {
  DRAFT: "Draft",
  ATTACKING: "Under Attack",
  DEFENDING: "Defending",
  COMPLETE: "Complete",
};

export default function DashboardPage() {
  // sorting state — tracks which column is sorted and in which direction
  const [sorting, setSorting] = useState<SortingState>([]);

  // globalFilter state — tracks the search input value
  const [globalFilter, setGlobalFilter] = useState("");

  const navigate = useNavigate();

  // Define table columns
  const columns = [
    // Title column
    columnHelper.accessor("title", {
      header: "Idea",
      // cell gives us access to the raw value to render custom UI
      cell: (info) => (
        <Box>
          <Typography fontWeight={600} variant="body2" color="text.primary">
            {info.getValue()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            v{info.row.original.version}
          </Typography>
        </Box>
      ),
    }),

    // Status column
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Chip
          label={statusLabels[info.getValue()]}
          color={statusColors[info.getValue()]}
          size="small"
          variant="outlined"
        />
      ),
    }),

    // Resilience score column
    columnHelper.accessor("overallResilienceScore", {
      header: "Resilience Score",
      cell: (info) => {
        const score = info.getValue();
        // Show a dash if the session hasn't been scored yet
        if (score === null)
          return (
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          );
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Score number in monospace font for clean alignment */}
            <Typography
              variant="body2"
              fontWeight={700}
              fontFamily="IBM Plex Mono, monospace"
              color={
                score >= 70
                  ? "success.main"
                  : score >= 40
                    ? "warning.main"
                    : "error.main"
              }
            >
              {score}
            </Typography>
            {/* Visual progress bar */}
            <LinearProgress
              variant="determinate"
              value={score}
              sx={{
                width: 80,
                height: 6,
                borderRadius: 3,
                bgcolor: "grey.100",
                "& .MuiLinearProgress-bar": {
                  bgcolor:
                    score >= 70
                      ? "success.main"
                      : score >= 40
                        ? "warning.main"
                        : "error.main",
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        );
      },
    }),

    // Date column
    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: (info) => (
        <Typography variant="body2" color="text.secondary">
          {/* Format the ISO date string into readable format */}
          {new Date(info.getValue()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      ),
    }),

    // Actions column — not tied to a data field, so we use display
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <Button
          size="small"
          variant="outlined"
          color="error"
          sx={{ fontSize: "0.7rem" }}
        >
          {/* Show different action based on session status */}
          {info.row.original.status === "COMPLETE" ? "View Report" : "Continue"}
        </Button>
      ),
    }),
  ];

  // This is the TanStack Table instance
  // It wires together our data, columns, and features
  const table = useReactTable({
    data: mockSessions,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(), // required — basic row rendering
    getSortedRowModel: getSortedRowModel(), // enables column sorting
    getFilteredRowModel: getFilteredRowModel(), // enables search filtering
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top navbar */}
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
        <Typography variant="h6" fontWeight={700} color="primary">
          RED<span style={{ color: "#DC3545" }}>LINE</span> AI
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          size="small"
          onClick={() => navigate({ to: "/session/new" })}
        >
          New Session
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page header */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Your Sessions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockSessions.length} ideas red-teamed
            </Typography>
          </Box>

          {/* Search input — updates globalFilter which TanStack Table uses to filter rows */}
          <Box
            component="input"
            placeholder="Search ideas..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            sx={{
              px: 2,
              py: 1,
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: 2,
              fontSize: "0.875rem",
              outline: "none",
              fontFamily: "inherit",
              "&:focus": { borderColor: "primary.main" },
            }}
          />
        </Box>

        {/* Table */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "grey.100",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="table"
            sx={{ width: "100%", borderCollapse: "collapse" }}
          >
            {/* Table header */}
            <Box component="thead" sx={{ bgcolor: "grey.50" }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Box component="tr" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Box
                      component="th"
                      key={header.id}
                      sx={{
                        px: 3,
                        py: 1.5,
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        // Show pointer cursor if column is sortable
                        cursor: header.column.getCanSort()
                          ? "pointer"
                          : "default",
                        userSelect: "none",
                      }}
                      // Clicking header toggles sort direction
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Show sort direction indicator */}
                      {header.column.getIsSorted() === "asc"
                        ? " ↑"
                        : header.column.getIsSorted() === "desc"
                          ? " ↓"
                          : ""}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Table body */}
            <Box component="tbody">
              {table.getRowModel().rows.map((row, index) => (
                <Box
                  component="tr"
                  key={row.id}
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "grey.100",
                    // Subtle hover state
                    "&:hover": { bgcolor: "grey.50" },
                    transition: "background-color 0.15s",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Box component="td" key={cell.id} sx={{ px: 3, py: 2 }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
