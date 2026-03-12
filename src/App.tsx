import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { RegionProvider } from "@/contexts/RegionContext";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import RegisterInterest from "./pages/RegisterInterest";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ImportantInformation from "./pages/ImportantInformation";
import PrivacyNotice from "./pages/PrivacyNotice";
import Disclosures from "./pages/Disclosures";
import Accessibility from "./pages/Accessibility";
import CookiesPolicy from "./pages/CookiesPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <RegionProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register-interest" element={<RegisterInterest />} />
          <Route path="/portal/a7x9/login" element={<AdminLogin />} />
          <Route path="/portal/a7x9" element={<AdminDashboard />} />
          <Route path="/important-information" element={<ImportantInformation />} />
          <Route path="/privacy-notice" element={<PrivacyNotice />} />
          <Route path="/disclosures" element={<Disclosures />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
  </RegionProvider>
  </ThemeProvider>
);

export default App;
