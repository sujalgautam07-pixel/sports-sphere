import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout/Layout";
import Placeholder from "@/pages/Placeholder";
import Leaderboard from "@/pages/Leaderboard";
import RequireAuth from "@/components/auth/RequireAuth";
import SignUp from "@/pages/SignUp";
import Gate from "@/components/auth/Gate";
import Athletes from "@/pages/Athletes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Gate />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Index />} />
              <Route path="/athletes" element={<Athletes />} />
              <Route
                path="/training"
                element={<Placeholder title="Training Programs" />}
              />
              <Route
                path="/events"
                element={<Placeholder title="Event Schedules" />}
              />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
