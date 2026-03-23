import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import NewSessionPage from './pages/NewSessionPage';
import AttackBoardPage from './pages/AttackBoardPage'

const rootRoute = createRootRoute({
  component: App,
});

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

// New auth route
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Register route added — now TypeScript knows /register is valid
export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

export const newSessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/session/new',
  component: NewSessionPage,
})

export const attackBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/session/$sessionId/attack',
  component: AttackBoardPage,
})

const routeTree = rootRoute.addChildren([
  landingRoute,
  dashboardRoute,
  loginRoute,
  registerRoute,
  newSessionRoute,
  attackBoardRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
