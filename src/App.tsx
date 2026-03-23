import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProgressBar from "@/components/ProgressBar";
import ChatbotWidget from "@/components/ChatbotWidget";
import ThemeProvider from "@/components/ThemeProvider";
import FloatingProjectBadge from "@/components/FloatingProjectBadge";
import Registration from "./pages/Registration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="mladi-podnikatelia-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FloatingProjectBadge />
          <ProgressBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prihlaska" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
