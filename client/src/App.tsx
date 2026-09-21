import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Activation from "./pages/Activation";
import DashboardHome from "./pages/DashboardHome";
import Learn from "./pages/Learn";
import Jobs from "./pages/Jobs";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/auth/:mode" component={AuthPage} />
    <Route path="/activate" component={Activation} />
    <Route path="/app" component={DashboardHome} />
    <Route path="/app/learn" component={Learn} />
    <Route path="/app/jobs" component={Jobs} />
    <Route path="/app/earnings" component={Earnings} />
    <Route path="/app/profile" component={Profile} />
    <Route path="/admin" component={Admin} />
    <Route path="/legal/:page" component={Legal} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
